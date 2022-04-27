---
layout: post
cid: 19
title: 华为人工智能atlasA800-9000物理服务器离线安装及CANN安装和MindSpore安装和Tensorflow安装
slug: 19
date: 2021/12/30 17:02:00
updated: 2022/03/25 15:51:35
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


目录

华为人工智能atlas A800-9000 物理服务器全程离线安装驱动以及CANN安装部署和MindSpore安装部署和Tensorflow安装部署

A800-9000 物理服务器安装驱动

使用镜像配置本地apt源

创建普通用户并设置密码

安装驱动以及固件

验证是否安装成功

  

CANN开发环境部署安装

安装环境以及依赖

安装完成后查看版本

安装Python3.7.5

使用Python3.7.5环境安装pip依赖包

安装开发套件包

  

CANN训练环境部署安装

说明

安装训练软件包

  

安装MindSpore

安装whl包

配置环境变量

测试是否可行

  

安装mindinsight

安装whl包

配置环境变量

启动及使用

  

安装Tensorflow

编译hdf5

配置环境变量及软连接

安装whl包

  

安装Pytorch

**华为人工智能atlas A800-9000 物理服务器全程离线安装驱动以及CANN安装部署和MindSpore安装部署和Tensorflow安装部署**

背景

  

  
Atlas 800 训练服务器（型号：9000）是基于华为鲲鹏920+昇腾910处理器的AI训练服务器，具有最强算力密度、超高能效与高速网络带宽等特点。该服务器广泛应用于深度学习模型开发和训练，适用于智慧城市、智慧医疗、天文探索、石油勘探等需要大算力的行业领域。

链接：

```shell
https://e.huawei.com/cn/products/cloud-computing-dc/atlas/atlas-800-training-9000
```shell

CANN (Compute Architecture for Neural Networks)

是华为公司针对AI场景推出的异构计算架构，通过提供多层次的编程接口，支持用户快速构建基于昇腾平台的AI应用和业务。

链接：  

```shell
https://e.huawei.com/cn/products/cloud-computing-dc/atlas/cann
```shell

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f089f5ea12d4b2a96f1bc04c4b417d9~tplv-k3u1fbpfcp-zoom-1.image)

  

MindSpore，新一代AI开源计算框架。

创新编程范式，AI科学家和工程师更易使用，便于开放式创新；该计算框架可满足终端、边缘计算、云全场景需求，能更好保护数据隐私；可开源，形成广阔应用生态。

链接：  

```shell
https://www.mindspore.cn/
```shell

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5b21ad3d5d04fc8816abcd6a6bd80b9~tplv-k3u1fbpfcp-zoom-1.image)

  

TensorFlow最初由谷歌大脑团队开发，用于Google的研究和生产，于2015年11月9日在Apache 2.0开源许可证下发布。  

链接：  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fcf527d2f6b47a9bdff1e349a3ee280~tplv-k3u1fbpfcp-zoom-1.image)

```shell
https://www.tensorflow.org/
```shell

**A800-9000****物理服务器安装驱动**

**使用镜像配置本地apt源**

```shell
root@ubuntu:/etc/apt# mkdir/media/cdrom
root@ubuntu:/etc/apt# mount/home/cby/ubuntu-18.04.5-server-arm64.iso /media/cdrom
mount: /media/chrom: WARNING:device write-protected, mounted read-only.
root@ubuntu:/etc/apt# apt-cdrom-m -d=/media/cdrom/ add
root@ubuntu:/etc/apt# cat/etc/apt/sources.list
```shell

**创建普通用户并设置密码**

```shell
root@ubuntu:~#groupadd HwHiAiUser
root@ubuntu:~#useradd -g HwHiAiUser -d /home/HwHiAiUser -m HwHiAiUser
root@ubuntu:~#passwd HwHiAiUser
Enter newUNIX password:
Retype newUNIX password:
passwd:password updated successfully
```shell

**安装驱动以及固件**

