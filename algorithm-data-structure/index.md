# 算法-数据结构


> <https://github.com/Gethin1990/leetcode_101>

{{% mindmap algorthm mindmap-md %}}

- [数据结构](#数据结构)
  - [数组](#数组)
    - [二分查找](#二分查找)
    - [双指针](#双指针)
    - [滑动窗口](#滑动窗口)
  - [链表](#链表)
    - [链表的理论](#链表的理论)
      - [链表的种类](#链表的种类)
      - [链表的存储方式](#链表的存储方式)
      - [链表操作](#链表操作)
      - [数组和链表在不同场景下的性能分析](#数组和链表在不同场景下的性能分析)
    - [链表的经典题目](#链表的经典题目)
      - [虚拟头节点(哨兵节点)](#虚拟头节点哨兵节点)
      - [链表的基本操作](#链表的基本操作)
      - [反转链表](#反转链表)
      - [环形链表](#环形链表)
  - [哈希表](#哈希表)
    - [哈希表介绍](#哈希表介绍)
    - [哈希函数](#哈希函数)
    - [哈希碰撞](#哈希碰撞)
    - [常见的三种哈希结构](#常见的三种哈希结构)
      - [数组作为哈希表](#数组作为哈希表)
      - [set作为哈希表](#set作为哈希表)
      - [map作为哈希表](#map作为哈希表)
  - [字符串](#字符串)
    - [什么是字符串](#什么是字符串)
    - [要不要使用库函数](#要不要使用库函数)
    - [双指针法、反转系列](#双指针法反转系列)
    - [KMP](#kmp)
  - [栈和队列](#栈和队列)
    - [栈与队列的理论基础](#栈与队列的理论基础)
    - [栈经典题目](#栈经典题目)
      - [栈在系统中的应用](#栈在系统中的应用)
      - [括号匹配问题](#括号匹配问题)
      - [字符串去重问题](#字符串去重问题)
      - [逆波兰表达式问题](#逆波兰表达式问题)
    - [队列的经典题目](#队列的经典题目)
      - [滑动窗口最大值问题](#滑动窗口最大值问题)
      - [求前 K 个高频元素](#求前-k-个高频元素)
  - [二叉树](#二叉树)
    - [二叉树的遍历方式](#二叉树的遍历方式)
    - [二叉树的属性](#二叉树的属性)
    - [二叉树的修改与构造](#二叉树的修改与构造)
    - [求二叉搜索树的属性](#求二叉搜索树的属性)
    - [二叉树公共祖先问题](#二叉树公共祖先问题)
    - [二叉搜索树的修改和构造](#二叉搜索树的修改和构造)
  - [图](#图)

{{% /mindmap %}}

# 数据结构

## 数组

- 找到所有数组中消失的数字|448|
- 旋转图像|48|
- 搜索二维矩阵 II|240|
- 最多能完成排序的块|769|

### 二分查找

- 搜索插入位置|35|

### 双指针

- 移除元素|27|

### 滑动窗口

- 长度最小的子数组|209|

## 链表

- 反转链表|206|
- 合并两个有序链表|21|
- 两两交换链表中的节点|24|
- 相交链表|160|
- 回文链表|234|

### 链表的理论

#### 链表的种类

单链表、双链表、循环链表

#### 链表的存储方式

数组是在内存中是连续分布的，但是链表在内存中可不是连续分布的。

#### 链表操作

添加、删除、查询

#### 数组和链表在不同场景下的性能分析

插入删除的时间复杂度是O(1),查询的时间复杂度是O(n)

### 链表的经典题目

#### 虚拟头节点(哨兵节点)

- 移除链表元素|203|

#### 链表的基本操作

- 设计链表|707|

#### 反转链表

- 反转链表|206|

#### 环形链表

- 环形链表II|142|

## 哈希表

[哈希表](https://github.com/Gethin1990/leetcode-master/blob/master/problems/%E5%93%88%E5%B8%8C%E8%A1%A8%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.md)

### 哈希表介绍

哈希表是根据关键码的值而直接进行访问的数据结构。  
哈希表中关键码就是数组的索引下标，然后通过下标直接访问数组中的元素。

### 哈希函数

通过hashCode把名字转化为数值，一般hashcode是通过特定编码方式，可以将其他数据格式转化为不同的数值，这样就把value映射为哈希表上的索引数字了。

### 哈希碰撞

拉链法、线性探测法。

### 常见的三种哈希结构

数组、set（集合）、map（映射）

#### 数组作为哈希表

- 有效的字母异位词|242|  
- 赎金信|383|  

#### set作为哈希表

- 两个数组的交集|349|

#### map作为哈希表

- 两数之和|1|  
- 三数之和|15|  
- 四数之和|18|  
- 四数相加II|454|

## 字符串

### 什么是字符串

字符串是若干字符组成的有限序列，也可以理解为是一个字符数组

### 要不要使用库函数

- 反转字符串|344|

### 双指针法、反转系列

- 反转字符串II|541|  
- 剑指Offer 05.替换空格  
- 翻转字符串里的单词|151|  

### KMP

- 实现 strStr()|28|  
- 重复的子字符串|459|

## 栈和队列

### 栈与队列的理论基础

队列是先进先出，栈是先进后出

### 栈经典题目

#### 栈在系统中的应用

- 简化路径|71|

#### 括号匹配问题

- 有效的括号|20|

#### 字符串去重问题

- 删除字符串中的所有相邻重复项|1047|

#### 逆波兰表达式问题

- 逆波兰表达式求值|150|

### 队列的经典题目

#### 滑动窗口最大值问题

- 滑动窗口最大值|239|

#### 求前 K 个高频元素

- 前 K 个高频元素|347|

## 二叉树

- 平衡二叉树|110|
- 二叉树的直径|543|
- 路径总和 III|437|
- 对称二叉树|101|
- 删点成林|1110|
- 二叉树的层平均值|637|
- 从前序与中序遍历序列构造二叉树|105|
- 二叉树的前序遍历|114|
- 恢复二叉搜索树|99|
- 修剪二叉搜索树|669|
- 实现 Trie (前缀树)|208|

### 二叉树的遍历方式

- 前序遍历|144|
- 中序遍历|145|
- 后序遍历|94|
- 层级遍历|102|

### 二叉树的属性

- 对称二叉树|101|
- 二叉树最大深度|104|
- 二叉树最小深度|111|
- 完全二叉树的节点个数|222|
- 平衡二叉树|110|
- 二叉树的所有路径|157|
- 左叶子之和|404|
- 找树左下角的值|513|
- 路径总和|112|

### 二叉树的修改与构造

- 翻转二叉树|226|
- 从中序与后续遍历序列构造二叉树|106|
- 最大二叉树|654|
- 合并二叉树|617|

### 求二叉搜索树的属性

- 二叉搜索树中的搜索|700|
- 验证二叉搜索树|98|
- 二叉搜索树的最小绝对差|530|
- 二叉搜索树中的众数|501|
- 把二叉搜索树转换为累加树|538|

### 二叉树公共祖先问题

- 二叉树的最近公共祖先|236|
- 二叉搜索树的最近公共祖先|235|

### 二叉搜索树的修改和构造

- 二叉搜索树的插入操作|701|
- 删除二叉搜索树的节点|450|
- 修剪二叉搜索树|669|
- 将有序数组转换为二叉搜索树|108|

## 图

- 判断二分图|785|
- 课程表 II|210|
