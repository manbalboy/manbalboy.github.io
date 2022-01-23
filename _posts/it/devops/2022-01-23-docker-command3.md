---
layout: post
title: Docker 기타 명령어와 옵션
category: it
tags: devops
comments: true
image: 
   path: /assets/img/blog/it/devops/index.png 
description: >
    Docker 기타 관련된 명령어에 대하여 학습한다.
sitemap: true
---

# Docker 기타 명령어와 옵션
앞서 Posting 하였던 image , container 명령어 외에 것들을 학습한다. 

## 1. docker 가 사용하고 있는 저장매체 현황을 확인하는 명령어
해당 명령어는 다음과 같다. 

```shell
docker system df
```

!["img6"](/assets/img/blog/it/devops/2022-01-23/img6.png)

<!--more-->

* toc
{:toc}


## 2. Docker가 실행중인 컨테이너 사용 리소스 확인
```shell
docker container stats
```

!["img5"](/assets/img/blog/it/devops/2022-01-23/img5.png)

## 3. 실행중인 컨테이너에 명령 실행 방법
```shell
docker exec 옵션 컨테이너이름 커맨드


# shell 이 다를수 있음
docker exec -it ubuntu /bin/bash

docker exec -it apacheweb2 /bin/sh
```

## 4. 모든 컨테이너 삭제 
```shell
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi -f $(docker images -q)

docker container prune
docker image prune  
docker system prune 
```