```shell
root@ubuntu:~# cd /home/cby/
root@ubuntu:/home/cby# ll
total 98324
drwxr-xr-x 4 cby  cby     4096 Apr 21 21:41 ./
drwxr-xr-x 4 root root     4096 Apr 21 21:44 ../
-rw-r--r-- 1 cby  cby 99728721 Apr 21 21:41A800-9000-npu-driver\_20.2.0\_ubuntu18.04-aarch64.run
-rw-r--r-- 1 cby  cby   912335 Apr 21 21:41 A800-9000-npu-firmware\_1.76.22.3.220.run
root@ubuntu:/home/cby# chmod +x\*.run
root@ubuntu:/home/cby# ll
total 98324
drwxr-xr-x 4 cby  cby     4096 Apr 21 21:41 ./
drwxr-xr-x 4 root root     4096 Apr 21 21:44 ../
-rwxr-xr-x 1 cby  cby 99728721 Apr 21 21:41 A800-9000-npu-driver\_20.2.0\_ubuntu18.04-aarch64.run\*
-rwxr-xr-x 1 cby  cby   912335 Apr 21 21:41 A800-9000-npu-firmware\_1.76.22.3.220.run\*
root@ubuntu:/home/cby# aptinstall gcc
root@ubuntu:/home/cby# aptinstall make
root@ubuntu:/home/cby#./A800-9000-npu-driver\_20.2.0\_ubuntu18.04-aarch64.run –run
root@ubuntu:/home/cby#./A800-9000-npu-firmware\_1.76.22.3.220.run –run
```shell

\*注意：安装完成后需要重启服务器

**验证是否安装成功**

```shell
root@ubuntu:/home/cby#npu-smi info
```shell

  

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1066a0a3d8d644b98b26c8196c6044fc~tplv-k3u1fbpfcp-zoom-1.image)

**CANN****开发环境部署安装**  

**安装环境以及依赖**

  

```shell
root@ubuntu:/home/cby# apt install g++
root@ubuntu:/home/cby# cd cmake/
root@ubuntu:/home/cby/cmake# ll
total 4356
drwxr-xr-x 2 root root    4096 Apr 21 23:48 ./
drwxr-xr-x 7 cby  cby    4096 Apr 21 23:48 ../
-rw-r--r-- 1 cby  cby 2971248 Apr 21 23:45 cmake\_3.10.2-1ubuntu2.18.04.1\_arm64.deb
-rw-r--r-- 1 cby  cby 1331524 Apr 21 23:45 cmake-data\_3.10.2-1ubuntu2.18.04.1\_all.deb
-rw-r--r-- 1 cby  cby   69166 Apr 21 23:47 libjsoncpp1\_1.7.4-3\_arm64.deb
-rw-r--r-- 1 cby  cby   71788 Apr 21 23:48 librhash0\_1.3.6-2\_arm64.deb
root@ubuntu:/home/cby/cmake# apt install./\*
root@ubuntu:/home/cby/cmake# make–version
```shell

```shell
root@ubuntu:/home/cby# apt install./zlib1g-dev\_1%3a1.2.11.dfsg-0ubuntu2\_arm64.deb
root@ubuntu:/home/cby# apt install./libbz2-dev\_1.0.6-8.1ubuntu0.2\_arm64.deb
root@ubuntu:/home/cby# apt install ./libsqlite3-dev\_3.22.0-1ubuntu0.4\_arm64.deb
```shell

```shell
root@ubuntu:/home/cby# cd libssl-dev/
root@ubuntu:/home/cby/libssl-dev#apt install ./\*
```shell

