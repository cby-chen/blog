---
layout: post
cid: 69
title: kubernetes（k8s）中部署 efk
slug: 69
date: 2021/12/30 17:15:17
updated: 2021/12/30 17:15:17
status: publish
author: cby
categories: 
  - 默认分类
tags: 
---


Kubernetes 开发了一个 Elasticsearch 附加组件来实现集群的日志管理。这是一个 Elasticsearch、Fluentd 和 Kibana 的组合。

  

Elasticsearch 是一个搜索引擎，负责存储日志并提供查询接口；

Fluentd 负责从 Kubernetes 搜集日志，每个node节点上面的fluentd监控并收集该节点上面的系统日志，并将处理过后的日志信息发送给Elasticsearch；

Kibana 提供了一个 Web GUI，用户可以浏览和搜索存储在 Elasticsearch 中的日志。

  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/963904f901324291806e8cad4d701f2c~tplv-k3u1fbpfcp-zoom-1.image)

  

从官方github仓库下载yaml文件

  

```shell
[root@hello ~/efk]# git clone https://github.com/kubernetes/kubernetes.git
[root@hello ~/efk]# kubectl create namespace logging
[root@hello ~/efk]#
```

  

执行所有yaml文件

  

```shell
[root@hello ~/efk]# cd kubernetes/cluster/addons/fluentd-elasticsearch/
[root@hello ~/efk/kubernetes/cluster/addons/fluentd-elasticsearch]# kubectl apply -f ./
namespace/logging created
service/elasticsearch-logging created
serviceaccount/elasticsearch-logging created
clusterrole.rbac.authorization.k8s.io/elasticsearch-logging created
clusterrolebinding.rbac.authorization.k8s.io/elasticsearch-logging created
statefulset.apps/elasticsearch-logging created
configmap/fluentd-es-config-v0.2.1 created
serviceaccount/fluentd-es created
clusterrole.rbac.authorization.k8s.io/fluentd-es created
clusterrolebinding.rbac.authorization.k8s.io/fluentd-es created
daemonset.apps/fluentd-es-v3.1.1 created
deployment.apps/kibana-logging created
service/kibana-logging created
```

  

查看pod状态：

  

```shell
[root@hello ~]# kubectl  get pod -n logging
NAME                              READY   STATUS    RESTARTS       AGE
elasticsearch-logging-0           1/1     Running   0              2m17s
elasticsearch-logging-1           1/1     Running   0              96s
fluentd-es-v3.1.1-qw9dj           1/1     Running   1 (97s ago)    2m16s
kibana-logging-75bd6cccf5-pskrr   1/1     Running   1 (106s ago)   2m16s
[root@hello ~]#


[root@hello ~]# kubectl  get service -n logging
NAME                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)             AGE
elasticsearch-logging   ClusterIP   None            <none>        9200/TCP,9300/TCP   2m41s
kibana-logging          ClusterIP   10.68.145.186   <none>        5601/TCP            2m40s
[root@hello ~]#
```

  

访问 kibana

  

```shell
[root@hello ~]# kubectl proxy --address='192.168.1.11' --port=8086 --accept-hosts='^*$'
#访问
http://192.168.1.11:8086//api/v1/namespaces/logging/services/kibana-logging/proxy/
```

  

创建一个index-pattern索引

  
  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc588e1fd00747d49642989fe24226b4~tplv-k3u1fbpfcp-zoom-1.image)

  

  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb93320695564020a6d77ddb1e4e1ee8~tplv-k3u1fbpfcp-zoom-1.image)

  

  

默认为 logstash-\* 即可，之后这里会看到日志

  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03541d56f5b943cdb720641f0792dd15~tplv-k3u1fbpfcp-zoom-1.image)

  

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbb5f77202114ac49968ed4f20a8712d~tplv-k3u1fbpfcp-zoom-1.image)

**Linux运维交流社区**

Linux运维交流社区，互联网新闻以及技术交流。

73篇原创内容

公众号

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/695c54c6f1414fd8aa8218b23684b95f~tplv-k3u1fbpfcp-zoom-1.image)  

  

https://blog.csdn.net/qq\_33921750

https://my.oschina.net/u/3981543

https://www.zhihu.com/people/chen-bu-yun-2

https://segmentfault.com/u/hppyvyv6/articles

https://juejin.cn/user/3315782802482007

https://space.bilibili.com/352476552/article

https://cloud.tencent.com/developer/column/93230

知乎、CSDN、开源中国、思否、掘金、哔哩哔哩、腾讯云