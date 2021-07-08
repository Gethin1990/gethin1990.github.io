# Introduce Microservice & Infrastructure on Cloud


> This article will introduce Microservice & Infrastructure on Cloud.
{{% mindmap summary mindmap-md %}}

- Infrastructure on Cloud
  - Iaas & Paas & Saas
  - Virtual Machine & Container
  - Docker & Kubernetes
  - Most Basic Architecture
  - Azure Kubernets Service - AKS

{{% /mindmap %}}

## Iaas & Paas & Saas

- Infrastructure-as-a-service
- Platform-as-a-service
- Software-as-a-service

[https://www.sherweb.com/blog/cloud-server/what-is-azure-paas/](https://www.sherweb.com/blog/cloud-server/what-is-azure-paas/)

![source by Microsoft](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/Iass_Pass_Saas.png)

![source by Microsoft](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/Iass_Pass_Saas2.png)

## Virtual Machine & Container

Virtual Machine: Traditional development & deployment，such as IIS & tomcat

Container:

1. **Platform independence: Build it once, run it anywhere**
2. **Resource efficiency and density**
3. **Effective isolation and resource sharing**
4. **Speed: Start, create, replicate or destroy containers in seconds**
5. **Immense and smooth scaling**
6. **Operational simplicity**
7. **Improved developer productivity and development pipeline**
8. **Language independence**

## Docker & Kubernetes

Docker is the popular way which implement container.
Other way ex. Azure Service Fabric, Amazon Elastic Container Service

Why use k8s:

1. **Container orchestration**
2. **Great for multi-cloud adoption**
3. **Deploy and update applications at scale for faster time-to-market**
   (Horizontal auto scaling，Rolling updates，Canary deployments)
4. **Laying the foundation for cloud-native apps**
5. **Lower infrastructure costs**
6. **It can run on-premise or in a hybrid environment.**
7. **You can move a Kubernetes cluster from one hosting vendor to another without changing (almost) any of the deployment and management processes.**
8. **Zero-downtime deployments, fault tolerance, high availability, scaling, scheduling, and self-healing add significant value in Kubernetes.**

## Most Basic Architecture

- Service Registration
- Service Discovery
- Monitoring
- Traffic Limit
- Routing
- Load Balance
- Timeout/Retry
- Circuit Breaking (熔断)
- Service Downgrade
- Failover

## Azure Kubernets Service -AKS

### 1. The First Stage

Build application as normal way - Introduce Cloud Native Information

Pod, Node, Replication Controller, Service, Namespace, Ingress, Gateway(Nginx)...

### 2. Use Third Party Components to Improve The System

1. Helm,
2. Traefik,  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/Traefik_Introduction.png)
3. Kubeapps,  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/kubeapps_application.png)
4. Prometheus,
5. Grafana,  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/grafana_K8SCluster.png)

![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/grafana_K8SContainer.png)

### 3. Use Service Mesh (Istio) for Micro Service Management

1. Gateway & Virtual Service
2. Cert
3. Kiali & Grafana  
   ![enter image description here](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/introduce-microservice-infrastructure-on-cloud/kiali_graph_voting.png)

4. Use CI/CD to deploy your apps.  
    1. Azure DevOps  
    2. Scaling  
    3. Intelligent Routing and Canary Releases  
   <https://docs.microsoft.com/en-us/azure/aks/servicemesh-istio-scenario-routing?pivots=client-operating-system-linux>

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzg1NDY2NDUzXX0=
-->