```shell
root@ubuntu:/home/cby# cd libxslt1-dev/
root@ubuntu:/home/cby/libxslt1-dev#ll
total 13596
drwxr-xr-x  2 root root   4096 Apr 22 00:37 ./
drwxr-xr-x 10 cby  cby    4096 Apr 22 00:37 ../
-rw-r--r--  1 cby cby    18528 Apr 22 00:30gir1.2-harfbuzz-0.0\_1.7.2-1ubuntu1\_arm64.deb
-rw-r--r--  1 cby cby   170204 Apr 22 00:27icu-devtools\_60.2-3ubuntu3.1\_arm64.deb
-rw-r--r--  1 cby cby   983364 Apr 22 00:37libglib2.0-0\_2.56.4-0ubuntu0.18.04.8\_arm64.deb
-rw-r--r--  1 cby cby    61832 Apr 22 00:33libglib2.0-bin\_2.56.4-0ubuntu0.18.04.8\_arm64.deb
-rw-r--r--  1 cby cby  1297600 Apr 22 00:31libglib2.0-dev\_2.56.4-0ubuntu0.18.04.8\_arm64.deb
-rw-r--r--  1 cby cby    99676 Apr 22 00:31libglib2.0-dev-bin\_2.56.4-0ubuntu0.18.04.8\_arm64.deb
-rw-r--r--  1 cby cby    14528 Apr 22 00:32libgraphite2-dev\_1.3.11-2\_arm64.deb
-rw-r--r--  1 cby cby   280584 Apr 22 00:28libharfbuzz-dev\_1.7.2-1ubuntu1\_arm64.deb
-rw-r--r--  1 cby cby    12556 Apr 22 00:30libharfbuzz-gobject0\_1.7.2-1ubuntu1\_arm64.deb
-rw-r--r--  1 cby cby     5348 Apr 22 00:29libharfbuzz-icu0\_1.7.2-1ubuntu1\_arm64.deb
-rw-r--r--  1 cby cby  8890124 Apr 22 00:26libicu-dev\_60.2-3ubuntu3.1\_arm64.deb
-rw-r--r--  1 cby cby    14412 Apr 22 00:28libicu-le-hb0\_1.0.3+git161113-4\_arm64.deb
-rw-r--r--  1 cby cby    29760 Apr 22 00:27libicu-le-hb-dev\_1.0.3+git161113-4\_arm64.deb
-rw-r--r--  1 cby cby    18756 Apr 22 00:26libiculx60\_60.2-3ubuntu3.1\_arm64.deb
-rw-r--r--  1 cby cby   120696 Apr 22 00:35libpcre16-3\_2%3a8.39-9\_arm64.deb
-rw-r--r--  1 cby cby   113240 Apr 22 00:35libpcre32-3\_2%3a8.39-9\_arm64.deb
-rw-r--r--  1 cby cby   459316 Apr 22 00:33libpcre3-dev\_2%3a8.39-9\_arm64.deb
-rw-r--r--  1 cby cby    15124 Apr 22 00:35libpcrecpp0v5\_2%3a8.39-9\_arm64.deb
-rw-r--r--  1 cby cby   673384 Apr 22 00:25libxml2-dev\_2.9.4+dfsg1-6.1ubuntu1.3\_arm64.deb
-rw-r--r--  1 cby cby   395564 Apr 22 00:24libxslt1-dev\_1.1.29-5ubuntu0.2\_arm64.deb
-rw-r--r--  1 cby cby    42802 Apr 22 00:33pkg-config\_0.29.1-0ubuntu2\_arm64.deb
-rw-r--r--  1 cby cby   144176 Apr 22 00:37python3-distutils\_3.6.9-1~18.04\_all.deb
root@ubuntu:/home/cby/libxslt1-dev#apt install ./\*
```shell

```shell
root@ubuntu:/home/cby# cd libffi-dev/
root@ubuntu:/home/cby/libffi-dev#ls
libffi-dev\_3.2.1-8\_arm64.deb
root@ubuntu:/home/cby/libffi-dev#apt install ./\*
```shell

```shell
root@ubuntu:/home/cby#apt install unzip
root@ubuntu:/home/cby# apt install./libblas-dev\_3.7.1-4ubuntu1\_arm64.deb
```shell

