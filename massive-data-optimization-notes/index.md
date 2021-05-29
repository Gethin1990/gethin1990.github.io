# 海量数据优化笔记


## 海量数据优化

### 1. 合理使用索引

索引是数据库中重要的数据结构，它的根本目的就是为了提高查询效率。现在大多数的数据库产品都采用 IBM 最先提出的 ISAM 索引结构。索引的使用要恰到好处，其使用原则如下：

* 在经常进行连接，但是没有指定为外键的列上建立索引，而不经常连接的字段则由优化器自动生成索引。
* 在频繁进行排序或分组（即进行 group by 或 order by 操作）的列上建立索引。
* 在条件表达式中经常用到的不同值较多的列上建立检索，在不同值少的列上不要建立索引。比如在雇员表的“性别”列上只有“男”与“女”两个不同值，因此就无必要建立索引。如果建立索引不但不会提高查询效率，反而会严重降低更新速度。
* 如果待排序的列有多个，可以在这些列上建立复合索引（compound index）。
* 使用系统工具。如 Informix 数据库有一个 tbcheck 工具，可以在可疑的索引上进行检查。在一些数据库服务器上，索引可能失效或者因为频繁操作而使得读取效率降低，如果一个使用索引的查询不明不白地慢下来，可以试着用 tbcheck 工具检查索引的完整性，必要时进行修复。另外，当数据库表更新大量数据后，删除并重建索引可以提高查询速度。

### 2. 避免或简化排序

应当简化或避免对大型表进行重复的排序。当能够利用索引自动以适当的次序产生输出时，优化器就避免了排序的步骤。以下是一些影响因素：

* 索引中不包括一个或几个待排序的列；
* group by 或 order by 子句中列的次序与索引的次序不一样；
* 排序的列来自不同的表。

为了避免不必要的排序，就要正确地增建索引，合理地合并数据库表（尽管有时可能影响表的规范化，但相对于效率的提高是值得的）。如果排序不可避免，那么应当试图简化它，如缩小排序的列的范围等。

### 3. 消除对大型表行数据的顺序存取

在嵌套查询中，对表的顺序存取对查询效率可能产生致命的影响。比如采用顺序存取策略，一个嵌套 3 层的查询，如果每层都查询 1000 行，那么这个查询就要查询 10 亿行数据。避免这种情况的主要方法就是对连接的列进行索引。  
例如，两个表：学生表（学号、姓名、年龄……）和选课表（学号、课程号、成绩）。如果两个表要做连接，就要在“学号”这个连接字段上建立索引。  
还可以使用并集来避免顺序存取。尽管在所有的检查列上都有索引，但某些形式的 where 子句强迫优化器使用顺序存取。下面的查询将强迫对 orders 表执行顺序操作：

```sql
SELECT * FROM orders WHERE (customer_num=104 AND order_num>1001) OR order_num=1008
```

虽然在 customer_num 和 order_num 上建有索引，但是在上面的语句中优化器还是使用顺序存取路径扫描整个表。因为这个语句要检索的是分离的行的集合，所以应该改为如下语句：

```sql
SELECT * FROM orders WHERE customer_num=104 AND order_num>1001
UNION
SELECT * FROM orders WHERE order_num=1008
```

这样就能利用索引路径处理查询。

### 4. 避免相关子查询

一个列的标签同时在主查询和 where 子句中的查询中出现，那么很可能当主查询中的列值改变之后，子查询必须重新查询一次。查询嵌套层次越多，效率越低，因此应当尽量避免子查询。如果子查询不可避免，那么要在子查询中过滤掉尽可能多的行。

### 5. 避免困难的正规表达式

MATCHES 和 LIKE 关键字支持通配符匹配，技术上叫正规表达式。但这种匹配特别耗费时间。例如：

```sql
SELECT * FROM customer WHERE zipcode LIKE “98_ _ _”
```

即使在 zipcode 字段上建立了索引，在这种情况下也还是采用顺序扫描的方式。如果把语句改为`SELECT * FROM customer WHERE zipcode >“98000”`，在执行查询时就会利用索引来查询，显然会大大提高速度。  
另外，还要避免非开始的子串。例如语句：`SELECT * FROM customer WHERE zipcode[2，3] >“80”`，在 where 子句中采用了非开始子串，因而这个语句也不会使用索引。

### 6.使用临时表加速查询

把表的一个子集进行排序并创建临时表，有时能加速查询。有助于避免多重排序操作，而且在其他方面还能简化优化器的工作。例如：

