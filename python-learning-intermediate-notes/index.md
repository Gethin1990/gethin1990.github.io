# PYTHON 学习笔记(Intermediate)


> Python Learning Notes - Intermediate
  
## 4. 序列

### 4.1 序列

1 索引

```python
abc=["a","b","c","d","e","f"]
print(abc[1])
```

2 切片（slicing） `sname[start:end:step]`

```python
print(abc[1:5])
print(abc[0:5:2])
```

3 序列相加

```python
bcd=["b","c","d"]
print(abc+bcd)
```

4 乘法

```python
print(bcd*5)
```

5 检查元素

```python
print("b"  in bcd)
```

6 计算序列长度、最大值和最小值

```python
print(len(abc))
print(max(abc))
print(min(abc))
```

### 4.2 列表(list)

1 创建和删除

```python
lisa=[1,2,3,4,5,6]
lisb=['a',"b",["a",'''bcd''']]
lise=[]
lisr=list(range(1,10,2))
print(lisa,lisb,lise,lisr)
del lisr
print(lisr)
```

2 遍历

```python
for i in lisa:
	print(i)
for i,item in  enumerate(lisb):
	print(i,item)
```

3 添加、修改和删除列表元素

```python
lisa.append(7)
print(lisa)
lisa[5] =  7
print(lisa)
del lisa[5]
print(lisa)
```

4 统计

```python
c=lisa.count(1)
print(c)
i=lisa.index(1)
print(i)
s=sum(lisa)
print(s)
lisa.sort(reverse=True)
print(lisa)
sort=sorted(lisa)
print(sort)
k=[x for x in lisa if x>3]
print(k)
```

### 4.3 元组（tuple）

1 元组的基本操作

```python
t=('a',12,("abc","b"),["ggg",99])
print(t)
t=tuple(range(10,20,2))
print(t)
t=('人生苦短',28,'我用PYTHON',[123,456,789])
print(t[0])
print(t[:3])
```

2 元组推导式

```python
import random
randomnumber=(random.randint(10,100) for i in range(10))
print(randomnumber)
randomnumber=tuple(randomnumber)
print(randomnumber)
```

```python
a=(1,2,3)
print(a)
a=(2,3,4)
print(a)
a=a+(5,6)
print(a)
```

遍历后原生成器对象已经不存在了，如下：

```python
number=(i for i in  range(3))
print(number.__next__())
print(number.__next__())
number=tuple(number)
print(number)
```

#### 元组和列表区别

1. 列表属于可变序列，它的元素可以随时修改或者删除，而元组属于不可变序列，其中元素不可修改，除非整体替换
2. 列表可以使用append(),extend(),insert(),remove()和pop()等方法实现添加和修改列表元素，而元组则没有这几个方法，因为不能向原则添加和修改元素，同样也不能删除元素
3. 列表可以使用切片访问和修改列表中元素，元素也支持切片，但是它只支持通过切片访问元素中的元素，不支持修改
4. 元组比列表的访问和处理速度快，所以如果只需要对其中元素进行访问，而不进行任何修改，建议使用元组而不使用列表
5. 列表不能座位字典的键，而元组则可以

### 4.4 字典(dictionary)

字典的特性：

1. 通过键而不是通过索引来读取
2. 字典式任意对象的无序集合
3. 字典是可变的，并且可以任意嵌套
4. 字典中的键必须是唯一
5. 字典中的键必须不可变

## 5. 字符串和正则表达式

### 5.1 字串常用操作

```python
# 拼接
a='abc'+'bc'+'CD'+str(123)+'@'
print(a)
# 计算长度
print(len(a))
# 截取字符串【string[start:end:step]】
sub=a[2:7:2]
print(sub)
# 分割字符串【str.splite(sep,maxsplit)】
li=a.split('b')
print(li)
li=a.split('b',1)
print(li)
# 检索字符串count find index startswith endswith
print(a.count('b'))
print(a.find('b'))
print(a.index('b'))
print(a.startswith('abc'))
print(a.endswith('123'))
# 字母大小写
print(a.upper())
print(a.lower())
# 去特殊字符
print(a.strip('@'))
```

格式化字符串
常用格式化字符

1. s 字符串（采用str() 显示）
2. r 字符串（采用repr() 显示）
3. c 单个字符串
4. o 八进制整数
5. d 十进制整数
6. e 指数
7. x 十六进制整数
8. f 浮点数
9. % 字符串%

```python
template=  '{:0>9s}\t name:{:s}\t title:sr.{:s}'
print(template.format('1','hello','wang'))
```

### 5.2 正则表达式基础

1. 行定位符 ^tm$
2. 元字符 \w\s\d\b
3. 限定符 ? + * {n} {n,} {n,m}
4. 字符类 abc
5. 排除字符 ^abc
6. 选择字符 |
7. 转义字符 \
8. 分组 ()

### 5.3 使用re模块实现正则表达式

```python
# re.match(pattern.string,[flags])
# re.search(pattern,string,[flags])
# re.findall(pattern,string,[flags])
# re.sub(pattern,repl.string,count,flags)
# re.split(pattern,string,[maxsplite],[flags])
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMzE5OTQzNzRdfQ==
-->

