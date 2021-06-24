# HTML 基础


## HTML的基础标签

### 基础标签

``` html
<!-- 定义 HTML 文档 -->
<html>

<!-- 头部标签元素 -->
<head>

<!-- 元数据（不显示在页面上，但会被浏览器解析，用于指定网页的描述，关键词） -->
<meta charset="utf-8"> 

<!-- 描述了基本的链接地址/链接目标 -->
<base href="http://www.runoob.com/images/" target="_blank">

<!-- 标签定义了文档与外部资源之间的关系 -->
<link rel="stylesheet" type="text/css" href="mystyle.css">

<!-- 标题 -->
<title>文档标题</title>

<!-- 定义文档的主体 -->
<body>

<!-- h1 - h6 -->
<h1>这是一个标题</h1>
<h2>这是一个标题</h2>
<h3>这是一个标题</h3>

<!-- 段落 -->
<p>这是一个段落。</p>

<!-- 链接 -->
<a href="https://www.baidu.com">这是一个链接</a>

<!-- 图像 -->
<img loading="lazy" src="/images/logo.png" width="258" height="39" />

<!-- map 与 area -->
<img loading="lazy" src="planets.gif" width="145" height="126" alt="Planets" usemap="#planetmap">
 
<map name="planetmap">
  <area shape="rect" coords="0,0,82,126" alt="Sun" href="sun.htm">
  <area shape="circle" coords="90,58,3" alt="Mercury" href="mercur.htm">
  <area shape="circle" coords="124,58,8" alt="Venus" href="venus.htm">
</map>

<!-- 换行 -->
<br>

<!-- 水平线 -->
<hr> 

<!-- 区块 -->
<div> 
<span>

<!-- 注释 -->

```

### 表格、列表、表单、框架、脚本

``` html

<!-- 表格 -->
<table border="1">
    <tr>
        <td>Row 1, cell 1</td>
        <td>Row 1, cell 2</td>
    </tr>
</table>

<!-- 无序列表 -->
<ul>
    <li>Coffee</li>
    <li>Milk</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>Coffee</li>
    <li>Milk</li>
</ol>

<!-- 自定义列表 -->
<dl>
    <dt>Coffee</dt>
        <dd>- black hot drink</dd>
    <dt>Milk</dt>
        <dd>- white cold drink</dd>
</dl>

<!-- 表单 -->
<form>
<!-- Text Fields -->
Name: <input type="text" name="name"><br>
<!-- password -->
Password: <input type="password" name="pwd"><br>
<!-- Radio Buttons -->
<input type="radio" name="sex" value="male">Male<br>
<!-- Checkboxes -->
<input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
<!-- Submit Button -->
<input type="submit" value="Submit">
</form>
<!-- 框架 -->
<iframe src="URL"></iframe>
<!-- 脚本 -->
<script>
    document.write("Hello World!");
</script>

```

### 常用属性

- class： 为html元素定义一个或多个类名（classname）(类名从样式文件引入)
- id： 定义元素的唯一id
- style： 规定元素的行内样式（inline style）
- title： 描述了元素的额外信息 (作为工具条使用)

### 文本格式化

| 标签                       | 描述               |
| -------------------------- | ------------------ |
| **文本格式化标签**         |                    |
| `<b>`                      | 定义粗体文本       |
| `<em>`                     | 定义着重文字       |
| `<i>`                      | 定义斜体字         |
| `<small>`                  | 定义小号字         |
| `<strong>`                 | 定义加重语气       |
| `<sub`>                    | 定义下标字         |
| `<sup>`                    | 定义上标字         |
| `<ins>`                    | 定义插入字         |
| `<del>`                    | 定义删除字         |
| **"计算机输出" 标签**      |                    |
| `<code>`                   | 定义计算机代码     |
| `<kbd>`                    | 定义键盘码         |
| `<samp>`                   | 定义计算机代码样本 |
| `<var>`                    | 定义变量           |
| `<pre>`                    | 定义预格式文本     |
| **引文, 引用, 及标签定义** |                    |
| `<abbr>`                   | 定义缩写           |
| `<address>`                | 定义地址           |
| `<bdo>`                    | 定义文字方向       |
| `<blockquote>`             | 定义长的引用       |
| `<q>`                      | 定义短的引用语     |
| `<cite>`                   | 定义引用、引证     |
| `<dfn>`                    | 定义一个定义项目。 |

### HTML5 新元素