```sql
SELECT cust.name，rcvbles.balance，……other columns
FROM cust，rcvbles
WHERE cust.customer_id = rcvlbes.customer_id
AND rcvblls.balance>0
AND cust.postcode>“98000”
ORDER BY cust.name
```

如果这个查询要被执行多次而不止一次，可以把所有未付款的客户找出来放在一个临时文件中，并按客户的名字进行排序：

```sql
SELECT cust.name，rcvbles.balance，……other columns
FROM cust，rcvbles
WHERE cust.customer_id = rcvlbes.customer_id
AND rcvblls.balance>0
ORDER BY cust.name
INTO TEMP cust_with_balance
```

然后以下面的方式在临时表中查询：

```sql
SELECT * FROM cust_with_balance WHERE postcode>“98000”
```

临时表中的行要比主表中的行少，而且物理顺序就是所要求的顺序，减少了磁盘 I/O，所以查询工作量可以得到大幅减少。  
注意：临时表创建后不会反映主表的修改。在主表中数据频繁修改的情况下，注意不要丢失数据。

### 7. 用排序来取代非顺序存取

非顺序磁盘存取是最慢的操作，表现在磁盘存取臂的来回移动。SQL 语句隐藏了这一情况，使得在写应用程序时很容易写出要求存取大量非顺序页的查询。  
有些时候，用数据库的排序能力来替代非顺序的存取能改进查询。

## 百万数据查询优化技巧三十则

 1. 对查询进行优化，应尽量避免全表扫描，首先应考虑在 where 及 order by 涉及的列上建立索引。
 2. 应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描，如：

    ```sql
    select id from t where num is null
    ```

    可以在 num 上设置默认值 0，确保表中 num 列没有 null 值，然后这样查询：

    ```sql
    select id from t where num=0
    ```

 3. 应尽量避免在 where 子句中使用!=或<>操作符，否则将引擎放弃使用索引而进行全表扫描。
 4. 应尽量避免在 where 子句中使用 or 来连接条件，否则将导致引擎放弃使用索引而进行全表扫描，如：

    ```sql
    select id from t where num=10 or num=20
    ```

    可以这样查询：

    ```sql
    select id from t where num=10
    union all
    select id from t where num=20
    ```

 5. in 和 not in 也要慎用，否则会导致全表扫描，如：

    ```sql
    select id from t where num in(1,2,3)
    ```

    对于连续的数值，能用 between 就不要用 in 了：

    ```sql
    select id from t where num between 1 and 3
    ```

 6. 下面的查询也将导致全表扫描：

    ```sql
    select id from t where name like '%abc%
    ```

    若要提高效率，可以考虑全文检索。

 7. 如果在 where 子句中使用参数，也会导致全表扫描。因为 SQL 只有在运行时才会解析局部变量，但优化程序不能将访问计划的选择推迟到运行时；它必须在编译时进行选择。然而，如果在编译时建立访问计划，变量的值还是未知的，因而无法作为索引选择的输入项。如下面语句将进行全表扫描：
    `select id from t where num=@num`
    可以改为强制查询使用索引：
    `select id from t with(index(索引名)) where num=@num`

 8. 应尽量避免在 where 子句中对字段进行表达式操作，这将导致引擎放弃使用索引而进行全表扫描。如：
    `select id from t where num/2=100`
    应改为:
    `select id from t where num=100*2`

 9. 应尽量避免在 where 子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描。如：

    ```sql
    select id from t where substring(name,1,3)='abc'--name以abc开头的id`
    select id from t where datediff(day,createdate,'2005-11-30')=0--‘2005-11-30’生成的id
    ```

    应改为

    ```sql
    select id from t where name like 'abc%'
    select id from t where createdate>='2005-11-30' and createdate<'2005-12-1'
    ```

10. 要在 where 子句中的“=”左边进行函数、算术运算或其他表达式运算，否则系统将可能无法正确使用索引。
11. 在使用索引字段作为条件时，如果该索引是复合索引，那么必须使用到该索引中的第一个字段作为条件时才能保证系统使用该索引，否则该索引将不会被使用，并且应尽可能的让字段顺序与索引顺序相一致。
12. 不要写一些没有意义的查询，如需要生成一个空表结构：
    `select col1,col2 into #t from t where 1=0`
    这类代码不会返回任何结果集，但是会消耗系统资源的，应改成这样：
    `create table #t(...)`
13. 很多时候用 exists 代替 in 是一个好的选择：

    ```sql
    select num from a where num in(select num from b)
    ```

    用下面的语句替换：

    ```sql
    select num from a where exists(select 1 from b where num=a.num)
    ```

