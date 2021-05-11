# 测试文章


了解如何在 **LoveIt** 主题中快速, 直观地创建和组织内容。
<!--more-->
此文章用于测试。
{{< admonition note "以下内容仅用于测试主题功能" >}}
{{< version 0.0.1 >}}

### LoveIt 的文章列表参考如下

[hugoloveit](https://hugoloveit.com/zh-cn/posts/)

<https://hugoloveit.com/zh-cn/posts/>

{{< /admonition >}}

## 1. 内容组织

1. 保持博客文章存放在 content/posts 目录, 例如: content/posts/我的第一篇文章.md
2. 保持简单的静态页面存放在 content 目录, 例如: content/about.md
3. 本地资源组织
   1. 使用[页面包](https://gohugo.io/content-management/page-bundles/)中的[页面资源](https://gohugo.io/content-management/page-resources/).
   你可以使用适用于 `Resources.GetMatch` 的值或者直接使用相对于当前页面目录的文件路径来引用页面资源.
   2. 将本地资源放在 assets 目录中, 默认路径是 /assets. 引用资源的文件路径是相对于 assets 目录的.
   3. 将本地资源放在 static 目录中, 默认路径是 /static. 引用资源的文件路径是相对于 static 目录的

## 2. 前置参数

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

## 3. 内容摘要

![文章摘要预览](images/summary.zh-cn.png "文章摘要预览")

### 自动摘要拆分

网站设置 `summaryLength`

### 手动摘要拆分

添加 `<!--more-->`

### 前置参数摘要

前置参数 `summary`

### 使用文章描述作为摘要

前置参数 `description`

## 4. Markdown 基本语法

ignore

## 5. Markdown 扩展语法

### Emoji 支持

<https://hugoloveit.com/zh-cn/emoji-support/>

:grinning:,:smile:,:laughing:,:rofl:,:sweat_smile:,:joy:

### 数学公式

``` markdown
$$ c = \pm\sqrt{a^2 + b^2} $$
```

$$ c = \pm\sqrt{a^2 + b^2} $$

### 行内公式

默认的行内公式分割符是 `$/$` 和 `\\(/\\)`

``` markdown
$ c = \pm\sqrt{a^2 + b^2} $ 和 \\( f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \\)
```

$ c = \pm\sqrt{a^2 + b^2} $ 和 \\( f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \\)

### mhchem

``` markdown
$$ \ce{CO2 + C -> 2 CO} $$

$$ \ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} $$
```

$$ \ce{CO2 + C -> 2 CO} $$

$$ \ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} $$

### 字符注音或者注释

``` markdown
[Hugo]{?^}(一个开源的静态网站生成工具)
```

[Hugo]^(一个开源的静态网站生成工具)

### 分数

``` markdown
[99]{?/}[100]
```

[99]/[100]

### Font Awesome

``` markdown
真开心! {?:}(far fa-grin-tears):
```

真开心! :(far fa-grin-tears):

### 转义字符

``` markdown
{{??}:}joy:
```

{?:}joy:

## 6. 内置 Shortcodes

<https://hugoloveit.com/zh-cn/theme-documentation-built-in-shortcodes/>

### figure

```markdown
{{</* figure src="/images/lighthouse.jpg" title="Lighthouse (figure)" */>}}
```

### gist

```markdown
{{</* gist spf13 7896402 */>}}
```

### highlight

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

### instagram

[`instagram` 的文档](https://gohugo.io/content-management/shortcodes#instagram)

```markdown
{{</* instagram BWNjjyYFxVx hidecaption */>}}
```

### param

[`param` 的文档](https://gohugo.io/content-management/shortcodes#param)

```markdown
{{</* param description */>}}
```

### ref 和 relref

[`ref` 和 `relref` 的文档](https://gohugo.io/content-management/shortcodes#ref-and-relref)

### tweet

[`tweet` 的文档](https://gohugo.io/content-management/shortcodes#tweet)

```markdown
{{</* tweet 877500564405444608 */>}}
```

### vimeo

[`vimeo` 的文档](https://gohugo.io/content-management/shortcodes#vimeo)

```markdown
{{</* vimeo 146022717 */>}}
```

### youtube

[`youtube` 的文档](https://gohugo.io/content-management/shortcodes#youtube)

```markdown
{{</* youtube w7Ft2ymGmfc */>}}
```

## 7. 扩展shortcodes

### style

```markdown
{{</* style "text-align:right; strong{color:#00b1ff;}" */>}}
This is a **right-aligned** paragraph.
{{</* /style */>}}
```

{{< style "text-align:right; strong{color:#00b1ff;}" >}}
This is a **right-aligned** paragraph.
{{< /style >}}

### link

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

### image

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
{{</* image src="/images/test.jpg" caption="Lighthouse (`image`)" src_s="/images/test-small.jpg" src_l="/images/test-large.jpg" */>}}
```

{{< image src="/images/test.jpg" caption="TEST (`image`)" src_s="/images/test.jpg" src_l="/images/test.jpg" >}}

### admonition

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

### mermaid

[mermaid](https://mermaidjs.github.io/) 是一个可以帮助你在文章中生成图表和流程图的库, 类似 Markdown 的语法.

#### 流程图

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

#### 时序图

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

#### 甘特图

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

#### 类图

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

#### 状态图

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

#### Git 图

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

#### 饼图

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

