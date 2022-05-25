---
layout: post
cid: 56
title: kubernetes核心实战（六）--- ConfigMap
slug: 56
date: 2021/12/30 17:12:00
updated: 2022/05/19 15:55:35
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


#### 8、ConfigMap

抽取应用配置，并且可以自动更新

###### 创建配置文件  

```shell
[root@k8s-master-node1 ~/yaml/test]# vim configmap.yaml
[root@k8s-master-node1 ~/yaml/test]# cat configmap.yaml 
apiVersion: v1
data:   
  redis.conf: |
    appendonly yes
kind: ConfigMap
metadata:
  name: redis-conf
  namespace: default
[root@k8s-master-node1 ~/yaml/test]# 
[root@k8s-master-node1 ~/yaml/test]# kubectl apply -f configmap.yaml 
configmap/redis-conf created
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

###### 查看配置

```shell
[root@k8s-master-node1 ~/yaml/test]# kubectl  get configmaps 
NAME               DATA   AGE
kube-root-ca.crt   1      110m
redis-conf         1      18s
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

  

#### 9、DaemonSet

DaemonSet 确保全部（或者某些）节点上运行一个 Pod 的副本。当有节点加入集群时， 也会为他们新增一个 Pod 。当有节点从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除它创建的所有 Pod。

DaemonSet 的一些典型用法：

在每个节点上运行集群存守护进程在每个节点上运行日志收集守护进程在每个节点上运行监控守护进程一种简单的用法是为每种类型的守护进程在所有的节点上都启动一个 DaemonSet。一个稍微复杂的用法是为同一种守护进程部署多个 DaemonSet；每个具有不同的标志， 并且对不同硬件类型具有不同的内存、CPU 要求。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f346eb21df342eb90fae6fc2f45f178~tplv-k3u1fbpfcp-zoom-1.image)

###### 创建

```shell
[root@k8s-master-node1 ~/yaml/test]# vim daemonset.yaml
[root@k8s-master-node1 ~/yaml/test]# 
[root@k8s-master-node1 ~/yaml/test]# 
[root@k8s-master-node1 ~/yaml/test]# cat daemonset.yaml 
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: redis-app
  labels:
    k8s-app: redis-app
spec:
  selector:
    matchLabels:
      name: fluentd-redis
  template:
    metadata:
      labels:
        name: fluentd-redis
    spec:
      tolerations:
      # this toleration is to have the daemonset runnable on master nodes
      # remove it if your masters can't run pods
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
      containers:
      - name: fluentd-redis
        image: redis
        command:
          - redis-server
          - "/redis-master/redis.conf"  #指的是redis容器内部的位置
        ports:
        - containerPort: 6379
        resources:
          limits:
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 200Mi
        volumeMounts:
        - name: data
          mountPath: /data
        - name: config
          mountPath: /redis-master
          readOnly: true
      terminationGracePeriodSeconds: 30
      volumes:
      - name: data
        emptyDir: {}
      - name: config
        configMap: 
          name: redis-conf
          items:
          - key: redis.conf
            path: redis.conf
[root@k8s-master-node1 ~/yaml/test]# 
[root@k8s-master-node1 ~/yaml/test]# 
[root@k8s-master-node1 ~/yaml/test]# kubectl  apply -f daemonset.yaml 
daemonset.apps/redis-app created
[root@k8s-master-node1 ~/yaml/test]# 
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

###### 查看

```shell
[root@k8s-master-node1 ~/yaml/test]# 
[root@k8s-master-node1 ~/yaml/test]# kubectl  get pod
NAME                                     READY   STATUS    RESTARTS   AGE
ingress-demo-app-694bf5d965-8rh7f        1/1     Running   0          130m
ingress-demo-app-694bf5d965-swkpb        1/1     Running   0          130m
nfs-client-provisioner-dc5789f74-5bznq   1/1     Running   0          114m
redis-app-86g4q                          1/1     Running   0          28s
redis-app-rt92n                          1/1     Running   0          28s
redis-app-vkzft                          1/1     Running   0          28s
web-0                                    1/1     Running   0          64m
web-1                                    1/1     Running   0          63m
web-2                                    1/1     Running   0          63m
[root@k8s-master-node1 ~/yaml/test]# kubectl  get daemonsets.apps 
NAME        DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
redis-app   3         3         3       3            3           <none>          38s
[root@k8s-master-node1 ~/yaml/test]#
```

```

```

  

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0dd563f5511748219158213f3c0c46a1~tplv-k3u1fbpfcp-zoom-1.image)

**Linux运维交流社区**

Linux运维交流社区，互联网新闻以及技术交流。

62篇原创内容

公众号

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53fa028ea8904565afb8761f1dec368e~tplv-k3u1fbpfcp-zoom-1.image)  

https://blog.csdn.net/qq_33921750

https://my.oschina.net/u/3981543

https://www.zhihu.com/people/chen-bu-yun-2

https://segmentfault.com/u/hppyvyv6/articles

https://juejin.cn/user/3315782802482007

https://space.bilibili.com/352476552/article

https://cloud.tencent.com/developer/column/93230

知乎、CSDN、开源中国、思否、掘金、哔哩哔哩、腾讯云

  

> 本文使用 [文章同步助手](https://juejin.cn/post/6940875049587097631) 同步