```shell
root@ubuntu:/home/cby# cd gfortran/
root@ubuntu:/home/cby/gfortran#ll
total 7844
drwxr-xr-x  2 root root   4096 Apr 22 00:50 ./
drwxr-xr-x 12cby  cby     4096 Apr 22 00:50 ../
-rw-r--r--  1 cby cby     1344 Apr 22 00:48gfortran\_4%3a7.4.0-1ubuntu2.3\_arm64.deb
-rw-r--r--  1 cby cby  7464740 Apr 22 00:48gfortran-7\_7.5.0-3ubuntu1~18.04\_arm64.deb
-rw-r--r--  1 cby cby   248176 Apr 22 00:50libgfortran4\_7.5.0-3ubuntu1~18.04\_arm64.deb
-rw-r--r--  1 cby cby   300500 Apr 22 00:49libgfortran-7-dev\_7.5.0-3ubuntu1~18.04\_arm64.deb
root@ubuntu:/home/cby/gfortran#apt install ./\*
```shell

```shell
root@ubuntu:/home/cby# cd libblas3/
root@ubuntu:/home/cby/libblas3#apt install ./libblas3\_3.7.1-4ubuntu1\_arm64.deb
```shell

```shell
root@ubuntu:/home/cby# cdlibopenblas-dev/
root@ubuntu:/home/cby/libopenblas-dev#ll
total 3412
drwxr-xr-x  2 root root   4096 Apr 22 00:56 ./
drwxr-xr-x 14cby  cby     4096 Apr 22 00:56 ../
-rw-r--r--  1 cby cby  1813748 Apr 22 00:55libopenblas-base\_0.2.20+ds-4\_arm64.deb
-rw-r--r--  1 cby cby  1668126 Apr 22 00:54libopenblas-dev\_0.2.20+ds-4\_arm64.deb
root@ubuntu:/home/cby/libopenblas-dev#apt install ./\*
```shell

**安装完成后查看版本**

```shell
gcc --version
g++ --version
make --version
cmake --version
dpkg -l zlib1g| grepzlib1g| grep ii
dpkg -l zlib1g-dev|grep zlib1g-dev| grep ii
dpkg -l libbz2-dev|grep libbz2-dev| grep ii
dpkg -llibsqlite3-dev| grep libsqlite3-dev| grep ii
dpkg -l openssl| grepopenssl| grep ii
dpkg -l libssl-dev|grep libssl-dev| grep ii
dpkg -l libxslt1-dev|grep libxslt1-dev| grep ii
dpkg -l libffi-dev|grep libffi-dev| grep ii
dpkg -l unzip| grepunzip| grep ii
dpkg -l pciutils|grep pciutils| grep ii
dpkg -l net-tools|grep net-tools| grep ii
dpkg -l libblas-dev|grep libblas-dev| grep ii
dpkg -l gfortran|grep gfortran| grep ii
dpkg -l libblas3|grep libblas3| grep ii
dpkg -llibopenblas-dev| grep libopenblas-dev| grep ii
```shell

**安装Python3.7.5**

```shell
root@ubuntu:/home/cby/python#tar xvf Python3.7.5.tar
root@ubuntu:/home/cby/python# cdPython-3.7.5/
root@ubuntu:/home/cby/python/Python-3.7.5#./configure --prefix=/usr/local/python3.7.5 --enable-loadable-sqlite-extensions--enable-shared
root@ubuntu:/home/cby/python/Python-3.7.5#make
root@ubuntu:/home/cby/python/Python-3.7.5#make install
 
root@ubuntu:/home/cby# sudo ln -s/usr/local/python3.7.5/bin/pip3 /usr/local/bin/pip3.7.5
root@ubuntu:/home/cby# sudo ln-s /usr/local/python3.7.5/bin/python3 /usr/local/bin/python3.7.5
root@ubuntu:/home/cby/cann\_xunlian#sudo ln -s /usr/local/python3.7.5/bin/python3 /usr/local/bin/python3.7
root@ubuntu:/home/cby/cann\_xunlian#sudo ln -s /usr/local/python3.7.5/bin/pip3 /usr/local/bin/pip3.7
 
root@ubuntu:/home/cby# vim ~/.bashrc
exportLD\_LIBRARY\_PATH=/usr/local/python3.7.5/lib:$LD\_LIBRARY\_PATH
      
root@ubuntu:/home/cby#python3.7.5 --version
Python 3.7.5
root@ubuntu:/home/cby# pip3.7.5--version
pip 19.2.3 from /usr/local/python3.7.5/lib/python3.7/site-packages/pip(python 3.7)
```shell

