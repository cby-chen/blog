---
layout: post_draft
cid: 219
title: kubernetes核心实战（一）--- namespace
slug: @219
date: 2021/12/30 17:11:00
updated: 2022/05/19 15:57:17
status: publish
author: cby
categories: 
  - 默认分类
tags: 
abstract: 
description: 
keywords: 
mode: default
thumb: 
video: 
---


### kubernetes核心实战

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/914bb248938e4a8997f638331b293d69~tplv-k3u1fbpfcp-zoom-1.image)

  

#### 1、资源创建方式

命令行创建

yaml文件创建

  

#### 2、namespace

命名空间（namespace）是Kubernetes提供的组织机制，用于给集群中的任何对象组进行分类、筛选和管理。每一个添加到Kubernetes集群的工作负载必须放在一个命名空间中。

  

命名空间为集群中的对象名称赋予作用域。虽然在命名空间中名称必须是唯一的，但是相同的名称可以在不同的命名空间中使用。这对于某些场景来说可能帮助很大。例如，如果使用命名空间来划分应用程序生命周期环境（如开发、staging、生产），则可以在每个环境中维护利用同样的名称维护相同对象的副本。

  

命名空间还可以让用户轻松地将策略应用到集群的具体部分。你可以通过定义ResourceQuota对象来控制资源的使用，该对象在每个命名空间的基础上设置了使用资源的限制。类似地，当在集群上使用支持网络策略的CNI（容器网络接口）时，比如Calico或Canal（calico用于策略，flannel用于网络）。你可以将NetworkPolicy应用到命名空间，其中的规则定义了pod之间如何彼此通信。不同的命名空间可以有不同的策略。

  

使用命名空间最大的好处之一是能够利用Kubernetes RBAC（基于角色的访问控制）。RBAC允许您在单个名称下开发角色，这样将权限或功能列表分组。ClusterRole对象用于定义集群规模的使用模式，而角色对象类型（Role object type）应用于具体的命名空间，从而提供更好的控制和粒度。在角色创建后，RoleBinding可以将定义的功能授予单个命名空间上下文中的具体具体用户或用户组。通过这种方式，命名空间可以使得集群操作者能够将相同的策略映射到组织好的资源集合。

  

**将命名空间映射到团队或项目上**

**使用命名空间对生命周期环境进行分区**

**使用命名空间隔离不同的使用者**

  

```shell
[root@k8s-master-node1 ~]# kubectl  create  namespace cby
namespace/cby created
[root@k8s-master-node1 ~]# 
[root@k8s-master-node1 ~]# kubectl  get namespaces 
NAME                   STATUS   AGE
cby                    Active   2s
default                Active   21h
ingress-nginx          Active   21h
kube-node-lease        Active   21h
kube-public            Active   21h
kube-system            Active   21h
kubernetes-dashboard   Active   21h
[root@k8s-master-node1 ~]# 
[root@k8s-master-node1 ~]# kubectl  delete  namespace cby
namespace "cby" deleted
[root@k8s-master-node1 ~]# 
[root@k8s-master-node1 ~]# 
[root@k8s-master-node1 ~]# kubectl  get namespaces 
NAME                   STATUS   AGE
default                Active   21h
ingress-nginx          Active   21h
kube-node-lease        Active   21h
kube-public            Active   21h
kube-system            Active   21h
kubernetes-dashboard   Active   21h
[root@k8s-master-node1 ~]#
```

```

```

  

##### 查看yaml格式

*   ```shell
    [root@k8s-master-node1 ~]# kubectl  create  namespace cby
    namespace/cby created
    [root@k8s-master-node1 ~]# 
    [root@k8s-master-node1 ~]# kubectl  get namespaces cby -o yaml
    apiVersion: v1
    kind: Namespace
    metadata:
    creationTimestamp: "2021-11-17T03:08:10Z"
    labels:
      kubernetes.io/metadata.name: cby
    name: cby
    resourceVersion: "311903"
    uid: 63f2e47d-a2a5-4a67-8fd2-7ca29bfb02be
    spec:
    finalizers:
    
    - kubernetes
      status:
        phase: Active
    [root@k8s-master-node1 ~]#
    ```
    

  

  

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e358ba9f0bfa41e39fa47c8f7420ffab~tplv-k3u1fbpfcp-zoom-1.image)

**Linux运维交流社区**

Linux运维交流社区，互联网新闻以及技术交流。

57篇原创内容

公众号

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d357157ea1e4fceb1a22c8e6dc229c3~tplv-k3u1fbpfcp-zoom-1.image)  

https://blog.csdn.net/qq_33921750

https://my.oschina.net/u/3981543

https://www.zhihu.com/people/chen-bu-yun-2

https://segmentfault.com/u/hppyvyv6/articles

https://juejin.cn/user/3315782802482007

https://space.bilibili.com/352476552/article

https://cloud.tencent.com/developer/column/93230

知乎、CSDN、开源中国、思否、掘金、哔哩哔哩、腾讯云

  

> 本文使用 [文章同步助手](https://juejin.cn/post/6940875049587097631) 同步