| 标签                   | 描述                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| **<canvas\> 新元素**   |                                                                      |
| `<canvas>`             | 标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API   |
| **新多媒体元素**       |                                                                      |
| `<audio>`              | 定义音频内容                                                         |
| `<video>`              | 定义视频（video 或者 movie）                                         |
| `<source>`             | 定义多媒体资源 `<video>` 和 `<audio>`                                |
| `<embed>`              | 定义嵌入的内容，比如插件。                                           |
| `<track>`              | 为诸如 `<video>` 和 `<audio>` 元素之类的媒介规定外部文本轨道。       |
| **新表单元素**         |                                                                      |
| `<datalist>`           | 定义选项列表。请与 input 元素配合使用该元素，来定义 input 可能的值。 |
| `<keygen>`             | 规定用于表单的密钥对生成器字段。                                     |
| `<output>`             | 定义不同类型的输出，比如脚本的输出。                                 |
| **新的语义和结构元素** |                                                                      |
| `<article>`            | 定义页面独立的内容区域。                                             |
| `<aside>`              | 定义页面的侧边栏内容。                                               |
| `<bdi>`                | 允许您设置一段文本，使其脱离其父元素的文本方向设置。                 |
| `<command>`            | 定义命令按钮，比如单选按钮、复选框或按钮                             |
| `<details>`            | 用于描述文档或文档某个部分的细节                                     |
| `<dialog>`             | 定义对话框，比如提示框                                               |
| `<summary>`            | 标签包含 details 元素的标题                                          |
| `<figure>`             | 规定独立的流内容（图像、图表、照片、代码等等）。                     |
| `<figcaption>`         | 定义 `<figure>` 元素的标题                                           |
| `<footer>`             | 定义 section 或 document 的页脚。                                    |
| `<header>`             | 定义了文档的头部区域                                                 |
| `<mark>`               | 定义带有记号的文本。                                                 |
| `<meter>`              | 定义度量衡。仅用于已知最大和最小值的度量。                           |
| `<nav>`                | 定义导航链接的部分。                                                 |
| `<progress>`           | 定义任何类型的任务的进度。                                           |
| `<ruby>`               | 定义 ruby 注释（中文注音或字符）。                                   |
| `<rt>`                 | 定义字符（中文注音或字符）的解释或发音。                             |
| `<rp>`                 | 在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容。       |
| `<section>`            | 定义文档中的节（section、区段）。                                    |
| `<time>`               | 定义日期或时间。                                                     |
| `<wbr>`                | 规定在文本中的何处适合添加换行符。                                   |

### HTML5 本地储存

客户端存储数据的两个对象为：

- localStorage - 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。
- sessionStorage - 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

``` js
//保存数据  
function save(){  
    var siteurl = document.getElementById("siteurl").value;  
    var sitename = document.getElementById("sitename").value;  
    localStorage.setItem(sitename, siteurl);
    alert("添加成功");
}
//查找数据  
function find(){  
    var search_site = document.getElementById("search_site").value;  
    var sitename = localStorage.getItem(search_site);  
    var find_result = document.getElementById("find_result");  
    find_result.innerHTML = search_site + "的网址是：" + sitename;  
```

### HTML5 Web SQL

Web SQL 数据库 API 并不是 HTML5 规范的一部分，但是它是一个独立的规范，引入了一组使用 SQL 操作客户端数据库的 APIs。  

以下是规范中定义的三个核心方法：

- openDatabase：这个方法使用现有的数据库或者新建的数据库创建一个数据库对象。
- transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
- executeSql：这个方法用于执行实际的 SQL 查询。

``` js
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
var msg;
 
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "菜鸟教程")');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "www.runoob.com")');
    msg = '<p>数据表已创建，且插入了两条数据。</p>';
    document.querySelector('#status').innerHTML =  msg;
});
 
db.transaction(function (tx) {
tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
    var len = results.rows.length, i;
    msg = "<p>查询记录条数: " + len + "</p>";
    document.querySelector('#status').innerHTML +=  msg;
 
    for (i = 0; i < len; i++){
        msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
        document.querySelector('#status').innerHTML +=  msg;
    }
}, null);
});
```

### HTML5 Web Workers

``` html

// demo_workers.js 
var i=0;

function timedCount()
{
    i=i+1;
    postMessage(i);
    setTimeout("timedCount()",500);
}
timedCount();

// web_worker.html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>Web Worker</title> 
</head>
<body>
 
<p>计数： <output id="result"></output></p>
<button onclick="startWorker()">开始工作</button> 
<button onclick="stopWorker()">停止工作</button>
 
<p><strong>注意：</strong> Internet Explorer 9 及更早 IE 版本浏览器不支持 Web Workers.</p>
 
<script>
var w;
function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "抱歉，你的浏览器不支持 Web Workers...";
    }
}
 
function stopWorker() 
{ 
    w.terminate();
    w = undefined;
}
</script>
 
</body>
</html>

```

### HTML5 服务器发送事件(Server-Sent Events)

Server-Sent 事件 - 单向消息传递

``` html
<!-- demo_sse.php -->
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
?>


<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Server-Sent Events</title>
</head>
<body>
<h1>获取服务端更新数据</h1>
<div id="result"></div>

<script>
if(typeof(EventSource)!=="undefined")
{
    var source=new EventSource("demo_sse.php");
    source.onmessage=function(event)
    {
        document.getElementById("result").innerHTML+=event.data + "<br>";
    };
}
else
{
    document.getElementById("result").innerHTML="抱歉，你的浏览器不支持 server-sent 事件...";
}
</script>

</body>
</html>
```

### HTML5 WebSocket

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。

``` html
<!DOCTYPE HTML>
<html>
   <head>
   <meta charset="utf-8">
   <title>WebSocket</title>
    
      <script type="text/javascript">
         function WebSocketTest()
         {
            if ("WebSocket" in window)
            {
               alert("您的浏览器支持 WebSocket!");
               
               // 打开一个 web socket
               var ws = new WebSocket("ws://localhost:9998/echo");
                
               ws.onopen = function()
               {
                  // Web Socket 已连接上，使用 send() 方法发送数据
                  ws.send("发送数据");
                  alert("数据发送中...");
               };
                
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("数据已接收...");
               };
                
               ws.onclose = function()
               { 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
            }
            
            else
            {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
         }
      </script>
        
   </head>
   <body>
   
      <div id="sse">
         <a href="javascript:WebSocketTest()">运行 WebSocket</a>
      </div>
      
   </body>
</html>
```

> [HTML 参考手册](https://www.runoob.com/tags/ref-byfunc.html)