**使用Python3.7.5环境安装pip依赖包**

```shell
root@ubuntu:/home/cby/pip-pack# tar xvfpip\_pack.tar
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./attrs-20.3.0-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./numpy-1.17.2-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./decorator-5.0.6-py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./mpmath-1.2.1-py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./sympy-1.4-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./pycparser-2.20-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./cffi-1.12.3.tar.gz
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./PyYAML-5.3.1.tar.gz
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./six-1.15.0-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./pathlib2-2.3.5-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./psutil-5.8.0.tar.gz
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./protobuf-3.15.8-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./scipy-1.6.0-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./chardet-3.0.4-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./idna-2.10-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./urllib3-1.25.10-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./certifi-2020.6.20-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./certifi-2020.6.20-py2.py3-none-any.whl
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./requests-2.24.0-py2.py3-none-any.wh
root@ubuntu:/home/cby/pip-pack/pip\_pack#pip3.7.5 install ./xlrd-1.2.0-py2.py3-none-any.whl
```shell

 **\*注意：以上pip包的安装必须以该顺序依次进行安装**

**安装开发套件包**

```shell
root@ubuntu:/home/cby/cann#./Ascend-cann-tfplugin\_20.2.rc1\_linux-aarch64.run –install
root@ubuntu:/home/cby/cann#./Ascend-cann-toolkit\_20.2.rc1\_linux-aarch64.run –install
```shell

    出现install success后表示安装成功。  

  

**CANN****训练环境部署安装**

**说明**

       训练环境的Python3.7.5和环境以及依赖，和开发环境下的安装方式一样，可参考《CANN开发环境部署安装》文档进行安装。在已经搭建好的开发环境中，进行安装训练环境仅需安装一下训练软件包和实用工具包即可。

**安装训练软件包**

```shell
root@ubuntu:/home/cby/cann\_xunlian# chmod+x ./\*.run
root@ubuntu:/home/cby/cann\_xunlian# ./Ascend-cann-nnae\_20.2.rc1\_linux-aarch64.run–install
root@ubuntu:/home/cby/cann\_xunlian#./Ascend-cann-toolbox\_20.2.rc1\_linux-aarch64.run –install
```shell

       出现install success后表示安装成功。

**安装MindSpore**

**安装whl包**

        安装Ascend 910 AI处理器配套软件包提供的whl包，whl包随配套软件包发布，升级配套软件包之后需要重新安装。

```shell
root@ubuntu:/home/cby/mindspore\_ascend#pip3.7.5 install /usr/local/Ascend/ascend-toolkit/latest/fwkacllib/lib64/hccl-0.1.0-py3-none-any.whl
root@ubuntu:/home/cby/mindspore\_ascend#pip3.7.5 install /usr/local/Ascend/ascend-toolkit/latest/fwkacllib/lib64/te-0.4.0-py3-none-any.whl
root@ubuntu:/home/cby/mindspore\_ascend#pip3.7.5 install /usr/local/Ascend/ascend-toolkit/latest/fwkacllib/lib64/topi-0.4.0-py3-none-any.whl
 
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install easydict-1.9.tar.gz
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ./wheel-0.36.2-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ./astunparse-1.6.3-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ./Pillow-8.2.0-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ./asttokens-2.0.4-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ./cffi-1.14.5-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ./pyparsing-2.4.7-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ./packaging-20.9-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindspore\_ascend/pip#pip3.7.5 install ../mindspore\_ascend-1.1.1-cp37-cp37m-linux\_aarch64.whl
```shell

