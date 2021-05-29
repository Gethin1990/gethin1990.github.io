# PYTHON 技巧


## Python Quick Grammar

### 1. 变量互换

```python
a=1
b=2
a,b=b,a
a,b
```

    (2, 1)

### 2. 连续赋值

```python
a=b=c=50
a,b,c
```




    (50, 50, 50)



### 3. 自动解包

```python
a,b,c=[1,2,3]
a,b,c
```




    (1, 2, 3)

```python
a,*others=[1,2,3,4]
print(a)
print(*others)
```

    1
    2 3 4
    

### 4. 链式比较


```python
a=10
if(5<a<15):
    print(a)
```

    10
    

### 5. 重复列表


```python
[5,2]*4
```




    [5, 2, 5, 2, 5, 2, 5, 2]



### 6. 重复字符串


```python
"hello"*3
```




    'hellohellohello'



### 7. 三目运算


```python
age = 30
slogon = "牛逼" if age == 30 else "niubility"
print(slogon)
```

    牛逼
    

### 8. 字典合并


```python
a={"a":1}
b={"b":2}
{**a,**b}
```




    {'a': 1, 'b': 2}



### 9. 字符串反转


```python
s = "i love python"
s[::-1]
```




    'nohtyp evol i'



### 10. 列表转字符串


```python
s = ["i", "love", "python"]
" ". join(s)
```




    'i love python'



### 11. for else 语句


```python
foo=[2,3,4,5]
for i in foo:
    if i == 0:
        break
else:
    print("未发现")
```

    未发现
    

### 12. 字典推导式


```python
m = {x: x**2 for x in range(5)}
m
```




    {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}



### 13. 用Counter查找列表中出现最多的元素


```python
content = ["a", "b", "c", "a", "d", "c", "a"]
from collections import Counter
c = Counter(content)
c. most_common(1)
```




    [('a', 3)]



### 14. 默认值字典


```python
from collections import defaultdict
d = defaultdict(list)
d['a']. append(1)
d['a']
```




    [1]



### 15. 赋值表达式


```python
import re
data = "hello123world"
if match:=re. search("(\d+)", data):
    num = match. group(1)
else:
    num=None
num
```




    '123'



### 16. isinstance


```python
x=1
b=isinstance(x, (int, float))
b
```




    True



### 17. 用 http.server 共享文件


```python
#python3 -m http. server
```

### 18. zip 函数实现字典键值对互换


```python
lang = {"python":". py", "java":". java"}
dict(zip(lang. values(), lang. keys()))
```




    {'. py': 'python', '. java': 'java'}



### 19. 查找列表中出现次数最多的数字


```python
test = [1, 2, 3, 4, 2, 2, 3, 1, 4, 4, 4, 5]
max(set(test), key=test. count)
```




    4



### 20. 使用 slots 节省内存


```python

class MyClass(object):
    def __init__(self, name, identifier):
        self. name = name
        self. identifier = identifier
        self. set_up()
 
print(sys. getsizeof(MyClass))
 
class MyClass(object):
    __slots__ = ['name', 'identifier']
 
    def __init__(self, name, identifier):
        self. name = name
        self. identifier = identifier
        self. set_up()
 
print(sys. getsizeof(MyClass))

```

    1064
    896
    

### 21. 扩展列表


```python
i = ['a','b','c']
i. extend(['e','f','g'])
i
```




    ['a', 'b', 'c', 'e', 'f', 'g']



### 22. 列表负数索引


```python
a = [ 1, 2, 3]
a[-1]
```




    3



### 23. 列表切片


```python
a = [0,1,2,3,4,5,6,7,8,9]
a[3:6] # 第3个到第6个之间的元素
a[:5] # 前5个元素
a[5:] # 后5个元素
a[::] # 所有元素（拷贝列表）
a[::2] # 偶数项
a[1::2] # 奇数项
a[::-1]  # 反转列表
```




    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]



### 24. 二维数组变一维数组


```python
import itertools
a = [[1, 2], [3, 4], [5, 6]]
i = itertools. chain(*a)
list(i)
```




    [1, 2, 3, 4, 5, 6]



