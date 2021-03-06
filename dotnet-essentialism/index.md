# .NET 本质论


> 声明：本文仅用做复习整理知识，在下列文章中进行二次加工，大部分内容整理自：
> <https://www.cnblogs.com/edisonchou/p/4787775.html>
> <https://zhuanlan.zhihu.com/p/38799766>

{{% mindmap blueprint mindmap-md %}}

- [.NET 本质论](#net-本质论)
  - [.NET中所有类型的基类是什么](#net中所有类型的基类是什么)
  - [值类型和引用类型的区别](#值类型和引用类型的区别)
  - [装箱和拆箱的原理](#装箱和拆箱的原理)
  - [struct和class的区别，struct适用于哪些场合](#struct和class的区别struct适用于哪些场合)
  - [C#中方法的参数传递有哪几种方式](#c中方法的参数传递有哪几种方式)
  - [浅复制和深复制的区别](#浅复制和深复制的区别)
  - [.NET中栈和堆的差异](#net中栈和堆的差异)
  - [执行string abc="aaa"+"bbb"+"ccc"共分配了多少内存](#执行string-abcaaabbbccc共分配了多少内存)
  - [托管堆内存分配](#托管堆内存分配)
  - [简要说说.NET中GC的运行机制](#简要说说net中gc的运行机制)
  - [GC机制中如何判断一个对象仍然在被使用（如何标记）](#gc机制中如何判断一个对象仍然在被使用如何标记)
  - [GC中代（Generation）是什么，分为几代（如何移动）](#gc中代generation是什么分为几代如何移动)
  - [GC有什么问题](#gc有什么问题)
  - [托管与非托管资源是什么](#托管与非托管资源是什么)
    - [托管资源](#托管资源)
    - [非托管资源](#非托管资源)
  - [Dispose和Finalize方法在何时被调用（非托管资源回收方法）](#dispose和finalize方法在何时被调用非托管资源回收方法)
  - [.NET中的托管堆中是否可能出现内存泄露的现象](#net中的托管堆中是否可能出现内存泄露的现象)
    - [大对象的分配](#大对象的分配)
    - [不恰当地保存根引用](#不恰当地保存根引用)
    - [不正确的Finalize方法](#不正确的finalize方法)
{{% /mindmap %}}

# .NET 本质论

## .NET中所有类型的基类是什么

System.Object

## 值类型和引用类型的区别

所有继承自System.ValueType的类型是值类型，而其他类型都是引用类型。  
常用的值类型包括：结构、枚举、整数型、浮点型、布尔型等等。  

- 赋值时的区别
值类型的变量直接将获得一个真实的数据副本，而对引用类型的赋值仅仅是把对象的引用赋给变量，这样就可能导致多个变量引用到一个对象实例上。  
- 内存分配的区别
引用类型的对象将会在堆上分配内存，而值类型的对象则会在堆栈上分配内存  
- 继承结构的区别

## 装箱和拆箱的原理  

装箱：CLR需要做额外的工作把堆栈上的值类型移动到堆上，这个操作就被称为装箱。  
拆箱：装箱操作的反操作，把堆中的对象复制到堆栈中，并且返回其值。  

## struct和class的区别，struct适用于哪些场合  

- struct（结构）是值类型，而class（类）是引用类型。
- struct与class相比，不具备继承的特性
- struct不能有无参数的构造方法（class默认就有），也不能为成员变量定义初始值。

## C#中方法的参数传递有哪几种方式  

- ref关键字：引用传递参数，需要在传递前初始化；（ref 要求参数在传入前被初始化）
- out关键字：引用传递参数，需要在返回前初始化；（out 要求参数在方法返回前被初始化）
- params关键字：允许方法在定义时不确定参数的数量。

## 浅复制和深复制的区别  

- 浅复制：复制一个对象的时候，仅仅复制原始对象中所有的非静态类型成员和所有的引用类型成员的引用。（新对象和原对象将共享所有引用类型成员的实际对象）
- 深复制：复制一个对象的时候，不仅复制所有非静态类型成员，还要复制所有引用类型成员的实际对象。

## .NET中栈和堆的差异

- .NET 中的栈
堆栈用来存储值类型的对象和引用类型对象的引用（地址），其分配的是一块连续的地址，堆栈上的地址从高位向低位分配内存。

![20210426140758-2021-04-26-14-07-59](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210426140758-2021-04-26-14-07-59.png)

- .NET 中的堆
托管堆的分配也是连续的（从低位到高位），但是**堆中却存在着暂时不能被分配却已经无用的对象内存块**。  
当一个引用类型对象被初始时，会通过指向堆上可用空间的指针分配一块连续的内存，然后使堆栈上的引用指向堆上刚刚分配的这块内存块。  
![20210426161722-2021-04-26-16-17-24](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210426161722-2021-04-26-16-17-24.png)

- .NET中的非托管堆
非托管的堆需要程序员用指针手动地分配和释放内存，.NET中的GC和内存管理不适用于非托管堆。

## 执行string abc="aaa"+"bbb"+"ccc"共分配了多少内存

string是引用类型，其内存分配会遵照引用类型的规范。字符串具有不可变性。

```cs
string first = "aaa" + "bbb" + "ccc";
string second = "aaabbbccc";
```

![20210427093356-2021-04-27-09-33-57](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427093356-2021-04-27-09-33-57.png)

```cs
int num = 1;
string str = "aaa" + num.ToString();
Console.WriteLine(str);
```

![20210427093758-2021-04-27-09-37-59](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427093758-2021-04-27-09-37-59.png)

``` cs
string str = "aaa";
str += "bbb";
str += "ccc";
Console.WriteLine(str)
```

![20210427094200-2021-04-27-09-42-01](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427094200-2021-04-27-09-42-01.png)

## 托管堆内存分配

CLR在进程中分配一块保留地址控件-即托管堆  
托管堆有分为多个区域-**垃圾回收堆（GC Heap）**和**加载堆（Loader Heap）**[High-Frequency Heap、Low-Frequency Heap和Stub Heap]  
Loader Heap最重要的信息就是元数据相关的信息  
每个Type在Loader Heap上体现一个Method Table，而Method Table中则记录了存储的元数据信息 Loader Heap不受GC控制。  
**TypeHandle**：类型句柄，指向对应实例的方法表，每个对象创建时都包含该附加成员，并占用4个字节的内存空间。  
**SyncBlockIndex**：用于线程同步，每个对象创建时也包含该附加成员la。它指向一块呗称为Synchronization Block的内存块，用于管理对象同步，同样占用4个字节的内存空间。  
**NextObjPtr**:由托管堆维护的一个指针，用于标识下一个新建对象分配时在托管堆中所处的位置。CLR初始化时，NextObjPtr位于托管堆的及地址。  

![20210427214650-2021-04-27-21-46-51](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427214650-2021-04-27-21-46-51.png)

![20210427214756-2021-04-27-21-47-56](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427214756-2021-04-27-21-47-56.png)

**首先，将声明一个引用类型变量aUser：（堆栈4字节）**
`VIPUser aUser;`;  
它仅是一个引用（指针），保存在线程的堆栈上，占用4Byte的内存空间，将用于保存VIPUser对象的有效地址，其执行过程正是上文描述的在线程栈上的分配过程。此时aUser未指向任何有效的实例，因此被自行初始化为null，试图对aUser的任何操作将抛出NullReferenceException异常。

**然后，通过new操作执行对象创建：（GC托管堆20字节）**
`aUser = new VIPUser()`;  
如上文所言，该操作对应于**执行newobj指令**，其执行过程又可细分为以下几步：

1、CLR按照其继承层次进行搜索，计算类型及其所有父类的字段，该搜索将一直递归到System.Object类型，并返回字节总数，以本例而言类型VIPUser需要的字节*总数为 15 Bytes*，具体计算为：VIPUser类型本身字段isVip（bool型）为 1 Bytes；父类User类型的字段id（Int32型）为 4 Bytes，字段user保存了指向UserInfo型的引用，因此占 4 Bytes，而同时还要为UserInfo分配 6 Bytes字节的内存。

2、实例对象所占的字节总数还要加上对象附加成员所需的字节总数，其中附加成员包括TypeHandle和SyncBlockIndex，共计 8 Bytes（在32位CPU平台下）。因此，需要在托管堆上分配的字节总数为 23 Bytes，而堆上的内存块总是按照 4 Bytes的倍数进行分配，因此本例中将分配 24 Bytes的地址空间。

3、CLR在当前AppDomain对应的托管堆上搜索，找到一个未使用的 20 Bytes 的连续空间，并为其分配该内存地址。事实上，GC使用了非常高效的算法来满足该请求，NextObjPtr指针只需要向前推进 20 Bytes，并清零原NextObjPtr指针和当前NextObjPtr指针之间的字节，然后返回原NextObjPtr指针地址即可，该地址正是新创建对象的托管堆地址，也就是aUser引用指向的实例地址。而此时的NextObjPtr仍指向下一个新建对象的位置。注意，栈的分配是向低地址扩展，而堆的分配是向高地址扩展。

**最后，调用对象构造器，进行对象初始化操作，完成创建过程**。该*构造过程*，又可细分为以下几个环节：  

（a）*构造VIPUser类型的Type对象*，主要包括静态字段、方法表、实现的接口等，并将其分配在上文提到托管堆的Loader Heap上。

（b）*初始化aUser的两个附加成员：TypeHandle 和 SyncBlockIndex*。
（解析类型）将TypeHandle指针指向Loader Heap上的MethodTable，CLR将根据TypeHandle来定位具体的Type；
（实现对象实例同步）将SyncBlockIndex指针指向Synchronization Block的内存块，用于在多线程环境下对实例对象的同步操作。

（c）调用VIPUser的构造器，进行实例字段的初始化。
实例初始化时，会首先向上递归执行父类初始化，直到完成System.Object类型的初始化，然后再返回执行子类的初始化，直到执行VIPUser类为止。
以本例而言，初始化过程为首先执行System.Object类，再执行User类，最后才是VIPUser类。最终，newobj分配的托管堆的内存地址，被传递给VIPUser的this参数，并将其引用传给栈上声明的aUser。(System.Object->User->VIPUser->封装成aUser->地址丢给线程堆栈)

## 简要说说.NET中GC的运行机制

GC是垃圾回收（Garbage Collect）的缩写,.NET中的垃圾回收是指清理托管堆上不会再被使用的对象内存，并且移动仍在被使用的对象使它们紧靠托管堆的一边。

1. *标记*：**找到所有不再被使用的对象**：对象A和对象C，并标记为垃圾；
2. *移动*：**移动仍在被使用的对象**：对象B和对象D;

![20210427094803-2021-04-27-09-48-04](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427094803-2021-04-27-09-48-04.png)

> 通常情况下，我们不需要手动干预垃圾回收的执行，不过CLR仍然提供了一个手动执行垃圾回收的方法：**GC.Collect()**。当我们需要在某一批对象不再使用并且及时释放内存的时候可以调用该方法来实现。But，垃圾回收的运行成本较高（涉及到了对象块的移动、遍历找到不再被使用的对象、很多状态变量的设置以及Finalize方法的调用等等），对性能影响也较大，**因此我们在编写程序时，应该避免不必要的内存分配，也尽量减少或避免使用GC.Collect()来执行垃圾回收**。

## GC机制中如何判断一个对象仍然在被使用（如何标记）

**Mark-Compact 标记压缩算法**
在.NET中引用类型对象实例通常通过引用来访问，而GC判断堆中的对象是否仍然在被使用的依据也是引用。简单地说：**当没有任何引用指向堆中的某个对象实例时，这个对象就被视为不再使用**。

在GC执行垃圾回收时，会把引用分为以下两类：

（1）**根引用**：往往指那些**静态字段的引用**，或者**存活的局部变量的引用**；

（2）**非根引用**：指那些不属于根引用的引用，往往是**对象实例中的字段**。

垃圾回收时，**GC从所有仍在被使用的根引用出发遍历所有的对象实例，那些不能被遍历到的对象将被视为不再被使用而进行回收。**

![20210427105730-2021-04-27-10-57-31](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427105730-2021-04-27-10-57-31.png)
![20210427105759-2021-04-27-10-58-00](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427105759-2021-04-27-10-58-00.png)

## GC中代（Generation）是什么，分为几代（如何移动）

GC会把所有托管堆内的对象**按照其已经不再被使用的可能性分为三类，并且从最有可能不被使用的类别开始扫描**，.NET对这样的分类类别有一个称呼：代（Generation）。

第0代，新近分配在堆上的对象，**从来没有被垃圾收集过。任何一个新对象，当它第一次被分配在托管堆上时，就是第0代**。
第1代，经历过一次垃圾回收后，依然保留在堆上的对象。
第2代，经历过两次或以上垃圾回收后，依然保留在堆上的对象。**如果第2代对象在进行完垃圾回收后空间仍然不够用，则会抛出OutOfMemoryException异常。**

**并不是每次垃圾回收都会同时回收3个代的所有对象，越小的代拥有着越多被释放的机会。**

CLR对于代的基本算法是：**每执行N次0代的回收，才会执行一次1代的回收，而每执行N次1代的回收，才会执行一次2代的回收。**

![20210427102204-2021-04-27-10-22-05](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427102204-2021-04-27-10-22-05.png)

*根据.NET的垃圾回收机制，0代、1代和2代的初始分配空间分别为256KB、2M和10M。*
一个对象实例存活的时间越长，那么它就具有更大的机率去存活更长的时间。

因为一次GC回收之后仍然被使用的对象会被移动到更高的代上，**因此我们需要避免保留已经不再被使用的对象引用，将对象的引用置为null是告诉.NET该对象不需要再使用的最直接的方法。**

在前面我们提到Finalize方法会大幅影响性能，通过结合对代的理解，我们可以知道：**在带有Finalize方法的对象被回收时，该对象会被视为正在被使用从而被留在托管堆中，且至少要等一个GC循环才能被释放**（为什么是至少一个？因为这取决于执行Finalize方法的线程的执行速度）。很明显，**需要执行Finalize方法的那些对象实例，被真正释放时最乐观的情况下也已经位于1代的位置上了**，而如果它们是在1代上才开始释放或者执行Finalize方法的线程运行得慢了一点，那该对象就在第2代上才被释放，相对于0代，**这样的对象实例在堆中存留的时间将长很多。**

## GC有什么问题

**首先，GC并不是能释放所有的资源。它不能自动释放非托管资源。**
**第二，GC并不是实时性的，这将会造成系统性能上的瓶颈和不确定性。**
GC并不是实时性的，这会造成系统性能上的瓶颈和不确定性。所以有了IDisposable接口，IDisposable接口定义了Dispose方法，这个方法用来供程序员显式调用以释放非托管资源。

## 托管与非托管资源是什么

### 托管资源

.NET中的所有类型都是（直接或间接）从System.Object类型派生的。**.NET中超过80%的资源都是托管资源。**
CTS中的类型被分成两大类——引用类型（reference type，又叫托管类型[managed type]），*分配在内存堆上*；值类型（value type），*分配在堆栈上*。

![20210427145450-2021-04-27-14-54-51](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427145450-2021-04-27-14-54-51.png)

### 非托管资源

ApplicationContext, Brush, Component, ComponentDesigner, Container, Context, Cursor, FileStream, Font, Icon, Image, Matrix, Object, OdbcDataReader, OleDBDataReader, Pen, Regex, Socket, StreamWriter, Timer, Tooltip, 文件句柄, GDI资源, 数据库连接等等资源。可能在使用的时候很多都没有注意到！

## Dispose和Finalize方法在何时被调用（非托管资源回收方法）

1. Dispose方法  
  我们会在Dispose方法中实现*一些托管对象和非托管对象的释放*以及*业绩业务逻辑的结束工作*等等。
  But，即使我们实现了Dispose方法，也不能得到任何有关释放的保证，Dispose方法的调用依赖于类型的使用者，**当类型被不恰当地使用，Dispose方法将不会被调用,我们一般会借助using等语法来帮助Dispose方法被正确调用**。

2. Finalize方法  
  **Finalize在GC执行垃圾回收时被调用**  
  ①当每个包含Finalize方法的类型的实例对象被分配时，.NET会在一张特定的表结构中添加一个引用并且指向这个实例对象，暂且称该表为“**带析构方法的对象表**”；  
  ②当GC执行并且检测到一个不被使用的对象时，需要进一步检查“带析构方法的对象表”来**查询该对象类型是否含有Finalize方法**，**如果没有则将该对象视为垃圾**，**如果存在则将该对象的引用移动到另外一张表**，暂且称其为“待析构的对象表”，并且该对象实例仍然被视为在被使用。  
  ③**CLR将有一个单独的线程负责处理“待析构的对象表”**，其执行方法内部就是依次通过调用其中每个对象的Finalize方法，然后删除引用，这时托管堆中的对象实例就被视为不再被使用。  
  ④下一个GC执行时，将释放已经被调用Finalize方法的那些对象实例。
  ![20210427095721-2021-04-27-09-57-22](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427095721-2021-04-27-09-57-22.png)

3. **结合使用Dispose和Finalize方法：标准Dispose模式**  
  Finalize方法由于有CLR保证调用，因此比Dispose方法更加安全（这里的安全是相对的，Dispose需要类型使用者的及时调用），但在性能方面Finalize方法却要差很多。因此，我们在类型设计时一般都会使用标准Dispose模式：**Finalize方法作为Dispose方法的后备，只有在使用者没有调用Dispose方法的情况下，Finalize方法才被视为需要执行**。这一模式保证了对象能够被高效和安全地释放，已经被广泛使用。
  ![20210427095910-2021-04-27-09-59-11](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427095910-2021-04-27-09-59-11.png)
  
  标准dispose模式模板
  
  ```cs
   public class BaseTemplate : IDisposable
       {
           // 标记对象是否已经被释放
           private bool isDisposed = false;
           // Finalize方法
           ~BaseTemplate()
           {
               Dispose(false);
           }
           // 实现IDisposable接口的Dispose方法
           public void Dispose()
           {
               Dispose(true);
               // 告诉GC此对象的Finalize方法不再需要被调用
               GC.SuppressFinalize(this);
           }
           // 虚方法的Dispose方法做实际的析构工作
           protected virtual void Dispose(bool isDisposing)
           {
               // 当对象已经被析构，则不必再继续执行
               if(isDisposed)
               {
                   return;
               }

               if(isDisposing)
               {
                   // Step1:在这里释放托管资源
               }

               // Step2:在这里释放非托管资源

               // Step3:最后标记对象已被释放
               isDisposed = true;
           }

           public void MethodA()
           {
               if(isDisposed)
               {
                   throw new ObjectDisposedException("对象已经释放");
               }

               // Put the logic code of MethodA
           }

           public void MethodB()
           {
               if (isDisposed)
               {
                   throw new ObjectDisposedException("对象已经释放");
               }

               // Put the logic code of MethodB
           }
       }

       public sealed class SubTemplate : BaseTemplate
       {
           // 标记子类对象是否已经被释放
           private bool disposed = false;

           protected override void Dispose(bool isDisposing)
           {
               // 验证是否已被释放，确保只被释放一次
               if(disposed)
               {
                   return;
               }

               if(isDisposing)
               {
                   // Step1:在这里释放托管的并且在这个子类型中申明的资源
               }

               // Step2:在这里释放非托管的并且这个子类型中申明的资源

               // Step3:调用父类的Dispose方法来释放父类中的资源
               base.Dispose(isDisposing);
               // Step4:设置子类的释放标识
               disposed = true;
           }
       }
  ```

  真正做释放工作的只是受保护的虚方法Dispose，它接收一个bool参数，主要用于区分调用者是类型的使用者还是.NET的GC机制。两者的区别在于**通过Finalize方法释放资源时不能再释放或使用对象中的托管资源，这是因为这时的对象已经处于不被使用的状态，很有可能其中的托管资源已经被释放掉了**。在Dispose方法中**GC.SuppressFinalize(this)**告诉GC此对象在被回收时不需要调用Finalize方法，这一句是改善性能的关键，记住**实现Dispose方法的本质目的就在于避免所有释放工作在Finalize方法中进行。**

## .NET中的托管堆中是否可能出现内存泄露的现象

首先，必须明确一点：**即使在拥有垃圾回收机制的.NET托管堆上，仍然是有可能发生内存泄露现象的**。
其次，什么是内存泄露？**内存泄露是指内存空间上产生了不再被实际使用却又不能被分配的内存空间，其意义很广泛，像内存碎片、不彻底的对象释放等都属于内存泄露现象**。内存泄露将导致主机的内存随着程序的运行而逐渐减少，无论其表现形式怎样，它的危害是很大的，因此我们需要努力地避免。

### 大对象的分配
  
NET中所有的大对象（这里主要是指对象的大小超过指定数值[85000字节]）将分配在托管堆内一个特殊的区域内，暂且将其称为“大对象堆”（这也算是CLR对于GC的一个优化策略）。大对象堆中最重要的一个特点就是：没有代级的概念，所有对象都被视为第2代。**在回收大对象堆内的对象时，其他的大对象不会被移动，这是考虑到大规模地移动对象需要耗费过多的资源**。这样，在程序过多地分配和释放大对象之后，就会产生很多内存碎片。

![20210427140745-2021-04-27-14-07-46](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427140745-2021-04-27-14-07-46.png)

随着对象的分配和释放不断进行，**在不进行对象移动的大对象堆内，将不可避免地产生小的内存碎片**。我们所需要做的就是**尽量减少大对象的分配次数**，尤其是那些作为局部变量的，将被大规模分配和释放的大对象，典型的例子就是String类型。

### 不恰当地保存根引用

最简单的一个错误例子就是**不恰当地把一个对象申明为公共静态变量**，一个公共的静态变量将一直被GC视为一个在使用的根引用。更糟糕的是：**当这个对象内部还包含更多的对象引用时，这些对象同样不会被释放**。

![20210427141902-2021-04-27-14-19-03](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210427141902-2021-04-27-14-19-03.png)

### 不正确的Finalize方法

**不正确的Finalize方法将导致Finalize方法不能被正确执行**。如果系统中所有的Finalize方法不能被正确执行，包含它们的对象也只能驻留在托管堆内不能被释放，这样的情况将会导致严重的后果。
**Finalize方法应该只致力于快速而简单地释放非托管资源**，并且尽可能快地返回。相反，不正确的Finalize方法则可能包含：

*1. 没有保护地写文件日志；*
*2. 访问数据库；*
*3. 访问网络；*
*4. 把当前对象赋给某个存活的引用；*

例如，当Finalize方法试图访问文件系统、数据库或者网络时，将会有资源争用和等待的潜在危险。试想一个不断尝试访问离线数据库的Finalize方法，将会在长时间内不会返回，这不仅影响了对象的释放，也使得排在Finalize方法队列中的所有后续对象得不到释放，这个连锁反应将会导致很快地造成内存耗尽。此外，如果在Finalize方法中把对象自身又赋给了另外一个存活的引用，这时对象内的一部分资源已经被释放掉了，而另外一部分还没有，当这样一个对象被激活后，将导致不可预知的后果。