**\*注意：安装时必须以此顺序进行安装**

**配置环境变量**

```shell
\# control log level.0-DEBUG, 1-INFO, 2-WARNING, 3-ERROR, default level is WARNING.
 
export GLOG\_v=2
 
# Conda environmentaloptions
 
LOCAL\_ASCEND=/usr/local/Ascend
 
# the root directoryof run package
 
# lib libraries thatthe run package depends on
 
exportLD\_LIBRARY\_PATH=${LOCAL\_ASCEND}/add-ons/:${LOCAL\_ASCEND}/ascend-toolkit/latest/fwkacllib/lib64:${LOCAL\_ASCEND}/driver/lib64:${LOCAL\_ASCEND}/opp/op\_impl/built-in/ai\_core/tbe/op\_tiling:${LD\_LIBRARY\_PATH}
 
 
# Environmentvariables that must be configured
 
exportTBE\_IMPL\_PATH=${LOCAL\_ASCEND}/ascend-toolkit/latest/opp/op\_impl/built-in/ai\_core/tbe
 
# TBE operatorimplementation tool path
 
exportASCEND\_OPP\_PATH=${LOCAL\_ASCEND}/ascend-toolkit/latest/opp
 
# OPP path
 
exportPATH=${LOCAL\_ASCEND}/ascend-toolkit/latest/fwkacllib/ccec\_compiler/bin/:${PATH}
 
# TBE operatorcompilation tool path
 
exportPYTHONPATH=${TBE\_IMPL\_PATH}:${PYTHONPATH}
 
# Python library thatTBE implementation depends on
```shell

**测试是否可行**

Python代码内容：

```shell
import numpy as np
from mindspore importTensor
import mindspore.opsas ops
importmindspore.context as context
 
context.set\_context(device\_target="Ascend")
 
x =Tensor(np.ones(\[1,3,3,4\]).astype(np.float32))
y =Tensor(np.ones(\[1,3,3,4\]).astype(np.float32))
print(ops.tensor\_add(x,y))
```shell

出现此结果即是安装部署完成

```shell
\[\[\[\[2. 2. 2. 2.\]
   \[2. 2. 2. 2.\]
   \[2. 2. 2. 2.\]\]
 
  \[\[2. 2. 2. 2.\]
   \[2. 2. 2. 2.\]
   \[2. 2. 2. 2.\]\]
 
  \[\[2. 2. 2. 2.\]
   \[2. 2. 2. 2.\]
   \[2. 2. 2. 2.\]\]\]\]
```shell

**安装mindinsight**

**安装whl包**

```shell
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./itsdangerous-1.1.0-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./Werkzeug-1.0.1-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./MarkupSafe-1.1.1-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./Jinja2-2.11.3-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./click-7.1.2-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./Flask-1.1.2-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./Flask\_Cors-3.0.10-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./yapf-0.31.0-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./future-0.18.2.tar.gz
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./treelib-1.6.1.tar.gz
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./grpcio-1.37.0-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./google\_pasta-0.2.0-py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./pytz-2021.1-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./python\_dateutil-2.8.1-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./pandas-1.2.3-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./gunicorn-20.1.0.tar.gz
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./marshmallow-3.11.1-py2.py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./threadpoolctl-2.1.0-py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./joblib-1.0.1-py3-none-any.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./scikit\_learn-0.24.1-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/mindinsight/Mindinsight#pip3.7.5 install ./mindinsight-1.1.1-cp37-cp37m-linux\_aarch64.whl
```shell

**\*注意：安装必须以此顺序进安装**

**配置环境变量**

在配置文件中配置如下变量

