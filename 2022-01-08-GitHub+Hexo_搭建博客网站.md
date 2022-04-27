---
layout: post
cid: 80
title: GitHub+Hexo 搭建博客网站
slug: 80
date: 2022/01/08 12:48:44
updated: 2022/01/08 12:48:44
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


    Hexo是一款基于Node.js的静态博客框架，依赖少易于安装使用，可以方便的生成静态网页托管在GitHub和Heroku上，是搭建博客的首选框架。

  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aec1d93aba0a450cafcd07a65fae0d98~tplv-k3u1fbpfcp-zoom-1.image)

  

# 配置Github

```shell
root@hello:~/cby# git config --global user.name "cby-chen"
root@hello:~/cby# git config --global user.email "cby@chenby.cn"
root@hello:~/cby# ssh-keygen -t rsa -C "cby@chenby.cn"
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /root/.ssh/id_rsa
Your public key has been saved in /root/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:57aHSNuHDLRsy/UVOQKwrUmpKOqnkEbRuRc8jNrGVpU cby@chenby.cn
The key's randomart image is:
+---[RSA 3072]----+
|       .o.       |
|  . = .E +.      |
| . + *  + ..   . |
|  = o.oo.o  . +  |
| o.*...oS..  . o |
|.oo..   *o.   .  |
|+.     + Oo+ .   |
|+  .    =.=.+    |
| oo       .o     |
+----[SHA256]-----+
root@hello:~/cby# cat /root/.ssh/
authorized_keys  id_rsa           id_rsa.pub       known_hosts      

#需要配置到github上
#https://github.com/settings/ssh/new

root@hello:~/cby# ssh git@github.com
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ECDSA key fingerprint is SHA256:p2QAMXNIC1TJYWeIOttrVc98/R1BUFWu3/LiyKgUfQM.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com,20.205.243.166' (ECDSA) to the list of known hosts.
PTY allocation request failed on channel 0
Hi cby-chen! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
root@hello:~/cby#
```

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/437ef5592903459d906f754cc57feee1~tplv-k3u1fbpfcp-zoom-1.image)

\*将id\_rsa.pub文件中的内容粘贴进去

  

# 安装nvm工具

```shell
root@hello:~/cby# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
root@hello:~/cby# nvm install --lts
Installing latest LTS version.
Downloading and installing node v16.13.1...
Downloading https://nodejs.org/dist/v16.13.1/node-v16.13.1-linux-x64.tar.xz...
############################################################################################################################################### 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v16.13.1 (npm v8.1.2)
root@hello:~/cby# nvm use --lts
Now using node v16.13.1 (npm v8.1.2)
root@hello:~/cby# 
root@hello:~/cby# node -v
v16.13.1
root@hello:~/cby#
```

  

# 配置hexo环境，并修改主题

```shell
root@hello:~/cby# npm install -g hexo-cli 
root@hello:~/cby# npm install hexo -g
root@hello:~/cby# npm update hexo -g 
root@hello:~/cby# hexo init
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
INFO  Install dependencies
INFO  Start blogging with Hexo!

#修改主题
root@hello:~/cby# rm -rf scaffolds source themes _config.landscape.yml _config.yml package.json yarn.lock
root@hello:~/cby# git clone https://github.com/V-Vincen/hexo-theme-livemylife.git
root@hello:~/cby# mv hexo-theme-livemylife/* ./
root@hello:~/cby# rm -rf hexo-theme-livemylife
root@hello:~/cby# npm install
```

  

# 修改配置文件

```shell
root@hello:~/cby# vim _config.yml
root@hello:~/cby# 
root@hello:~/cby# 
root@hello:~/cby# cat _config.yml
#略

# Deployment
## Docs: https://hexo.io/docs/deployment.html
##
deploy:
  type: git
  repo: https://github.com/cby-chen/cby-chen.github.io.git # or https://gitee.com/<yourAccount>/<repo>
  branch: master
root@hello:~/cby# 


root@hello:~/cby# hexo clean 
root@hello:~/cby# hexo g 
root@hello:~/cby# hexo d


#注意，输入密码是需要输入token，创建时需要勾选所有权限
#https://github.com/settings/tokens/new
```

  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06a7dd55b8a64f3e85fd15dfc517499c~tplv-k3u1fbpfcp-zoom-1.image)

  

  

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/417c10a55d55470e9900764b3c0977ee~tplv-k3u1fbpfcp-zoom-1.image)

**Linux运维交流社区**

Linux运维交流社区，互联网新闻以及技术交流。

79篇原创内容

公众号

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e65a2d4a4a34f4c93f488fd3a96709d~tplv-k3u1fbpfcp-zoom-1.image)  

  

  

  

  

https://www.oiox.cn/

https://www.chenby.cn/

https://cby-chen.github.io/

https://weibo.com/u/5982474121

https://blog.csdn.net/qq\_33921750

https://my.oschina.net/u/3981543

https://www.zhihu.com/people/chen-bu-yun-2

https://segmentfault.com/u/hppyvyv6/articles

https://juejin.cn/user/3315782802482007

https://space.bilibili.com/352476552/article

https://cloud.tencent.com/developer/column/93230

https://www.jianshu.com/u/0f894314ae2c

https://www.toutiao.com/c/user/token/MS4wLjABAAAAeqOrhjsoRZSj7iBJbjLJyMwYT5D0mLOgCoo4pEmpr4A/

CSDN、GitHub、知乎、开源中国、思否、掘金、简书、腾讯云、哔哩哔哩、今日头条、新浪微博、个人博客、全网可搜《小陈运维》
