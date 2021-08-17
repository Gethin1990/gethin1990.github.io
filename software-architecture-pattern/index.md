# 软件架构模式


## 应用架构风格

### 单体架构

- 好处
  - 容易理解、开发、测试
  - 容易部署
  - 合适小范围项目
- 不足
  - 紧密耦合
  - 容易产生复杂代码
  - 所有子域都一刀切

### N-tier

- Summary
  - 多层次
  - 层适合特殊的任务
  - 层可以在物理上分离
  - 技术层并不是逻辑上的层
  - 技术边界分层  
- Typical: 3层架构
  - 显示层(UI & 单纯的UI逻辑)
  - 逻辑层(业务逻辑)
  - 数据层
- Advantages
  - 开发独立
  - 易扩展
- Disadvantages
  - 改动会影响各个层级

### Service-Oriented

- Summary
  - 多服务
  - 每个服务都是一个业务活动
  - 服务可以组合
  - 协议统一标准
  - 企业服务总线
- Advantages
  - 服务是松散耦合的
  - 可扩展性好
  - 没有功能重复
- Disadvantages
  - 降低敏捷性和团队自主性
  - 费用比较高
  - 会有许多不同的观点
  
### Microservices

- Summary
  - 多服务
  - 每个服务都是一个业务活动
  - 以团队形式提供服务
  - 没有重逻辑的企业总线
  - 自动化最大化
- Advantages
  - 服务是松散耦合的，易于扩展  
  - 灵活性高
  - 可靠性高
  - 设计了故障处理机制
- Disadvantages
  - 边界并不总是清晰的
  - 交互可能会变得很复杂

### Serverless

- Summary
  - Backend as a service
  - Function as a service

### peer-to-peer

- Summary
  - 去中心化
  - 没有固定的连接
  - 动态发现的
- Advantages
  - 分享资源
  - 节约成本
  - 可缩放
- Disadvantages
  - 可能存在安全问题
  - 只适用于特殊场景
  - 代码比较重
  
## 应用程序架构模式

### 分层

- Summary
  - 显示层(UI)
  - 应用层(Translation between UI & busniess)
  - 业务层(Business logic)
  - 持久层(Code to interact with the database)
  - 数据层(Data)
- Advantages
  - 开发之间容易理解
  - 容易组织代码
- Disadvantages
  - 可能导致单体应用
  - 需要撰写大量代码

### Microkernel

- Summary
  - 执行任务
  - 工作流
  - 数据处理
  - 浏览界面
  - 图形设计
- Advantages
  - 灵活
  - 边界清晰
  - 容易分组
  - 运行过程中容易添加和删除功能
- Disadvantages
  - 核心 API 不一定适应未来的插件
  - 插件可以被信任吗
  - 并不总是清楚什么是属于核心代码

### CQRS

- Summary
  - 命令查询责任分离
  - 2 模式: 读/查询 & 写/命令
  - 允许特定场景查询
  - 有同步要求
  - 与事件源模式不同
- Advantages
  - 容易查询
  - 更快、更可扩展的读取查询
  - 更容易对接
- Disadvantages
  - 添加数据比较复杂
  - 有学习曲线
  - 可能数据不一致
  - 最终一致性

### Event sourcing

- Summary
  - 存储事件而不是当前状态
  - Event = 发生在过去的事情
  - Rehydration or replay
- Advantages
  - 跟踪事件
  - 数据轨迹
  - 业务语言
  - 事件重演
- Disadvantages
  - 重演事件 和 外部系统
  - 事件结构的变化
  - 快照

### CQRS and Event sourcing combined

- Summary
  - 2个不同的概念
  - 强强联合
  - 它不适用于简单的域，您可以从事件溯源开始，然后再添加 CQRS。
- Advantages
  - 简单快速查询
  - 可扩展的
  - 事件跟踪
  - 数据轨迹
  - 商业语言
- Disadvantages
  - 增加复杂度
  - 学习曲线
  - 数据不一致
  - 事件结构变化

## UI Patterns

### MVC

- Summary
  - Controller
  - Model
  - View
- Advantages
  - 关注点分离
  - 并行开发
  - 流行的框架
- Disadvantages
  - 控制器可能会变得臃肿
  - 不同的定义

### MVP

- Summary
  - View
  - Presenter  
  - Model
- Advantages
  - 对桌面开发友好
  - 关注点分离
  - 测试性好
- Disadvantages
  - Presenter层变得臃肿
  - 桌面开发不流行
  - MVVM Pattern

### MVVM

- Summary
  - View
  - ViewModel
  - Model
- Advantages
  - 现代桌面和移动开发友好
  - 关注点分离
  - 测试性好
- Disadvantages
  - UI过度
  - 难以调试
  - 桌面开发不流行