### 25. 有索引的迭代


```python
a = ['Merry', 'Christmas ', 'Day']
for i, x in enumerate(a):
    print ('{}: {}'. format(i, x))
```

    0: Merry
    1: Christmas 
    2: Day
    

### 26. 列表推导式


```python
le = [x*2 for x in range(10)]
le  # 每个数取平方
le = [x for x in range(10) if x%2 == 0]
le  # 获取偶数项
```




    [0, 2, 4, 6, 8]



### 27. 生成器表达式


```python
ge = (x*2 for x in range(10))
print(ge)
print(next(ge))
print(next(ge))
print(next(ge))
```

    <generator object <genexpr> at 0x000001D693764190>
    0
    2
    4
    

### 28. 集合推导式


```python
 nums = {n**2 for n in range(10)}
 nums
```




    {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}



### 29. 判断key是否存在字典中


```python
d = {"1":"a"}
print('1' in d)
print(d['1'])
print(d. get("1"))
print(d. get("2"))
```

    True
    a
    a
    None
    

### 30. 装饰器


```python
from functools import wraps
 
def tags(tag_name):
    def tags_decorator(func):
        @wraps(func)
        def func_wrapper(name):
            return "<{0}>{1}</{0}>". format(tag_name, func(name))
        return func_wrapper
    return tags_decorator
 
@tags("p")
def get_text(name):
    """returns some text"""
    return "Hello " + name
 
print(get_text("Python"))
```

    <p>Hello Python</p>
    

### 31. 字典子集


```python
def sub_dicts(d, keys):
    return {k:v for k, v in d. items() if k in keys}
sub_dicts({1:"a", 2:"b", 3:"c"}, [1,2])
```




    {1: 'a', 2: 'b'}



### 32. 反转字典


```python
d = {'a': 1, 'b': 2, 'c': 3, 'd': 4}
zip(d. values(), d. keys())
z = zip(d. values(), d. keys())
dict(z)
```




    {1: 'a', 2: 'b', 3: 'c', 4: 'd'}



### 33. 具名元组


```python
from collections import namedtuple
Point = namedtuple("Point", "x,y")
p = Point(x=1, y=2)
print(p. x)
print(p[0])
print(p. y)
print(p[1])
```

    1
    1
    2
    2
    

### 34. 设置字典默认值


```python
d = dict()
if 'a' not in d:
    d['a'] = []
d['a']. append(1)
d
d. setdefault('b',[]). append(2)
d
```




    {'a': [1], 'b': [2]}



### 35. 有序字典


```python
from collections import OrderedDict
m = OrderedDict((str(x), x) for x in range(10))
m. keys() # key 按照插入的顺序排列
```




    odict_keys(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])



### 36. 列表中最大最小的前n个数


```python
import heapq
a = [51, 95, 14, 65, 86, 35, 85, 32, 8, 98]
heapq. nlargest(5,a)
heapq. nsmallest(5,a)
```




    [8, 14, 32, 35, 51]



### 37. 打开文件


```python
import os
with open('foo. txt', 'w') as f:
    f. write("hello")
os. remove("foo. txt")
```

### 38. 两个列表组合成字典


```python
list_1 = ["One","Two","Three"]
list_2 = [1,2,3]
dictionary = dict(zip(list_1, list_2))
print(dictionary)
```

    {'One': 1, 'Two': 2, 'Three': 3}
    

### 39. 去除列表中重复元素


```python
my_list = [1,4,1,8,2,8,4,5]
my_list = list(set(my_list))
print(my_list)
```

    [1, 2, 4, 5, 8]
    

### 40. 打印日历


```python
import calendar
print(calendar. month(2021, 1))
```

        January 2021
    Mo Tu We Th Fr Sa Su
                 1  2  3
     4  5  6  7  8  9 10
    11 12 13 14 15 16 17
    18 19 20 21 22 23 24
    25 26 27 28 29 30 31
    
    

### 41. 匿名函数


```python
add = lambda a,b:a+b
add(1,2)
```




    3



