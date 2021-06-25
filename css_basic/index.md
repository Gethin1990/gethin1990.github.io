# CSS 基础


## CSS 语法

![20210624151345-2021-06-24-15-13-47](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210624151345-2021-06-24-15-13-47.png)

``` css
/*这是个注释*/
p {color:red;text-align:center;}
```

## CSS 选择器

### id选择器

```css
#para1
{
    text-align:center;
    color:red;
}
```

### class 选择器

```css
.center {text-align:center;}
```

## css样式表

### 外部样式表(External style sheet)

```css
/* mystyle.css */
hr {color:sienna;}
p {margin-left:20px;}
body {background-image:url("/images/back40.gif");}
/* html*/
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

### 内部样式表(Internal style sheet)

```html
<head>
    <style>
        hr {color:sienna;}
        p {margin-left:20px;}
        body {background-image:url("images/back40.gif");}
    </style>
</head>
```

### 内联样式(Inline style)

```html
<p style="color:sienna;margin-left:20px">这是一个段落。</p>
```

### 多重样式优先级

（内联样式）**Inline style** > （内部样式）**Internal style sheet** >（外部样式）**External style sheet** > 

### 盒子模型

![20210624161150-2021-06-24-16-11-51](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210624161150-2021-06-24-16-11-51.png)

### 分组选择器

```css
h1,h2,p
{
    color:green;
}
```

### 嵌套选择器

- p{ }: 为所有 p 元素指定一个样式。
- .marked{ }: 为所有 class="marked" 的元素指定一个样式。
- .marked p{ }: 为所有 class="marked" 元素内的 p 元素指定一个样式。
- p.marked{ }: 为所有 class="marked" 的 p 元素指定一个样式。

```css
p
{
    color:blue;
    text-align:center;
}
.marked
{
    background-color:red;
}
.marked p
{
    color:white;
}
p.marked{
    text-decoration:underline;
}
```

### 隐藏元素

- visibility:hidden可以隐藏某个元素，但隐藏的元素仍需占用与未隐藏之前一样的空间。也就是说，该元素虽然被隐藏了，但仍然会影响布局。
- display:none可以隐藏某个元素，且隐藏的元素不会占用任何空间。也就是说，该元素不但被隐藏了，而且该元素原本占用的空间也会从页面布局中消失。

块元素是一个元素，占用了全部宽度，在前后都是换行符。  
内联元素只需要必要的宽度，不强制换行。  
块元素：`<h1>` `<p>` `<div>`  
内联元素 `<span>` `<a>`  

如何改变一个元素显示

`li {display:inline;}` `span {display:block;}`

### Position(定位)

- static 定位  
    HTML 元素的默认值，即没有定位，遵循正常的文档流对象。
- fixed 定位  
    元素的位置相对于浏览器窗口是固定位置。
    即使窗口是滚动的它也不会移动。
- relative 定位
    相对定位元素的定位是相对其正常位置。
- absolute 定位
    绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`。
- sticky 定位
    sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位。
    position: sticky; 基于用户的滚动位置来定位。
    粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。
- 重叠的元素
    元素的定位与文档流无关，所以它们可以覆盖页面上的其它元素
    z-index属性指定了一个元素的堆叠顺序（哪个元素应该放在前面，或后面）

### Float(浮动)

- CSS 的 Float（浮动），会使元素向左或向右移动，其周围的元素也会重新排列。

    ```css
    img
    {
        float:right;
    }
    ```

- 元素浮动之后，周围的元素会重新排列，为了避免这种情况，使用 clear 属性。

    ```css
    .text_line
    {
        clear:both;
    }
    ```

### CSS 布局 - 水平 & 垂直对齐

- 元素居中对齐： `margin: auto;`
- 文本居中对齐: `text-align: center;`
- 图片居中对齐：`margin: auto;`
- 左右对齐 - 使用定位方式: `position: absolute;right: 0px;`
- 左右对齐 - 使用 float 方式：`float: right;`
- 垂直居中对齐 - 使用 padding: `padding: 70px 0;` `text-align: center`
- 垂直居中 - 使用 line-height: `line-height: 1.5;`
- 垂直居中 - 使用 position 和 transform：`position: absolute;transform: translate(-50%, -50%);`

