# 云上基础架构


{{% mindmap summary mindmap-md %}}

- 云上基础架构
  - Iaas & Paas & Saas
  - 虚拟机和容器
  - Docker & Kubernetes
  - 基础架构的关注点
  - Azure Kubernets Service - AKS

{{% /mindmap %}}

## Iaas & Paas & Saas

- IaaS 基础架构即服务， 硬件相关的部分由第三方运营，如服务器，存储，网卡等。其他由拥有者来维护。
- PaaS 平台即服务，部分与应用无关的部分由第三方运营，自己的应用程序是基于第三方提供的平台来进行开发维护，但数据和应用程序由拥有者本人来进行管理。
- SaaS 软件即服务，将所有的部分都交给第三方管理，拥有者本身只需要基于应用程序进行配置或是二次开发。

   [啥是 azure-paas](https://www.sherweb.com/blog/cloud-server/what-is-azure-paas/)

   ![source by Microsoft](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/Iass_Pass_Saas.png)

   ![source by Microsoft](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/Iass_Pass_Saas2.png)

## 虚拟机和容器

虚拟机，用传统开发和部署的方式来运行在服务器上，如IIS，Tomcat等 为什么要选用容器，容器有什么优势么？

- 平台独立，一次build，可以运行在各个平台。
- 资源的效率和利用率比较高
- 有效的隔离性和可分享性
- 速度很快，可以在短时间内进行创建，复制和销毁
- 可以实现平滑的伸缩
- 操作便捷
- 改进开发人员的生产力和开发流程
- 语言独立性

## Docker & Kubernetes

Docker是时下流行的来实现容器的一种方式。关于容器编排，市场上还有其他的方式，如Azure Service Fabric，Amazon Elastic Container Service  

那么我们为什么要选用K8S?

- 容器编排
- 非常适合采用多云方式进行
- 大规模部署和更新应用程序，以加快产品上市时间（水平自动缩放，滚动更新，Canary部署）
- 天然支持云原生应用
- 降低基础设施成本
- 它可以在本地或混合环境中运行
- 您可以将Kubernetes集群从一个托管供应商移动到另一个托管供应商，而无需更改（几乎）任何部署和管理过程。
- 零停机时间部署，容错，高可用性，扩展，调度和自愈功能在Kubernetes中具有重要价值。

## 基础架构的关注点

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

## Azure Kubernets Service -AKS

### 1. 第一步

AKS云原生基本概念 - Key Words

- Pod: K8S 基本单位，一个Pod相当于一个容器
- Node： 一个节点相当于一台服务器
- Replication Controller： 弹性伸缩管理器
- Service 服务，作为K8S内部调用的一个服务，使用标签选择符标识的一组Pod
- Namespace，命名空间，逻辑隔离级别
- Ingress，应用程序入口，通常用来将内部service公开给外部使用的路由。
- Deployment，一个 Deployment 控制器为 Pods和ReplicaSets提供声明式的更新能力。
- StatefulSet 用来管理 Deployment 和扩展一组 Pod，并且能为这些 Pod 提供_序号和唯一性保证_。
- DaemonSet 确保全部（或者某些）节点上运行一个 Pod 的副本。 当有节点加入集群时， 也会为他们新增一个 Pod 。 当有节点从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除它创建的所有 Pod。
- Job 会创建一个或者多个 Pods，并确保指定数量的 Pods 成功终止

### 2. 使用三方组件来改进系统

1. Helm,
2. Traefik,  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/Traefik_Introduction.png)
3. Kubeapps,  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/kubeapps_application.png)
4. Prometheus,
5. Grafana,  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/grafana_K8SCluster.png)

![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/grafana_K8SContainer.png)

### 3. 使用服务网格 (Istio) 来进行微服务管理

1. Gateway & Virtual Service
2. Cert
3. Kiali & Grafana  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/kiali_graph_voting.png)

4. 使用 CI/CD 来部署你的系统.  
    1. Azure DevOps  
    2. Scaling  
    3. 智能路由与金丝雀发布  
      <https://docs.microsoft.com/en-us/azure/aks/servicemesh-istio-scenario-routing?pivots=client-operating-system-linux>

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzg1NDY2NDUzXX0=
-->

