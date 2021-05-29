# Gatsby基础知识（上）


> 这篇文章主要是翻译和记录了一些 Gateby 的基础知识，有助于开发者通过这些基础知识进行快速的开发  
> Refer to the Article:
> [https://mpolinowski.github.io/gatsby-js-knowledgebase](https://mpolinowski.github.io/gatsby-js-knowledgebase)

## 00 准备操作

The default Gatsby starter

[Github](https://github.com/mpolinowski/gatsby-wiki)

有关项目结构的概述，请参阅[Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/)

从您的 CLI 运行此安装程序（假设已安装 Gatsby）：

```js
    gatsby new gatsby-wiki
```

## 01 开始你的 Gatsby 开发环境(Start your Gatsby development environment)

现在请转到你的站点目录中，并使用 npm 运行你的 Gatsby 开发环境如下：

```js
    cd gatsby-wiki
    npm run development
```

看，你可以访问你的网站了[http://localhost:8000](http://localhost:8000/)

![gatsby_01](https://raw.githubusercontent.com/mpolinowski/gatsby-wiki/master/gatsby_01.png)

## 02 添加内容和链接页面(Adding content and Linking Pages)

/src/pages/index.js 文件包含常规的 JSX-在`<div />`标记内添加任何 HTML，可以让它显示在您的网站内。（Gatsby 使用的热加载）

```js
import React from "react"
import Link from "gatsby-link"
const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)
export default IndexPage
```

你可以通过`import Link from gatsby-link`使用 Link 组件并链接到其他页面

```js
<Link to="/page-2/">Go to page 2</Link>
```

链接我们的 index.js 页面到同目录的 page-2 页面。/src /pages 文件夹中的每个 js 文件都会自动被 Gatsby 路由！

![gatsby_02](https://raw.githubusercontent.com/mpolinowski/gatsby-wiki/master/gatsby_02.png)

## 03 样式化 JSX(Styling your JSX)

你可以在组件中使用内联样式如：

```js
const IndexPage = () => (
  <div style={{ color: "tomato", background: "blue"}}>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)
```

一些高级样式，请查看 Gatsby 插件
[Glamor](https://www.gatsbyjs.org/packages/gatsby-plugin-glamor/) 或者 [Styled Components](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/).
如何安装这些插件请查看[Gatsby Plugins](https://mpolinowski.github.io/gatsby-js-knowledgebase#07-gatsby-plugins)。

## 04 添加交互式插件(Adding Interactive Components)

React 允许你向页面中添加交互 - 我们想添加一个计数器，在加载时将其状态设置为 0，并且有两个使用 onClick 事件增加或减少计数器状态的按钮。

我们可以添加一个新文件`/src/pages/counter.js`并链接到`index`页面`<Link to="/counter/">Go to Counter</Link>`。

```js
import React from "react"
class Counter extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
  }
  render() {
    return (
      <div>
            <h1>Counter</h1>
            <p>current count: {this.state.count}</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          plus
        plus</button>
            <button onClick={() => this.setState({ count: this.state.count - 1 })}>
          minus
        minus</button>
          </div>
    )
  }
}
export default Counter
```

![gatsby_03](https://raw.githubusercontent.com/mpolinowski/gatsby-wiki/master/gatsby_03.png)

## 05 向你的站点导入组件(Importing Components to your Sites)

目前为止，我们将 pages 目录中的每个文件都用作单独的站点。但是 React.js 允许我们采用默认组件-在文件底部导出的默认组件-并将其导入另一个页面。
 例如，我们可以将上面的`<Counter />`组件添加到索引页面中（而不是仅链接到它）。
我们只需要在`/src/pages/index.js`开头添加`import`一行:

```js
import React from "react"
import Link from "gatsby-link"
import Counter from "./counter"
```

并在 index.js 的 的JSX 代码内引用 Counter，如下所示：

```js
const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to Page 2</Link>
    <br />
    <br />
    <Counter />
  </div>
)
```

![gatsby_04](https://raw.githubusercontent.com/mpolinowski/gatsby-wiki/master/gatsby_04.png)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY2NTMxOTc3OF19
-->

