# How to setup kubernetes on Azure


### Step 1. How to set AKS Cluster in Azure

This step could reference the official documents as below,
[https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough-portal](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough-portal "https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough-portal")

### Step 2 Open the could shell

![Cloud Shell](https://cdn.jsdelivr.net/gh/Gethin1990/gsblogResources/how-to-setup-kubernetes-on-azure/Cloud%20Shell_2019-07-25_21-12-58.png))

The link as [https://shell.azure.com/](https://shell.azure.com/)

And input the Command as below

```bash
az aks get-credentials --resource-group AKSGroup --name AKSCluster
```

### Step 3 install Prometheus

**How to create change nampspace :**

```bash
kuebctl create ns monitoring
kubectl config set-context --current --namespace=monitoring
```

**The install command as below,**

```bash
helm install stable/prometheus --name kube-prometheus --set rbac.create=true --namespace monitoring
```

If you met the issue like

> Error: namespaces "monitoring" is forbidden: User "system:serviceaccount:kube-system:default" cannot get resource "namespaces" in API group "" in the namespace "monitoring"

**Solution:**
rbac-config.yaml

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
```

```bash
kubectl create -f rbac-config.yaml
helm init --service-account tiller --history-max 200
```

### Step 4 install Grafana

```bash
helm install stable/grafana --set persistence.enabled=true --set persistence.accessModes={ReadWriteOnce} --set persistence.size=8Gi -n grafana --namespace monitoring
```

**You can mark the service as LoadBalancer,**

```bash
kubectl edit svc grafana
```

**Get the password,**

```bash
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

### step 5 Access the Kubernetes web dashboard in AKS

**The shell script as below.**

```bash
az aks browse --resource-group AKSGroup --name AKSCluster
```

**For RBAC-enabled clusters.**

```bash
kubectl create clusterrolebinding kubernetes-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard
```

### setp 6 install traekit

**install htpasswd.**

```bash
apt-get install apache2-utils
```

**generate password.**

```bash
htpasswd -nbm admin password1234
```

**install traefik.**

```bash
helm install stable/traefik --set dashboard.enabled=true,serviceType=LoadBalancer,rbac.enabled=true,dashboard.auth.basic.admin='$apr1$ZywpxeoS$6U80kYPG116slxBceEsVz0',dashboard.domain=traefik.dashboard --name=traefik --namespace=kube-system
```

**helm delete.**

```bash
helm del --purge traefik
```

### step 7 install kubeapps

**1. Install Kubeapps.**

```bash
kubectl create namespace kubeapps
```

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Helm 2 command

```bash
helm install --name kubeapps --namespace kubeapps bitnami/kubeapps
```

Helm 3 command

```bash
helm install kubeapps --namespace kubeapps bitnami/kubeapps --set useHelm3=true
```

**2. Create a Kubernetes API token.**

Create service account,

```bash
kubectl create serviceaccount kubeapps-operator -n kubeapps
```

Create cluster role binding,

```bash
kubectl create clusterrolebinding kubeapps-operator --clusterrole=cluster-admin --serviceaccount=kubeapps:kubeapps-operator
```

Get the secret,

```bash
kubectl get secret -n kubeapps $(kubectl get serviceaccount kubeapps-operator -n kubeapps -o jsonpath='{.secrets[].name}') -o jsonpath='{.data.token}' | base64 --decode && echo
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkwODgyMjAyM119
-->