### 组合选择符

- 后代选择器(以空格     分隔)
- 子元素选择器(以大于 > 号分隔）
- 相邻兄弟选择器（以加号 + 分隔）
- 普通兄弟选择器（以波浪号 ～ 分隔）

### 伪类(Pseudo-classes) & 伪元素

`selector:pseudo-class {property:value;}`
`selector:pseudo-element {property:value;}`

### 导航栏、下拉菜单、提示工具、图片廊、图像透明、图像拼合、表单、网页布局

参考：<https://www.runoob.com/css/css-navbar.html>

### 属性选择器

```css
[title]
{
    color:blue;
}
```

## CSS 基础

| 属性                  | 描述                                                                    |
| --------------------- | ----------------------------------------------------------------------- |
| **CSS 背景**          |
| background            | 简写属性，作用是将背景属性设置在一个声明中。                            |
| background-attachment | 背景图像是否固定或者随着页面的其余部分滚动。                            |
| background-color      | 设置元素的背景颜色。                                                    |
| background-image      | 把图像设置为背景。                                                      |
| background-position   | 设置背景图像的起始位置。                                                |
| ackground-repeat      | 设置背景图像是否及如何重复。                                            |
| **CSS 文本格式**      |
| color                 | 设置文本颜色                                                            |
| direction             | 设置文本方向。                                                          |
| letter-spacing        | 设置字符间距                                                            |
| line-height           | 设置行高                                                                |
| text-align            | 对齐元素中的文本                                                        |
| text-decoration       | 向文本添加修饰                                                          |
| text-indent           | 缩进元素中文本的首行                                                    |
| text-shadow           | 设置文本阴影                                                            |
| text-transform        | 控制元素中的字母                                                        |
| unicode-bidi          | 设置或返回文本是否被重写                                                |
| vertical-align        | 设置元素的垂直对齐                                                      |
| white-space           | 设置元素中空白的处理方式                                                |
| word-spacing          | 设置字间距                                                              |
| **CSS字体**           |                                                                         |
| font                  | 在一个声明中设置所有的字体属性                                          |
| font-family           | 指定文本的字体系列                                                      |
| font-size             | 指定文本的字体大小                                                      |
| font-style            | 指定文本的字体样式                                                      |
| font-variant          | 以小型大写字体或者正常字体显示文本。                                    |
| font-weight           | 指定字体的粗细。                                                        |
| **链接样式**          |                                                                         |
| a:link                | 正常，未访问过的链接                                                    |
| a:visited             | 用户已访问过的链接                                                      |
| a:hover               | 当用户鼠标放在链接上时                                                  |
| a:active              | 链接被点击的那一刻                                                      |
| **CSS列表属性**       |
| list-style            | 简写属性。用于把所有用于列表的属性设置于一个声明中                      |
| list-style-image      | 将图像设置为列表项标志。                                                |
| list-style-position   | 设置列表中列表项标志的位置。                                            |
| list-style-type       | 设置列表项标志的类型。                                                  |
| **CSS 盒子模型**      |
| Margin(外边距)        | 清除边框外的区域，外边距是透明的。                                      |
| Border(边框)          | 围绕在内边距和内容外的边框。                                            |
| Padding(内边距)       | 清除内容周围的区域，内边距是透明的。                                    |
| Content(内容)         | 盒子的内容，显示文本和图像。                                            |
| **CSS 边框属性**      |
| border                | 简写属性，用于把针对四个边的属性设置在一个声明。                        |
| border-style          | 用于设置元素所有边框的样式，或者单独地为各边设置边框样式。              |
| border-width          | 简写属性，用于为元素的所有边框设置宽度，或者单独地为各边边框设置宽度。  |
| border-color          | 简写属性，设置元素的所有边框中可见部分的颜色，或为 4 个边分别设置颜色。 |
| **CSS 尺寸**          |
| height                | 设置元素的高度。                                                        |
| line-height           | 设置行高。                                                              |
| max-height            | 设置元素的最大高度。                                                    |
| max-width             | 设置元素的最大宽度。                                                    |
| min-height            | 设置元素的最小高度。                                                    |
| min-width             | 设置元素的最小宽度。                                                    |
| width                 | 设置元素的宽度。                                                        |
| **CSS Overflow**      |
| visible               | 默认值。内容不会被修剪，会呈现在元素框之外。                            |
| hidden                | 内容会被修剪，并且其余内容是不可见的。                                  |
| scroll                | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。                |
| auto                  | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。                |
| inherit               | 规定应该从父元素继承 overflow 属性的值。                                |
| **CSS 伪类**          |                                                                         |
| :checked              | 选择所有选中的表单元素                                                  |
| :disabled             | 选择所有禁用的表单元素                                                  |
| :empty                | 选择所有没有子元素的p元素                                               |
| :enabled              | 选择所有启用的表单元素                                                  |
| :first-of-type        | 选择的每个 p 元素是其父元素的第一个 p 元素                              |
| :in-range             | 选择元素指定范围内的值                                                  |
| :invalid              | 选择所有无效的元素                                                      |
| :last-child           | 选择所有p元素的最后一个子元素                                           |
| :last-of-type         | 选择每个p元素是其母元素的最后一个p元素                                  |
| :not(selector)        | 选择所有p以外的元素                                                     |
| :nth-child(n)         | 选择所有 p 元素的父元素的第二个子元素                                   |
| :nth-last-child(n)    | 选择所有p元素倒数的第二个子元素                                         |
| :nth-last-of-type(n)  | 选择所有p元素倒数的第二个为p的子元素                                    |
| :nth-of-type(n)       | 选择所有p元素第二个为p的子元素                                          |
| :only-of-type         | 选择所有仅有一个子元素为p的元素                                         |
| :only-child           | 选择所有仅有一个子元素的p元素                                           |
| :optional             | 选择没有"required"的元素属性                                            |
| :out-of-range         | 选择指定范围以外的值的元素属性                                          |
| :read-only            | 选择只读属性的元素属性                                                  |
| :read-write           | 选择没有只读属性的元素属性                                              |
| :required             | 选择有"required"属性指定的元素属性                                      |
| :root                 | 选择文档的根元素                                                        |
| :target               | 选择当前活动#news元素(点击URL包含锚的名字)                              |
| :valid                | 选择所有有效值的属性                                                    |
| :link                 | 选择所有未访问链接                                                      |
| :visited              | 选择所有访问过的链接                                                    |
| :active               | 选择正在活动链接                                                        |
| :hover                | 把鼠标放在链接上的状态                                                  |
| :focus                | 选择元素输入后具有焦点                                                  |
| :first-letter         | 选择每个`<p>` 元素的第一个字母                                          |
| :first-line           | 选择每个`<p>` 元素的第一行                                              |
| :first-child          | 选择器匹配属于任意元素的第一个子元素的 `<p>` 元素                       |
| :before               | 在每个`<p>`元素之前插入内容                                             |
| :after                | 在每个`<p>`元素之后插入内容                                             |
| :lang(language)       | 为`<p>`元素的lang属性选择一个开始值                                     |
| **CSS伪元素**         |
| :link                 | 选择所有未访问链接                                                      |
| :visited              | 选择所有访问过的链接                                                    |
| :active               | 选择正在活动链接                                                        |
| :hover                | 把鼠标放在链接上的状态                                                  |
| :focus                | 选择元素输入后具有焦点                                                  |
| :first-letter         | 选择每个`<p>` 元素的第一个字母                                          |
| :first-line           | 选择每个`<p>` 元素的第一行                                              |
| :first-child          | 选择器匹配属于任意元素的第一个子元素的 `<p>` 元素                       |
| :before               | 在每个`<p>`元素之前插入内容                                             |
| :after                | 在每个`<p>`元素之后插入内容                                             |
| :lang(language)       | 为`<p>`元素的lang属性选择一个开始值                                     |
| **媒体类型**          |
| all                   | 用于所有的媒体设备。                                                    |
| aural                 | 用于语音和音频合成器。                                                  |
| braille               | 用于盲人用点字法触觉回馈设备。                                          |
| embossed              | 用于分页的盲人用点字法打印机。                                          |
| handheld              | 用于小的手持的设备。                                                    |
| print                 | 用于打印机。                                                            |
| projection            | 用于方案展示，比如幻灯片。                                              |
| screen                | 用于电脑显示器。                                                        |
| tty                   | 用于使用固定密度字母栅格的媒体，比如电传打字机和终端。                  |
| tv                    | 用于电视机类型的设备。                                                  |
| **计数器**            |
| content               | 使用 ::before 和 ::after 伪元素来插入自动生成的内容                     |
| counter-increment     | 递增一个或多个值                                                        |
| counter-reset         | 创建或重置一个或多个计数器                                              |

## CSS3 基础

### 图片、按钮、分页、框大小、弹性盒子、多媒体查询

参考：<https://www.runoob.com/css3/css3-images.html>

### 基础属性如下

| 属性                                                                                       | 描述                                                                                     |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **边框**                                                                                   |
| border-image                                                                               | 设置所有边框图像的速记属性。                                                             |
| border-radius                                                                              | 一个用于设置所有四个边框- *-半径属性的速记属性                                           |
| box-shadow                                                                                 | 附加一个或多个下拉框的阴影                                                               |
| **圆角**                                                                                   |
| border-radius                                                                              | 所有四个边角 border-*-*-radius 属性的缩写                                                |
| border-top-left-radius                                                                     | 定义了左上角的弧度                                                                       |
| border-top-right-radius                                                                    | 定义了右上角的弧度                                                                       |
| border-bottom-right-radius                                                                 | 定义了右下角的弧度                                                                       |
| border-bottom-left-radius                                                                  | 定义了左下角的弧度                                                                       |
| **背景**                                                                                   |
| background-clip                                                                            | 规定背景的绘制区域。                                                                     |
| background-origin                                                                          | 规定背景图片的定位区域。                                                                 |
| background-size                                                                            | 规定背景图片的尺寸。                                                                     |
| **渐变**                                                                                   |
| `background-image: linear-gradient(direction, color-stop1, color-stop2, ...);`             | 线性渐变                                                                                 |
| `background-image: linear-gradient(angle, color-stop1, color-stop2);`                      | 角度渐变                                                                                 |
| `background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));`           | 透明度                                                                                   |
| `background-image: repeating-linear-gradient(red, yellow 10%, green 20%);`                 | 重复线性渐变                                                                             |
| `background-image: radial-gradient(shape size at position, start-color, ..., last-color);` | 径向渐变                                                                                 |
| `background-image: radial-gradient(circle, red, yellow, green);`                           | 设置形状                                                                                 |
| closest-side、farthest-side、closest-corner、farthest-corner                               | 不同尺寸大小关键字                                                                       |
| `background-image: repeating-radial-gradient(red, yellow 10%, green 15%);`                 | 重复的径向渐变                                                                           |
| **新文本**                                                                                 |
| hanging-punctuation                                                                        | 规定标点字符是否位于线框之外。                                                           |
| punctuation-trim                                                                           | 规定是否对标点字符进行修剪。                                                             |
| text-align-last                                                                            | 设置如何对齐最后一行或紧挨着强制换行符之前的行。                                         |
| text-emphasis                                                                              | 向元素的文本应用重点标记以及重点标记的前景色。                                           |
| text-justify                                                                               | 规定当 text-align 设置为 "justify" 时所使用的对齐方法。                                  |
| text-outline                                                                               | 规定文本的轮廓。                                                                         |
| text-overflow                                                                              | 规定当文本溢出包含元素时发生的事情。                                                     |
| text-shadow                                                                                | 向文本添加阴影。                                                                         |
| text-wrap                                                                                  | 规定文本的换行规则。                                                                     |
| word-break                                                                                 | 规定非中日韩文本的换行规则。                                                             |
| word-wrap                                                                                  | 允许对长的不可分割的单词进行分割并换行到下一行。                                         |
| **新转换属性**                                                                             |
| transform                                                                                  | 适用于2D或3D转换的元素                                                                   |
| transform-origin                                                                           | 允许您更改转化元素位置                                                                   |
| transform-style                                                                            | 规定被嵌套元素如何在 3D 空间中显示。                                                     |
| perspective                                                                                | 规定 3D 元素的透视效果。                                                                 |
| perspective-origin                                                                         | 规定 3D 元素的底部位置                                                                   |
| backface-visibility                                                                        | 定义元素在不面对屏幕时是否可见。                                                         |
| **2D 转换方法**                                                                            |
| matrix(n,n,n,n,n,n)                                                                        | 定义 2D 转换，使用六个值的矩阵。                                                         |
| translate(x,y)                                                                             | 定义 2D 转换，沿着 X 和 Y 轴移动元素。                                                   |
| translateX(n)                                                                              | 定义 2D 转换，沿着 X 轴移动元素。                                                        |
| translateY(n)                                                                              | 定义 2D 转换，沿着 Y 轴移动元素。                                                        |
| scale(x,y)                                                                                 | 定义 2D 缩放转换，改变元素的宽度和高度。                                                 |
| scaleX(n)                                                                                  | 定义 2D 缩放转换，改变元素的宽度。                                                       |
| scaleY(n)                                                                                  | 定义 2D 缩放转换，改变元素的高度。                                                       |
| rotate(angle)                                                                              | 定义 2D 旋转，在参数中规定角度。                                                         |
| skew(x-angle,y-angle)                                                                      | 定义 2D 倾斜转换，沿着 X 和 Y 轴。                                                       |
| skewX(angle)                                                                               | 定义 2D 倾斜转换，沿着 X 轴。                                                            |
| skewY(angle)                                                                               | 定义 2D 倾斜转换，沿着 Y 轴。                                                            |
| **3D 转换方法**                                                                            |
| matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)                                                  | 定义 3D 转换，使用 16 个值的 4x4 矩阵。                                                  |
| translate3d(x,y,z)                                                                         | 定义 3D 转化。                                                                           |
| translateX(x)                                                                              | 定义 3D 转化，仅使用用于 X 轴的值。                                                      |
| translateY(y)                                                                              | 定义 3D 转化，仅使用用于 Y 轴的值。                                                      |
| translateZ(z)                                                                              | 定义 3D 转化，仅使用用于 Z 轴的值。                                                      |
| scale3d(x,y,z)                                                                             | 定义 3D 缩放转换。                                                                       |
| scaleX(x)                                                                                  | 定义 3D 缩放转换，通过给定一个 X 轴的值。                                                |
| scaleY(y)                                                                                  | 定义 3D 缩放转换，通过给定一个 Y 轴的值。                                                |
| scaleZ(z)                                                                                  | 定义 3D 缩放转换，通过给定一个 Z 轴的值。                                                |
| rotate3d(x,y,z,angle)                                                                      | 定义 3D 旋转。                                                                           |
| rotateX(angle)                                                                             | 定义沿 X 轴的 3D 旋转。                                                                  |
| rotateY(angle)                                                                             | 定义沿 Y 轴的 3D 旋转。                                                                  |
| rotateZ(angle)                                                                             | 定义沿 Z 轴的 3D 旋转。                                                                  |
| perspective(n)                                                                             | 定义 3D 转换元素的透视视图。                                                             |
| **过渡属性**                                                                               |
| transition                                                                                 | 简写属性，用于在一个属性中设置四个过渡属性。                                             |
| transition-property                                                                        | 规定应用过渡的 CSS 属性的名称。                                                          |
| transition-duration                                                                        | 定义过渡效果花费的时间。默认是 0。                                                       |
| transition-timing-function                                                                 | 规定过渡效果的时间曲线。默认是 "ease"。                                                  |
| transition-delay                                                                           | 规定过渡效果何时开始。默认是 0。                                                         |
| **动画属性**                                                                               |
| @keyframes                                                                                 | 规定动画。                                                                               |
| animation                                                                                  | 所有动画属性的简写属性。                                                                 |
| animation-name                                                                             | 规定 @keyframes 动画的名称。                                                             |
| animation-duration                                                                         | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。                                         |
| animation-timing-function                                                                  | 规定动画的速度曲线。默认是 "ease"。                                                      |
| animation-fill-mode                                                                        | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| animation-delay                                                                            | 规定动画何时开始。默认是 0。                                                             |
| animation-iteration-count                                                                  | 规定动画被播放的次数。默认是 1。                                                         |
| animation-direction                                                                        | 规定动画是否在下一周期逆向地播放。默认是 "normal"。                                      |
| animation-play-state                                                                       | 规定动画是否正在运行或暂停。默认是 "running"。                                           |
| **多列属性**                                                                               |
| column-count                                                                               | 指定元素应该被分割的列数。                                                               |
| column-fill                                                                                | 指定如何填充列                                                                           |
| column-gap                                                                                 | 指定列与列之间的间隙                                                                     |
| column-rule                                                                                | 所有 column-rule-* 属性的简写                                                            |
| column-rule-color                                                                          | 指定两列间边框的颜色                                                                     |
| column-rule-style                                                                          | 指定两列间边框的样式                                                                     |
| column-rule-width                                                                          | 指定两列间边框的厚度                                                                     |
| column-span                                                                                | 指定元素要跨越多少列                                                                     |
| column-width                                                                               | 指定列的宽度                                                                             |
| columns                                                                                    | column-width 与 column-count 的简写属性。                                                |
| **用户界面特性**                                                                           |
| appearance                                                                                 | 允许您使一个元素的外观像一个标准的用户界面元素                                           |
| box-sizing                                                                                 | 允许你以适应区域而用某种方式定义某些元素                                                 |
| icon                                                                                       | 为创作者提供了将元素设置为图标等价物的能力。                                             |
| nav-down                                                                                   | 指定在何处使用箭头向下导航键时进行导航                                                   |
| nav-index                                                                                  | 指定一个元素的Tab的顺序                                                                  |
| nav-left                                                                                   | 指定在何处使用左侧的箭头导航键进行导航                                                   |
| nav-right                                                                                  | 指定在何处使用右侧的箭头导航键进行导航                                                   |
| nav-up                                                                                     | 指定在何处使用箭头向上导航键时进行导航                                                   |
| outline-offset                                                                             | 外轮廓修饰并绘制超出边框的边缘                                                           |
| resize                                                                                     | 指定一个元素是否是由用户调整大小                                                         |
| **弹性盒子属性**                                                                           |
| display                                                                                    | 指定 HTML 元素盒子类型。                                                                 |
| flex-direction                                                                             | 指定了弹性容器中子元素的排列方式                                                         |
| justify-content                                                                            | 设置弹性盒子元素在主轴（横轴）方向上的对齐方式。                                         |
| align-items                                                                                | 设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式。                                         |
| flex-wrap                                                                                  | 设置弹性盒子的子元素超出父容器时是否换行。                                               |
| align-content                                                                              | 修改 flex-wrap 属性的行为，类似 align-items, 但不是设置子元素对齐，而是设置行对齐        |
| flex-flow                                                                                  | flex-direction 和 flex-wrap 的简写                                                       |
| order                                                                                      | 设置弹性盒子的子元素排列顺序。                                                           |
| align-self                                                                                 | 在弹性子元素上使用。覆盖容器的 align-items 属性。                                        |
| flex                                                                                       | 设置弹性盒子的子元素如何分配空间。                                                       |
| **多媒体查询语法**                                                                         |
| `@media not|only mediatype and (expressions) {CSS 代码...;}`                               | `@media screen and (max-width: 480px) {body {background-color: lightgreen;}}`            |
| **多媒体类型**                                                                             |
| all                                                                                        | 用于所有多媒体类型设备                                                                   |
| print                                                                                      | 用于打印机                                                                               |
| screen                                                                                     | 用于电脑屏幕，平板，智能手机等。                                                         |
| speech                                                                                     | 用于屏幕阅读器                                                                           |

