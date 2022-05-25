---
layout: post
cid: 53
title: kubernetes核心实战（三）--- ReplicationController
slug: 53
date: 2021/12/30 17:12:00
updated: 2022/05/19 15:56:04
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


#### 5、ReplicationController

ReplicationController 确保在任何时候都有特定数量的 Pod 副本处于运行状态。换句话说，ReplicationController 确保一个 Pod 或一组同类的 Pod 总是可用的。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5be343bc24594aa8bb04f15fd046c488~tplv-k3u1fbpfcp-zoom-1.image)

##### ReplicationController 如何工作

当 Pod 数量过多时，ReplicationController 会终止多余的 Pod。当 Pod 数量太少时，ReplicationController 将会启动新的 Pod。与手动创建的 Pod 不同，由 ReplicationController 创建的 Pod 在失败、被删除或被终止时会被自动替换。例如，在中断性维护（如内核升级）之后，你的 Pod 会在节点上重新创建。因此，即使你的应用程序只需要一个 Pod，你也应该使用 ReplicationController 创建 Pod。ReplicationController 类似于进程管理器，但是 ReplicationController 不是监控单个节点上的单个进程，而是监控跨多个节点的多个 Pod。

  

在讨论中，ReplicationController 通常缩写为 "rc"，并作为 kubectl 命令的快捷方式。

  

一个简单的示例是创建一个 ReplicationController 对象来可靠地无限期地运行 Pod 的一个实例。更复杂的用例是运行一个多副本服务（如 web 服务器）的若干相同副本。

  

示例：

```shell
[root@k8s-master-node1 ~/yaml/test]# vim rc.yaml
[root@k8s-master-node1 ~/yaml/test]# cat  rc.yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    app: nginx
  template:
    metadata:
      name: nginx
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

##### 创建

```shell
[root@k8s-master-node1 ~/yaml/test]# kubectl apply -f rc.yaml 
replicationcontroller/nginx created
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

##### 查看pod

```shell
[root@k8s-master-node1 ~/yaml/test]# kubectl get pod
NAME                                     READY   STATUS    RESTARTS     AGE
ingress-demo-app-694bf5d965-q4l7m        1/1     Running   0            23h
ingress-demo-app-694bf5d965-v652j        1/1     Running   0            23h
nfs-client-provisioner-dc5789f74-nnk77   1/1     Running   1 (8h ago)   22h
nginx-87sxg                              1/1     Running   0            34s
nginx-kwrqn                              1/1     Running   0            34s
nginx-xk2t6                              1/1     Running   0            34s
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

##### 查看rc

```shell
[root@k8s-master-node1 ~/yaml/test]# kubectl describe replicationcontrollers nginx
Name:         nginx
Namespace:    default
Selector:     app=nginx
Labels:       app=nginx
Annotations:  <none>
Replicas:     3 current / 3 desired
Pods Status:  3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=nginx
  Containers:
   nginx:
    Image:        nginx
    Port:         80/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Events:
  Type    Reason            Age   From                    Message
  ----    ------            ----  ----                    -------
  Normal  SuccessfulCreate  102s  replication-controller  Created pod: nginx-xk2t6
  Normal  SuccessfulCreate  102s  replication-controller  Created pod: nginx-kwrqn
  Normal  SuccessfulCreate  102s  replication-controller  Created pod: nginx-87sxg
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/585ffdb69b8845e08edbd1661b18631b~tplv-k3u1fbpfcp-zoom-1.image)

**Linux运维交流社区**

Linux运维交流社区，互联网新闻以及技术交流。

59篇原创内容

公众号

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc09e5e4ec734b0ca15756991fedf822~tplv-k3u1fbpfcp-zoom-1.image)  

https://blog.csdn.net/qq_33921750

https://my.oschina.net/u/3981543

https://www.zhihu.com/people/chen-bu-yun-2

https://segmentfault.com/u/hppyvyv6/articles

https://juejin.cn/user/3315782802482007

https://space.bilibili.com/352476552/article

https://cloud.tencent.com/developer/column/93230

知乎、CSDN、开源中国、思否、掘金、哔哩哔哩、腾讯云

  

> 本文使用 [文章同步助手](https://juejin.cn/post/6940875049587097631) 同步