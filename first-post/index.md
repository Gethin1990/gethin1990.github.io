# 一篇关于主题功能测试的文章


了解如何在 **LoveIt** 主题中快速, 直观地创建和组织内容。
<!--more-->
此文章用于测试。
{{< admonition note "以下内容仅用于测试主题功能" >}}
{{< version 0.0.1 >}}

### LoveIt 的文章列表参考如下

[hugoloveit](https://hugoloveit.com/zh-cn/posts/)

<https://hugoloveit.com/zh-cn/posts/>

{{< /admonition >}}

## 1 内容组织

1. 保持博客文章存放在 content/posts 目录, 例如: content/posts/我的第一篇文章.md
2. 保持简单的静态页面存放在 content 目录, 例如: content/about.md
3. 本地资源组织
   1. 使用[页面包](https://gohugo.io/content-management/page-bundles/)中的[页面资源](https://gohugo.io/content-management/page-resources/).
   你可以使用适用于 `Resources.GetMatch` 的值或者直接使用相对于当前页面目录的文件路径来引用页面资源.
   2. 将本地资源放在 assets 目录中, 默认路径是 /assets. 引用资源的文件路径是相对于 assets 目录的.
   3. 将本地资源放在 static 目录中, 默认路径是 /static. 引用资源的文件路径是相对于 static 目录的

## 2 前置参数

```yaml
---
title: "我的第一篇文章"
subtitle: "" # 文章副标题
date: 2020-03-04T15:58:26+08:00  # 这篇文章创建的日期时间. 它通常是从文章的前置参数中的 date 字段获取的, 但是也可以在 网站配置 中设置.
lastmod: 2020-03-04T15:58:26+08:00 # 上次修改内容的日期时间.
draft: true # 如果设为 true, 除非 hugo 命令使用了 --buildDrafts/-D 参数, 这篇文章不会被渲染.
author: "" # 文章作者.
authorLink: "" # 文章作者的链接.
description: "" # 文章内容的描述.
license: "" # 这篇文章特殊的许可.
images: [] # 页面图片, 用于 Open Graph 和 Twitter Cards.

tags: [] # 文章的标签.
categories: [] # 文章所属的类别.
featuredImage: "" # 文章的特色图片.
featuredImagePreview: "" # 用在主页预览的文章特色图片.

hiddenFromHomePage: false # 如果设为 true, 这篇文章将不会显示在主页上.
hiddenFromSearch: false # 如果设为 true, 这篇文章将不会显示在搜索结果中.
twemoji: false # 如果设为 true, 这篇文章会使用 twemoji.
lightgallery: true # 如果设为 true, 文章中的图片将可以按照画廊形式呈现.
ruby: true # 如果设为 true, 这篇文章会使用 上标注释扩展语法.
fraction: true #  如果设为 true, 这篇文章会使用 分数扩展语法.
fontawesome: true # 如果设为 true, 这篇文章会使用 Font Awesome 扩展语法.
linkToMarkdown: true # 如果设为 true, 内容的页脚将显示指向原始 Markdown 文件的链接.
rssFullText: false # 如果设为 true, 在 RSS 中将会显示全文内容.

toc:
  enable: true
  auto: true
code:
  copy: true
  # ...
math:
  enable: true
  # ...
mapbox:
  accessToken: ""
  # ...
share:
  enable: true
  # ...
comment:
  enable: true
  # ...
library:
  css:
    # someCSS = "some.css"
    # 位于 "assets/"
    # 或者
    # someCSS = "https://cdn.example.com/some.css"
  js:
    # someJS = "some.js"
    # 位于 "assets/"
    # 或者
    # someJS = "https://cdn.example.com/some.js"
seo:
  images: []
  # ...

## featuredImage 和 featuredImagePreview 支持本地资源引用的完整用法.
resources:
- name: featured-image
  src: featured-image.jpg
- name: featured-image-preview
  src: featured-image-preview.jpg

---
```

## 3 内容摘要

![文章摘要预览](images/summary.zh-cn.png "文章摘要预览")

### 3.1 自动摘要拆分

网站设置 `summaryLength`

### 3.2 手动摘要拆分

添加 `<!--more-->`

### 3.3 前置参数摘要

前置参数 `summary`

### 3.4 使用文章描述作为摘要

前置参数 `description`

## 4 Markdown 基本语法

ignore

## 5 Markdown 扩展语法

### 5.1 Emoji 支持

<https://hugoloveit.com/zh-cn/emoji-support/>

:grinning:,:smile:,:laughing:,:rofl:,:sweat_smile:,:joy:

### 5.2 数学公式

``` markdown
$$ c = \pm\sqrt{a^2 + b^2} $$
```

$$ c = \pm\sqrt{a^2 + b^2} $$

### 5.3 行内公式

默认的行内公式分割符是 `$/$` 和 `\\(/\\)`

``` markdown
$ c = \pm\sqrt{a^2 + b^2} $ 和 \\( f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \\)
```

$ c = \pm\sqrt{a^2 + b^2} $ 和 \\( f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \\)

### 5.4 mhchem

``` markdown
$$ \ce{CO2 + C -> 2 CO} $$

$$ \ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} $$
```

$$ \ce{CO2 + C -> 2 CO} $$

$$ \ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} $$

### 5.5 字符注音或者注释

``` markdown
[Hugo]{?^}(一个开源的静态网站生成工具)
```

[Hugo]^(一个开源的静态网站生成工具)

### 5.6 分数

``` markdown
[99]{?/}[100]
```

[99]/[100]

### 5.7 Font Awesome

``` markdown
真开心! {?:}(far fa-grin-tears):
```

真开心! :(far fa-grin-tears):

### 5.8 转义字符

``` markdown
{{??}:}joy:
```

{?:}joy:

## 6 内置 Shortcodes

<https://hugoloveit.com/zh-cn/theme-documentation-built-in-shortcodes/>

### 6.1 figure

```markdown
{{</* figure src="/images/lighthouse.jpg" title="Lighthouse (figure)" */>}}
```

### 6.2 gist

```markdown
{{</* gist spf13 7896402 */>}}
```

### 6.3 highlight

```markdown
{{</* highlight html */>}}
<section id="main">
    <div>
        <h1 id="title">{{ .Title }}</h1>
        {{ range .Pages }}
            {{ .Render "summary"}}
        {{ end }}
    </div>
</section>
{{</* /highlight */>}}
```

### 6.4 instagram

[`instagram` 的文档](https://gohugo.io/content-management/shortcodes#instagram)

```markdown
{{</* instagram BWNjjyYFxVx hidecaption */>}}
```

### 6.5 param

[`param` 的文档](https://gohugo.io/content-management/shortcodes#param)

```markdown
{{</* param description */>}}
```

### 6.6 ref 和 relref

[`ref` 和 `relref` 的文档](https://gohugo.io/content-management/shortcodes#ref-and-relref)

### 6.7 tweet

[`tweet` 的文档](https://gohugo.io/content-management/shortcodes#tweet)

```markdown
{{</* tweet 877500564405444608 */>}}
```

### 6.8 vimeo

[`vimeo` 的文档](https://gohugo.io/content-management/shortcodes#vimeo)

```markdown
{{</* vimeo 146022717 */>}}
```

### 6.9 youtube

[`youtube` 的文档](https://gohugo.io/content-management/shortcodes#youtube)

```markdown
{{</* youtube w7Ft2ymGmfc */>}}
```

## 7 扩展shortcodes

### 7.1 style

```markdown
{{</* style "text-align:right; strong{color:#00b1ff;}" */>}}
This is a **right-aligned** paragraph.
{{</* /style */>}}
```

{{< style "text-align:right; strong{color:#00b1ff;}" >}}
This is a **right-aligned** paragraph.
{{< /style >}}

### 7.2 link

* **href** *[必需]*
* **content** *[可选]*
* **title** *[可选]*
* **rel** *[可选]*
* **class** *[可选]*

```markdown
{{</* link "https://github.com/upstage/" Upstage "Visit Upstage!" */>}}
或者
{{</* link href="https://github.com/upstage/" content=Upstage title="Visit Upstage!" */>}}
```

{{< link "https://github.com/upstage/" Upstage "Visit Upstage!" >}}

### 7.3 image

* **src** *[必需]* 图片的 URL.
* **alt** *[可选]* 图片无法显示时的替代文本, 默认值是 **src** 参数的值.
* **caption** *[可选]*  图片标题.
* **title** *[可选]* 当悬停在图片上会显示的提示.
* **class** *[可选]* HTML `figure` 标签的 `class` 属性.
* **src_s** *[可选]* 图片缩略图的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.
* **src_l** *[可选]* 高清图片的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.
* **height** *[可选]* 图片的 `height` 属性.
* **width** *[可选]*  图片的 `width` 属性.
* **linked** *[可选]* 图片是否需要被链接, 默认值是 `true`.
* **rel** *[可选]* HTML `a` 标签 的 `rel` 补充属性, 仅在 **linked** 属性设置成 `true` 时有效.

```markdown
{{</* image src="/images/lighthouse.jpg" caption="Lighthouse (`image`)" src_s="/images/lighthouse-small.jpg" src_l="/images/lighthouse-large.jpg" */>}}
```

{{< image src="/images/lighthouse.jpg" caption="lighthouse (`image`)" src_s="/images/lighthouse-small.jpg" src_l="/images/lighthouse-large.jpg" >}}

### 7.4 admonition

{{< admonition >}}
一个 **注意** 横幅
{{< /admonition >}}

{{< admonition abstract >}}
一个 **摘要** 横幅
{{< /admonition >}}

{{< admonition info >}}
一个 **信息** 横幅
{{< /admonition >}}

{{< admonition tip >}}
一个 **技巧** 横幅
{{< /admonition >}}

{{< admonition success >}}
一个 **成功** 横幅
{{< /admonition >}}

{{< admonition question >}}
一个 **问题** 横幅
{{< /admonition >}}

{{< admonition warning >}}
一个 **警告** 横幅
{{< /admonition >}}

{{< admonition failure >}}
一个 **失败** 横幅
{{< /admonition >}}

{{< admonition danger >}}
一个 **危险** 横幅
{{< /admonition >}}

{{< admonition bug >}}
一个 **Bug** 横幅
{{< /admonition >}}

{{< admonition example >}}
一个 **示例** 横幅
{{< /admonition >}}

{{< admonition quote >}}
一个 **引用** 横幅
{{< /admonition >}}

`admonition` shortcode 有以下命名参数:

* **type** *[必需]*  `admonition` 横幅的类型, 默认值是 `note`.

* **title** *[可选]* `admonition` 横幅的标题, 默认值是 **type** 参数的值.

* **open** *[可选]* 横幅内容是否默认展开, 默认值是 `true`.

一个 `admonition` 示例:

```markdown
{{</* admonition type=tip title="This is a tip" open=false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
或者
{{</* admonition tip "This is a tip" false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
```

呈现的输出效果如下:

{{< admonition tip "This is a tip" false >}}
一个 **技巧** 横幅
{{< /admonition >}}

### 7.5 mermaid

[mermaid](https://mermaidjs.github.io/) 是一个可以帮助你在文章中生成图表和流程图的库, 类似 Markdown 的语法.

#### 7.5.1 流程图

一个 **流程图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{< /mermaid >}}

#### 7.5.2 时序图

一个 **时序图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
{{< /mermaid >}}

#### 7.5.3 甘特图

一个 **甘特图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram functionality to mermaid
    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2               :         des4, after des3, 5d
    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram functionality to mermaid
    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2               :         des4, after des3, 5d
    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d
{{< /mermaid >}}

#### 7.5.4 类图

一个 **类图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label
{{< /mermaid >}}

#### 7.5.5 状态图

一个 **状态图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
{{< /mermaid >}}

#### 7.5.6 Git 图

一个 **Git 图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
gitGraph:
options
{
    "nodeSpacing": 100,
    "nodeRadius": 10
}
end
    commit
    branch newbranch
    checkout newbranch
    commit
    commit
    checkout master
    commit
    commit
    merge newbranch
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
gitGraph:
options
{
    "nodeSpacing": 100,
    "nodeRadius": 10
}
end
    commit
    branch newbranch
    checkout newbranch
    commit
    commit
    checkout master
    commit
    commit
    merge newbranch
{{< /mermaid >}}

#### 7.5.7 饼图

一个 **饼图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
pie
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
pie
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
{{< /mermaid >}}

### 7.5.8 echarts

[ECharts](https://echarts.apache.org/) 是一个帮助你生成交互式数据可视化的库.
ECharts 提供了常规的 [折线图](https://echarts.apache.org/zh/option.html#series-line), [柱状图](https://echarts.apache.org/zh/option.html#series-line), [散点图](https://echarts.apache.org/zh/option.html#series-scatter), [饼图](https://echarts.apache.org/zh/option.html#series-pie), [K线图](https://echarts.apache.org/zh/option.html#series-candlestick), 用于统计的 [盒形图](https://echarts.apache.org/zh/option.html#series-boxplot), 用于地理数据可视化的 [地图](https://echarts.apache.org/zh/option.html#series-map), [热力图](https://echarts.apache.org/zh/option.html#series-heatmap), [线图](https://echarts.apache.org/zh/option.html#series-lines), 用于关系数据可视化的 [关系图](https://echarts.apache.org/zh/option.html#series-graph), [treemap](https://echarts.apache.org/zh/option.html#series-treemap), [旭日图](https://echarts.apache.org/zh/option.html#series-sunburst), 多维数据可视化的 [平行坐标](https://echarts.apache.org/zh/option.html#series-parallel), 还有用于 BI 的 [漏斗图](https://echarts.apache.org/zh/option.html#series-funnel), [仪表盘](https://echarts.apache.org/zh/option.html#series-gauge), 并且支持图与图之间的混搭.

只需在 `echarts` shortcode 中以 `JSON`/`YAML`/`TOML`格式插入 ECharts 选项即可.

{{< echarts >}}
{
  "title": {
    "text": "折线统计图",
    "top": "2%",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    "top": "10%"
  },
  "grid": {
    "left": "5%",
    "right": "5%",
    "bottom": "5%",
    "top": "20%",
    "containLabel": true
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {
        "title": "保存为图片"
      }
    }
  },
  "xAxis": {
    "type": "category",
    "boundaryGap": false,
    "data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "邮件营销",
      "type": "line",
      "stack": "总量",
      "data": [120, 132, 101, 134, 90, 230, 210]
    },
    {
      "name": "联盟广告",
      "type": "line",
      "stack": "总量",
      "data": [220, 182, 191, 234, 290, 330, 310]
    },
    {
      "name": "视频广告",
      "type": "line",
      "stack": "总量",
      "data": [150, 232, 201, 154, 190, 330, 410]
    },
    {
      "name": "直接访问",
      "type": "line",
      "stack": "总量",
      "data": [320, 332, 301, 334, 390, 330, 320]
    },
    {
      "name": "搜索引擎",
      "type": "line",
      "stack": "总量",
      "data": [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
{{< /echarts >}}

### 7.6 mapbox

[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js) 是一个 JavaScript 库，它使用 WebGL, 以 [vector tiles](https://docs.mapbox.com/help/glossary/vector-tiles/) 和 [Mapbox styles](https://docs.mapbox.com/mapbox-gl-js/style-spec/) 为来源, 将它们渲染成互动式地图.

* **lng** *[必需]* (**第一个**位置参数)  地图初始中心点的经度, 以度为单位.

* **lat** *[必需]* (**第二个**位置参数)  地图初始中心点的纬度, 以度为单位.

* **zoom** *[可选]* (**第三个**位置参数)  地图的初始缩放级别, 默认值是 `10`.

* **marked** *[可选]* (**第四个**位置参数)  是否在地图的初始中心点添加图钉, 默认值是 `true`.

* **light-style** *[可选]* (**第五个**位置参数)  浅色主题的地图样式, 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **dark-style** *[可选]* (**第六个**位置参数)  深色主题的地图样式, 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **navigation** *[可选]*  是否添加 [NavigationControl](https://docs.mapbox.com/mapbox-gl-js/api#navigationcontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **geolocate** *[可选]*  是否添加 [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api#geolocatecontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **scale** *[可选]*  是否添加 [ScaleControl](https://docs.mapbox.com/mapbox-gl-js/api#scalecontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **fullscreen** *[可选]*  是否添加 [FullscreenControl](https://docs.mapbox.com/mapbox-gl-js/api#fullscreencontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **width** *[可选]*  地图的宽度, 默认值是 `100%`.

* **height** *[可选]*  地图的高度, 默认值是 `20rem`.

```markdown
{{</* mapbox 121.485 31.233 12 */>}}
或者
{{</* mapbox lng=121.485 lat=31.233 zoom=12 */>}}
```

{{< mapbox 121.485 31.233 12 >}}

### 7.7 music

`music` shortcode 基于 [APlayer](https://github.com/MoePlayer/APlayer) 和 [MetingJS](https://github.com/metowolf/MetingJS) 提供了一个内嵌的响应式音乐播放器.

有三种方式使用 `music` shortcode.

#### 7.7.1 自定义音乐 URL {#custom-music-url}

支持[本地资源引用](../theme-documentation-content#contents-organization)的完整用法.

`music` shortcode 有以下命名参数来使用自定义音乐 URL:

* **server** *[必需]*  音乐的链接.

* **type** *[可选]*  音乐的名称.

* **artist** *[可选]*  音乐的创作者.

* **cover** *[可选]*  音乐的封面链接.

一个使用自定义音乐 URL 的 `music` 示例:

```markdown
{{</* music url="music/wind.mp3" name=起风了 artist=买辣椒也用券 cover="images/wind.png" */>}}
```

呈现的输出效果如下:
{{< music url="music/wind.mp3" name=起风了 artist=买辣椒也用券 cover="images/wind.png" >}}

#### 7.7.2 音乐平台 URL 的自动识别 {#automatic-identification}

`music` shortcode 有一个命名参数来使用音乐平台 URL 的自动识别:

* **auto** *[必需]]* (**第一个**位置参数)  用来自动识别的音乐平台 URL, 支持 `netease`, `tencent` 和 `xiami` 平台.

一个使用音乐平台 URL 的自动识别的 `music` 示例:

```markdown
{{</* music auto="https://music.163.com/#/playlist?id=60198" */>}}
或者
{{</* music "https://music.163.com/#/playlist?id=60198" */>}}
```

呈现的输出效果如下:

{{< music auto="https://music.163.com/#/playlist?id=60198" >}}

#### 7.7.3 自定义音乐平台, 类型和 ID {#custom-server}

`music` shortcode 有以下命名参数来使用自定义音乐平台:

* **server** *[必需]* [`netease`, `tencent`, `kugou`, `xiami`, `baidu`]音乐平台.

* **type** *[必需]* [`song`, `playlist`, `album`, `search`, `artist`]音乐类型.

* **id** *[必需]* 歌曲 ID, 或者播放列表 ID, 或者专辑 ID, 或者搜索关键词, 或者创作者 ID.

一个使用自定义音乐平台的 `music` 示例:

```markdown
{{</* music server="netease" type="song" id="1868553" */>}}
或者
{{</* music netease song 1868553 */>}}
```

呈现的输出效果如下:

{{< music netease song 1868553 >}}

#### 7.7.4 其它参数 {#other-parameters}

`music` shortcode 有一些可以应用于以上三种方式的其它命名参数:

* **theme** *[可选]*音乐播放器的主题色, 默认值是 `#448aff`.

* **fixed** *[可选]*是否开启固定模式, 默认值是 `false`.

* **mini** *[可选]*是否开启迷你模式, 默认值是 `false`.

* **autoplay** *[可选]*是否自动播放音乐, 默认值是 `false`.

* **volume** *[可选]*第一次打开播放器时的默认音量, 会被保存在浏览器缓存中, 默认值是 `0.7`.

* **mutex** *[可选]*是否自动暂停其它播放器, 默认值是 `true`.

`music` shortcode 还有一些只适用于音乐列表方式的其它命名参数:

* **loop** *[可选]*[`all`, `one`, `none`]音乐列表的循环模式, 默认值是 `none`.

* **order** *[可选]*[`list`, `random`]音乐列表的播放顺序, 默认值是 `list`.

* **list-folded** *[可选]*初次打开的时候音乐列表是否折叠, 默认值是 `false`.

* **list-max-height** *[可选]*音乐列表的最大高度, 默认值是 `340px`.
  
### 7.8 bilibili

```markdown
{{</* bilibili BV1Sx411T7QQ */>}}
或者
{{</* bilibili id=BV1Sx411T7QQ */>}}
```

{{< bilibili id=BV1Sx411T7QQ >}}

```markdown
{{</* bilibili BV1TJ411C7An 3 */>}}
或者
{{</* bilibili id=BV1TJ411C7An p=3 */>}}
```

呈现的输出效果如下:

{{< bilibili id=BV1TJ411C7An p=3 >}}

### 7.9 typeit

`typeit` shortcode 基于 [TypeIt](https://typeitjs.com/) 提供了打字动画.

```markdown
{{</* typeit */>}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{</* /typeit */>}}
```

{{< typeit >}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{< /typeit >}}

```markdown
{{</* typeit tag=h4 */>}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{</* /typeit */>}}
```

{{< typeit tag=h4 >}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{< /typeit >}}

```markdown
{{</* typeit code=java */>}}
public class HelloWorld {
    public static void main(String []args) {
        System.out.println("Hello World");
    }
}
{{</* /typeit */>}}
```

{{< typeit code=java >}}
public class HelloWorld {
    public static void main(String []args) {
        System.out.println("Hello World");
    }
}
{{< /typeit >}}

```markdown
{{</* typeit group=paragraph */>}}
**首先**, 这个段落开始
{{</* /typeit */>}}

{{</* typeit group=paragraph */>}}
**然后**, 这个段落开始
{{</* /typeit */>}}
```

{{< typeit group=paragraph >}}
**首先**, 这个段落开始
{{< /typeit >}}

{{< typeit group=paragraph >}}
**然后**, 这个段落开始
{{< /typeit >}}

### 7.10 script

```markdown
{{</* script */>}}
console.log('Hello LoveIt!');
{{</* /script */>}}
```

