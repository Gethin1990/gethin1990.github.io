# 云上软件架构


{{< admonition abstract >}}

- 什么是云原生？
  - 什么是12要素
- 云原生应该关注什么？
  - 微服务架构
  - 敏捷基础设施及公共基础服务
  - 分布式架构设计
- 云原生程度的评判标准是什么？
- 云服务现在如何，未来怎么走？
{{< /admonition >}}

## 什么是云原生

云原生的概念最早开始于 2010 年，在当时 [Paul Fremantle 的一篇博客中](http://pzf.fremantle.org/2010/05/cloud-native.html?spm=a2c6h.12873639.0.0.4e86dad8mWw28g)被提及，他一直想用一个词表达一种架构，这种架构能描述应用程序和中间件在云环境中的良好运行状态。因此他抽象出了 Cloud Native 必须包含的属性，只有满足了这些属性才能保证良好的运行状态。当时提出云原生是为了能构建一种符合云计算特性的标准来指导云计算应用的编写。

后来到 2013 年 [Matt Stine 在推特上迅速推广云原生概念](https://dzone.com/articles/cloud-native-devops-your-world-to-new-possibilitie?spm=a2c6h.12873639.0.0.4e86dad8mWw28g)，并在 [2015 年《迁移到云原生架构》](https://www.oreilly.com/library/view/migrating-to-cloud-native/9781492047605/?spm=a2c6h.12873639.0.0.4e86dad8mWw28g)一书中定义了符合云原生架构的特征：12 因素、微服务、自服务、基于 API 协作、扛脆弱性。而由于这本书的推广畅销，这也成了很多人对云原生的早期印象，同时云原生也被 12 要素变成了一个抽象的概念。Matt Stine 认为在单体架构向 Cloud Native 迁移的过程中，需要文化、组织、技术共同变革。

### 12要素

2012 年，Heroku 创始人 Adam Wiggins 发布十二要素应用宣言。它为构建一个优雅的互联网应用，定义了需要遵循的一些基本原则和方法论，也广泛影响了众多的微服务应用架构。十二要素重点关注：应用程序的健康成长，开发者之间的有效的协作，以及避免软件架构腐化的影响。

- 基准代码：一份基准代码，多份部署，使用 GIT 或者 SVN 管理代码，并且有明确的版本信息。
- 依赖：显示声明依赖。
- 配置：环境中存储配置。
- 后端服务：把后端服务当作附加资源。后端服务是指程序运行所需要的通过网络调用的各种服务，如数据库（MySQL、CouchDB）、消息/队列系统（RabbitMQ、Beanstalkd）、SMTP 邮件发送服务（Postfix），以及缓存系统（Memcached）。
- 构建、发布、运行：严格分离构建和运行。
- 进程：以一个或多个无状态进程运行应用，如果存在状态，应该将状态外置到后端服务中，例如数据库、缓存等。
- 端口绑定：通过端口绑定提供服务，应用通过端口绑定来提供服务，并监听发送至该端口的请求。
- 并发：通过进程模型进行扩展，扩展方式有进程和线程两种。进程的方式使扩展性更好，架构更简单，隔离性更好。线程扩展使编程更复杂，但是更节省资源。
- 易处理：快速启动和优雅终止可最大化健壮性，只有满足快速启动和优雅终止，才能使服务更健壮。
- 开发环境与线上环境等价：尽可能保持开发、预发布、线上环境相同。
- 日志：把日志当作事件流，微服务架构中服务数量的爆发需要具备调用链分析能力，快速定位故障。
- 管理进程：把后台管理任务当作一次性进程运行，一些工具类在生产环境上的操作可能是一次性的，因此最好把它们放在生产环境中执行，而不是本地。

12 要素应用为我们提供了很好的架构指导，帮助我们：

- 构建水平伸缩的弹性应用架构，更好支撑互联网规模应用。
- 提升研发流程的标准化、自动化水平，提升研发效率。
- 减少开发环境和生产环境的差异，并使用持续交付实施敏捷开发。
- 提升应用的可移植性，适合云化部署，降低资源成本和管理复杂性。

![十二要素](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20211022142121-2021-10-22-14-21-22.png)

## 云原生应该关注什么

### 微服务架构

Martin Fowler 与 James Lewis 共同提出了微服务的概念，定义了微服务架构是以开发一组小型服务的方式来开发一个独立的应用系统，每个服务都以一个独立进程的方式运行，每个服务与其他服务使用轻量级（通常是 HTTP API）通信机制。这些服务是围绕业务功能构建的，可以通过全自动部署机制独立部署，同时服务会使用最小规模的集中管理（例如 Docker）能力，也可以采用不同的编程语言和数据库。

![单体架构与微服务](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20211022152028-2021-10-22-15-20-29.png)

[Multi-Runtime（多运行时）软件架构](https://www.infoq.com/articles/multi-runtime-microservice-architecture/)中提出将把现代分布式应用的需求分为四种类型（生命周期，网络，状态，绑定）

- Lifecycle(生命周期) [主要是弹性伸缩和异常快速恢复的诉求]：
  - Packaging(打包)
  - HealthCheck(健康检查)
  - Deployment(部署)
  - Scaling(缩放)
  - Configuration(配置)
- Networking(网络) [可靠的网络、可靠的路由的需求]
  - Service discovery（服务发现）
  - A/B testing（AB测试）, canary rollouts（金丝雀发布）
  - Retry（重试）,timeout（超时）,circuit breaker（断路器）
  - Point-to-point（点对点）,pub/sub（订阅/发布）
  - security（安全）,observability（可观测的）
- State(状态) [可靠的网络、可靠的路由的需求]
  - Workflow management（工作流管理）
  - Idempotency（幂等）
  - Temporal scheduling（临时调度（cron作业））
  - Caching（缓存）
  - Application state（程序状态）
- Binding(绑定) [与外部系统、中间件的通讯的需求]
  - Connectors（连接器）
  - Protocol conversion（协议转换）
  - Message transformation（消息转换）
  - Message routing（消息路由）
  - Transactionality（事务性）

![四大类需求](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20211022104322-2021-10-22-10-43-23.png)

其中有一些需求可以使用基础架构来实现，有一些则需要软件架构级别来实现，那么哪些部分在现阶段的云原生架构中可以实现？

### 敏捷基础设施及公共基础服务

- 敏捷基础设施的目标
  - 标准化：所有的基础设施最好都是标准的。
  - 可替换：任意节点都能够被轻易地创建、销毁、替换。
  - 自动化：所有的操作都通过工具自动化完成，无须人工干预。
  - 可视化：当前环境要做到可控，就需要对当前的环境状况可视。
  - 可追溯：所有的配置统一作为代码进行版本化管理，所有的操作都可以追溯。
  - 快速：资源申请及释放要求秒级完成，以适应弹性伸缩和故障切换的要求。

- 基于公共基础服务的平台化
  - 平台化是指利用公共基础服务提升整体架构能力。
  - 公共基础服务是指与业务无关的、通用的服务，包括监控服务、缓存服务、消息服务、数据库服务、负载均衡、分布式协调、分布式任务调度等。

- 常见的平台服务
  - 监控告警服务
  - 分布式消息中间件服务
  - 分布式缓存服务
  - 分布式任务调度服务

在我的博客[云上基础架构](https://blog.gethin.online/introduce-microservice-infrastructure-on-cloud/)提到，基础架构关注点如下：

- 服务注册
- 服务发现
- 监控
- 限流
- 路由
- 负载均衡
- 超时重试
- 熔断
- 服务降级
- 故障迁移

博客里同样也提到了，基础架构目前市面上主流3.0架构方案是以Istio为代表的Service Mesh方案。

Istio 具有的强大特性提供了一种统一的、更有效的方式来保护、连接和监视服务。Istio 只需要进行简单的配置就可实现服务的负载均衡、服务到服务的身份验证等分布式功能。Isito的控制平面非常强大，它可以对Istio进行配置和管理，包括：

- 使用 TLS 加密、强身份认证和授权的集群内服务到服务的安全通信
- 自动负载均衡的 HTTP、gRPC、WebSocket和 TCP 流量
- 通过丰富的路由规则、重试、故障转移和故障注入对流量行为进行细粒度控制
- 一个可插入的策略层和配置 API，支持访问控制、速率限制和配额
- 对集群内的所有流量(包括集群入口和出口)进行自动度量、日志和跟踪

istio 完整功能如下，看来istio已经基本满足上述所有的基础架构关注点

- 流量管理
  - 请求路由 - A/B测试、金丝雀发布等，包括对集群出入口、及集群内部的流量的控制。比如某应用新版本发布，可以配置为5%的流量流向新版本，95%的给旧版本
  - 流量转移 - 与上一条请求路由类似，可以平滑的将流量从旧版本转移到新版本上
  - 负载均衡 - 目前支持3种方式，轮询、随机和带权重的最少请求
  - 服务发现 - 带心跳的健康检查，失败率超标的Pod移出负载均衡池
  - 故障处理 - 超时、重发、熔断、上游并发请求或下游连接数限制等
  - 微调 - 支持用特殊的请求头参数，覆盖默认的超时、重发值
  - 故障注入 - 由Enovy在正常的集群中人为注入故障，比如TCP包损坏或延迟、HTTP错误码等，支持按百分比注入，比如给10%的流向服务A的请求包增加5秒延迟
  - 多重匹配 - 上述规则的配置，支持按多种条件匹配，且支持and或or的方式匹配多条规则
  - Gateway - 接管集群入口的流量，替代了Ingress，从而对入口流量执行其他规则
  - Service Entry - 接管集群内部访问外部服务的流量，从而对出口流量执行一些规则
  - 镜像 - 支持将特定的流量镜像到服务路径之外，而不影响主服务路径的正常执行
- 安全
  - 命名空间访问控制 - 支持配置某命名空间的所有或个别服务可以被其他命名空间访问
  - 服务级别访问控制 - 允许或禁止访问某个服务
  - 双向TLS - HTTPS加密传输
  - 其他安全策略
- 策略
  - 速率限制 - 比如限制每秒的请求次数
  - 黑白名单 - 支持基于IP或属性的黑名单、白名单
- 遥测
  - 日志收集 - 支持将Prometheus、Jaeger等系统插入Mixer，从而完成数据的采集
  - 指标采集
  - 分布式追踪

### 分布式架构设计

#### 可用性设计

- 什么降低了可用性
  - 发布
  - 故障
  - 压力
  - 外部依赖
- 设计阶段考虑如下几个比较重要的方法
  - 20/10/5，设计系统的时候，以实际流量的 20 倍来设计；开发系统的时候，以实际流量的 10 倍来开发系统；发布系统的时候，以实际流量的 5 倍来部署。这只是一个通用的原则，可以根据实际情况来确定，不需要严格按照倍数来执行。
  - Design for failure，预测可能发生的问题，做好预案。
- 容错设计
  - 消除单点
  - 特性开关
  - 服务分级
  - 降级设计
  - 超时重试
- 隔离策略
  - 线程池隔离
  - 进程隔离
  - 集群隔离
  - 用户隔离
  - 租户隔离
  - 逻辑隔离
  - 物理隔离
  - 混合隔离
- 熔断器
  - 熔断器模式（Circuit Breaker Patten）的原理类似于家里的电路熔断器的原理。当发生短路或者超负荷时，熔断器能够主动熔断电路，以避免灾难发生。
- 流控设计
  - 限流算法。限流也就是调节数据流的平均速率，通过限制速率保护自己，常见的算法有：
    - 固定窗口算法（fixed window）。
    - 漏桶算法（Leaky Bucket）：漏桶算法主要目的是控制数据注入网络的速率，平滑网络上的突发流量。
    - 令牌桶算法（token bucket）：令牌桶控制的是一个时间窗口内通过的数据量，通常我们会以 QPS、TPS 来衡量。
  - 流控策略
    - 请求入口处。
    - 业务服务入口处。
    - 公共基础服务处。
    - 基于 Guava 限流：Guava 是 Google 提供的 Java 扩展类库，其中的限流工具类 RateLimiter 采用的就是令牌桶算法，使用起来非常简单。
    - 基于 Nginx 限流。
- 容量预估
  - 互联网公司普遍采用全链路压测的方式，来进一步预估容量。
- 故障演练
  - 随机关闭生产环境中的实例。
  - 让某台机器的请求或返回变慢，观察系统的表现，可以用来测试上游服务是否有服务降级能力，当然如果响应时间特别长，也就相当于服务不可用。
  - 模拟 AZ 故障，中断一个机房，验证是否跨可用区部署，业务容灾和恢复的能力。
  - 查找不符合最佳实践的实例，并将其关闭
- 数据迁移
  - 逻辑分离，物理不分离。
  - 物理分离。

#### 可扩展设计

- 水平扩展，指用更多的节点支撑更大量的请求。
- 横向扩展通常是为了提升吞吐量，响应时间一般要求不受吞吐量影响即可。

![AKF 扩展立方体](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20211022105636-2021-10-22-10-56-37.png)

- 如何扩展数据库
  - X 轴扩展——主从复制集群
  - Y 轴扩展——分库、垂直分表
  - Z 轴扩展——分片（sharding）

#### 性能设计

- 性能指标
  - 响应时间（Latency），就是发送请求和返回结果的耗时。
  - 吞吐量（Throughput），就是单位时间内的响应次数。
  - 负载敏感度，是指响应时间随时间变化的程度。例如，当用户增加时，系统响应时间的衰减速度。
  - 可伸缩性，是指向系统增加资源对性能的影响。例如，要使吞吐量增加一倍，需要增加多少服务器。
- 如何树立目标
  - 响应时间、 吞吐量、系统数据量、数据增长速度、资源限制
  - 通过缓存提升读性能。
  - 通过消息中间件提升写性能。

#### 一致性设计

- 事务的四大特征
  - 原子性（Atomicity）。
  - 一致性（Consistency）是指通过事务保证数据从一种状态变化到另一种状态。
  - 隔离性（Isolation）是指事务内的操作不受其他操作影响，当多个事务同时处理同一个数据的时候，多个事务之间是互不影响的。
  - 持久性（Durability）是指事务被提交后，应该持久化，永久保存下来。
- CAP定理
  - 一致性（Consistence）
  - 可用性（Availability）
  - 分区容错性（Partition tolerance）
- BASE 理论
  - BA:Basically Available，基本可用。
  - S:Soft state，软状态。
  - E:Eventually consistent，最终一致。
- Quorum 机制（NWR 模型）
- 如果多个服务分别向三个节点写数据，为了保证强一致，就必须要求三个节点全部写成功才返回；同步写三个节点的性能较低，如果换一个思路，一致性并不一定要在写数据的时候完成，可以在读的阶段再决策，只要每次能读到最新版本即可。Quorum 机制就是要满足公式 W+R>N，式中 N 代表备份个数，W 代表要写入至少 W 份才认为成功，R 表示至少读取 R 个备份。
- 租约机制（Lease）
如果现在我们有三个节点，为了实现一致性，要确保有且只有一个是 Leader，另外两个为 Follower，只有 Leader 是可写的，Follower 只能读。管理节点 M 通过心跳判断各个节点的状态，用 M 去指定 Leader，一旦 Leader 死掉，就可以重新指定一个 Leader。
- 脑裂问题
  - 一种是采用投票机制（Paxos 算法）。
  - 一种是采用租约机制——Lease，租约机制的核心就是在一定时间内将权力下放。
- 分布式系统的一致性分类
  - 建立多个副本。可以把副本放到不同的物理机、机架、机房、地域，当一个副本失效时，可以让请求转到其他副本。
  - 对数据进行分区。复制多个副本解决了读的性能问题，但是无法解决写的性能问题。
- 以数据为中心的一致性模型
  - 严格一致性（Strict Consistency）
  - 顺序一致性（Sequential Consistency）
  - 因果一致性（Causal Consistency）
- 以用户为中心的一致性模型
  - 单调读一致性（Monotonic-read Consistency）
  - 单调写一致性（Monotonic-write Consistency）
  - 写后读一致性（Read-your-writes Consistency）
  - 读后写一致性（Writes-follow-reads Consistency）
- 业界常用的一致性模型
  - 弱一致性：写入一个数据 a 成功后，在数据副本上可能读出来，也可能读不出来。不能保证每个副本的数据一定是一致的。
  - 最终一致性（Eventual Consistency）：写入一个数据 a 成功后，在其他副本有可能读不到 a 的最新值，但在某个时间窗口之后保证最终能读到。
  - 强一致性（Strong Consistency）：数据 a 一旦写入成功，在任意副本任意时刻都能读到 a 的最新值。
- 如何实现强一致性
  - 两阶段提交
  - 三阶段提交（3PC）
- 如何实现最终一致性
  - 重试机制：超时时间，重试的次数，重试的间隔时间，重试间隔时间的衰减度。
  - 本地记录日志。
  - 可靠事件模式。
  - Saga 事务模型：又叫 Long-running-transaction，核心思想是把一个长事务拆分为多个本地事务来实现，由一个 Process manager 统一协调。
  - TCC 事务模型：两阶段提交是依赖于数据库提供的事务机制，再配合外部的资源协调器来实现分布式事务。TCC（Try Confirm Cancel）事务模型的思想和两阶段提交虽然类似，但是却把相关的操作从数据库提到业务中，以此降低数据库的压力，并且不需要加锁，性能也得到了提升。

## 云原生程度的评判标准是什么

![云原生架构成熟度模型](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20211022163616-2021-10-22-16-36-17.png)

## 云服务现在如何，未来怎么走

Dapr：下一代Service Mesh的发展方向

Dapr（Distributed Application Runtime，分布式运行时），是微软内部团队的一个开源项目。Dapr同样使用Sidecar架构，以独立进程的形式与应用程序同时运行，同时兼具Service Mesh中Sidecar/proxy的优点和高度可扩展的特性。

虽然Dapr 和Service Mesh在架构上都是使用的Sidecar模式，并且在功能上也存在一些重叠部分，但是不能将 Dapr 简单的定义为Service Mesh。

![Dapr 和Service Mesh 不同](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20211022161858-2021-10-22-16-18-59.png)

而在Dapr中，实现的能力主要有：

- 状态管理 （支持长时间运行有状态服务的上下文信息。）
- 服务调用 （使用平台不可知的协议和众所周知的终结点调用直接、安全的服务到服务调用。）
- 订阅发布（在服务之间实现安全的可缩放发布/订阅消息传送。）
- 绑定 （通过与双向通信的外部资源引发的事件触发代码。）
- 可观察性 （监视和度量跨网络服务的消息调用。）
- 机密 （安全访问外部密钥存储。）
- 执行组件 （在可重用的执行组件对象中封装逻辑和数据。）

Service Mesh主要以基础设施为中心：

- Service Mesh更加聚焦于网络问题的处理，通过拦截网络流量，可以使应用程序无感知的部署在包含Service Mesh的环境中。
- 并且Service Mesh主要由系统操作员进行管理和部署，使Service Mesh更像是一种特殊的“基础设施”。开发人员无需考虑一些其他的细节，因为Service Mesh已经将网络概念扁平化。
- Service Mesh通过按照原协议转发的方式来进行流量拦截，可以给业务系统带来零侵入的体验。

而Dapr是以开发人员为中心：

- 当开发人员在代码中需要使某种分布式能力时，开发人员需要明确调用Dapr API。Dapr为开发者提供了标准的分布式API，这种API带来了多语言的、面向能力的、统一的编程体验。
- Dapr提供了应用级别的构建块（Building Block）和70多种分布式能力的抽象集成，使得开发人员更容易将应用程序构建为弹性的微服务。
- Dapr通过采用多语言SDK+标准API+各种分布式能力的方式为应用程序提供服务。

{{< admonition info "参考文献">}}

- [快速了解云原生架构](https://developer.aliyun.com/article/781563)
- [我对云原生软件架构的观察与思考](https://mp.weixin.qq.com/s/PwPC1ZWNZvzQoOZvOAF2Qw)
- [Dapr：我不是Service Mesh！我只是长得很像](https://mp.weixin.qq.com/s/rNNUURpSjoaw401FYhrdjg)
{{< /admonition >}}