```shell
PATH=$PATH:/usr/local/python3.7.5/bin/
```shell

```shell
root@ubuntu:/home/cby#source /etc/profile
```shell

**启动及使用**

```shell
root@ubuntu:/home/cby#mindinsight start
Workspace:/root/mindinsight
Webaddress: http://127.0.0.1:8080
servicestart state: success
```shell

    出现该消息后，说明可视化已经启动成功，若需要外机访问的话，需要进行反向代理到0.0.0.0上面即可，比如frp工具即可实现该操作

    在训练完成的Python代码目录下，使以下命令即可启动并展示该目录下的训练数据，debugger的参数可使用false或者true

```shell
mindinsightstart --summary-base-dir . --port 8080 --enable-debugger True --debugger-port50051
```shell

使用如下命令即可启动训练

```shell
root@ubuntu:/home/cby/lenet/lenet#python3.7.5 lenet.py --device_target=Ascend
```shell

**安装Tensorflow**

**编译hdf5**

```shell
root@ubuntu:/home/cby/Tensorflow/Tensorflow#cd hdf5-1.10.5/
root@ubuntu:/home/cby/Tensorflow/Tensorflow/hdf5-1.10.5#./configure --prefix=/usr/include/hdf5
root@ubuntu:/home/cby/Tensorflow/Tensorflow/hdf5-1.10.5#make
root@ubuntu:/home/cby/Tensorflow/Tensorflow/hdf5-1.10.5#make install
```shell

**配置环境变量及软连接**

```shell
exportCPATH="/usr/include/hdf5/include/:/usr/include/hdf5/lib/"
root@ubuntu:/home/cby/Tensorflow/Tensorflow/hdf5-1.10.5#ln -s /usr/include/hdf5/lib/libhdf5.so /usr/lib/libhdf5.so
root@ubuntu:/home/cby/Tensorflow/Tensorflow/hdf5-1.10.5#ln -s /usr/include/hdf5/lib/libhdf5\_hl.so /usr/lib/libhdf5\_hl.so
```shell

**安装whl包**

```shell
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./Cython-0.29.21-py2.py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./h5py-2.10.0-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./grpcio-1.30.0.tar.gz
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./gast-0.2.2.tar.gz
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./opt\_einsum-3.3.0-py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./Keras\_Applications-1.0.8-py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./Keras\_Preprocessing-1.1.2-py2.py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./astor-0.8.1-py2.py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./typing\_extensions-3.7.4.3-py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./zipp-3.4.1-py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./importlib\_metadata-3.10.1-py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./Markdown-3.2.2-py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./tensorboard-1.15.0-py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./wrapt-1.12.1.tar.gz
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./tensorflow\_estimator-1.15.1-py2.py3-none-any.whl
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./termcolor-1.1.0.tar.gz
root@ubuntu:/home/cby/Tensorflow/Tensorflow#pip3.7.5 install ./tensorflow-1.15.0-cp37-cp37m-linux\_aarch64.whl
```shell

**注意：必须依次安装**

**安装Pytorch**

```shell
root@ubuntu:/home/cby/pytorch/Pytorch#pip3.7.5 install ./apex-0.1+ascend-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/pytorch/Pytorch#pip3.7.5 install ./torch-1.5.0+ascend.post2-cp37-cp37m-linux\_aarch64.whl
root@ubuntu:/home/cby/pytorch/Pytorch#pip3.7.5 install ./future-0.18.2.tar.gz
```shell

该文章所配套的软件包关注微信公众号回复 ai 即可获取所需要的所有软件包  

![Linux运维交流社区](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77094ff7a2294266a68d51827856684e~tplv-k3u1fbpfcp-zoom-1.image)

**Linux运维交流社区**

Linux运维交流社区，互联网新闻以及技术交流。

20篇原创内容

公众号

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2db21b727fad415d83915de139e7faa1~tplv-k3u1fbpfcp-zoom-1.image)