14. 并不是所有索引对查询都有效，SQL 是根据表中数据来进行查询优化的，当索引列有大量数据重复时，SQL 查询可能不会去利用索引，如一表中有字段 sex，male、female 几乎各一半，那么即使在 sex 上建了索引也对查询效率起不了作用。
15. 索引并不是越多越好，索引固然可以提高相应的 select 的效率，但同时也降低了 insert 及 update 的效率，因为 insert 或 update 时有可能会重建索引，所以怎样建索引需要慎重考虑，视具体情况而定。一个表的索引数最好不要超过 6 个，若太多则应考虑一些不常使用到的列上建的索引是否有必要。
16. 应尽可能的避免更新 clustered 索引数据列，因为 clustered 索引数据列的顺序就是表记录的物理存储顺序，一旦该列值改变将导致整个表记录的顺序的调整，会耗费相当大的资源。若应用系统需要频繁更新 clustered 索引数据列，那么需要考虑是否应将该索引建为 clustered 索引。
17. 尽量使用数字型字段，若只含数值信息的字段尽量不要设计为字符型，这会降低查询和连接的性能，并会增加存储开销。这是因为引擎在处理查询和连接时会逐个比较字符串中每一个字符，而对于数字型而言只需要比较一次就够了。
18. 尽可能的使用 varchar/nvarchar 代替 char/nchar ，因为首先变长字段存储空间小，可以节省存储空间，其次对于查询来说，在一个相对较小的字段内搜索效率显然要高些。
19. 任何地方都不要使用 `select * from t`，用具体的字段列表代替“*”，不要返回用不到的任何字段。
20. 尽量使用表变量来代替临时表。如果表变量包含大量数据，请注意索引非常有限（只有主键索引）。
21. 避免频繁创建和删除临时表，以减少系统表资源的消耗。
22. 临时表并不是不可使用，适当地使用它们可以使某些例程更有效，例如，当需要重复引用大型表或常用表中的某个数据集时。但是，对于一次性事件，最好使用导出表。
23. 在新建临时表时，如果一次性插入数据量很大，那么可以使用 select into 代替 create table，避免造成大量 log ，以提高速度；如果数据量不大，为了缓和系统表的资源，应先 create table，然后 insert。
24. 如果使用到了临时表，在存储过程的最后务必将所有的临时表显式删除，先 truncate table ，然后 drop table ，这样可以避免系统表的较长时间锁定。
25. 尽量避免使用游标，因为游标的效率较差，如果游标操作的数据超过 1 万行，那么就应该考虑改写。
26. 使用基于游标的方法或临时表方法之前，应先寻找基于集的解决方案来解决问题，基于集的方法通常更有效。
27. 与临时表一样，游标并不是不可使用。对小型数据集使用 FAST_FORWARD 游标通常要优于其他逐行处理方法，尤其是在必须引用几个表才能获得所需的数据时。在结果集中包括“合计”的例程通常要比使用游标执行的速度快。如果开发时间允许，基于游标的方法和基于集的方法都可以尝试一下，看哪一种方法的效果更好。
28. 在所有的存储过程和触发器的开始处设置 SET NOCOUNT ON ，在结束时设置 SET NOCOUNT OFF 。无需在执行存储过程和触发器的每个语句后向客户端发送 DONE_IN_PROC 消息。
29. 尽量避免大事务操作，提高系统并发能力。
30. 尽量避免向客户端返回大数据量，若数据量过大，应该考虑相应需求是否合理。

## 常用SQL

### 查询带关键字的存储过程

```sql
--select string using in procedure
select b.name, a.text from syscomments a left join sysobjects b on b.id=a.id
where b.xtype='P' and a.text like '%abc%'
```

### 查询带关键字的列名

```sql
--select columns name
select b.name as Table1, a.name as Columns1,a.type  from syscolumns a left join sysobjects b on b.id=a.id
where b.xtype='u' and a.name like '%abc%'
```

### 查询带关键字的表名
  
```sql
--select table name
select name from sysobjects where xtype='u' and name like '%abc%'
```

### 查询带关键字的函数名

```sql
--select string using in function
select b.name, a.text from syscomments a left join sysobjects b on b.id=a.id
where b.xtype='fn' and a.text like '%abc%'
```

### 查询带关键字的视图

```sql  
--select string using in view
select b.name, a.text from syscomments a left join sysobjects b on b.id=a.id
where b.xtype='V' and a.text like '%abc%'
```

> Written with [StackEdit](https://stackedit.io/).

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NTgyNjE4MDMsODI2NTU3MTQ2LC03MT
U0MTQ0MDAsLTIwNDAxNDA4MDldfQ==
\-->

