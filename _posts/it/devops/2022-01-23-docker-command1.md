---
layout: post
title: Docker Image 명령어와 옵션
category: it
tags: devops
comments: true
image: 
   path: /assets/img/blog/it/devops/index.png 
description: >
    Docker 이미지에 관련된 명령어에 대하여 학습한다.
sitemap: true
---

# Docker image 관련 명령어와 옵션


## 1. Docker login
다른 사람들이 개발해 놓은 docker image 를 손쉽게 설치하고 활용할 수 있는 점이 docker 에 큰 장점이다. 

이를 위해서 리눅스 처럼 apt, yum 또는 Node 의 npm 처럼 docker 패키지 시스템이 존재하며 https://hub.docker.com/ 에서 제공된다.

해당 사이트에서 회원가입을 한 후 docker 명령어로 다음과 같이 입력한다. 


```shell
docker login
```

<!--more-->

* toc
{:toc}

!["docker login"](/assets/img/blog/it/devops/2022-01-23/img1.png)

로그인을 한 후 로그아웃을 하고 싶으면 다음 명령어를 입력하면 된다. 

```shell
docker logout
```


## docker search 이미지명
docker 에 원하는 이미지를 검색하는 명령어로 만약 ubuntu 를 검색하고 싶다면 다음 명령어로 검색하면 된다. 
```shell
docker search ubuntu
```

!["docker login"](/assets/img/blog/it/devops/2022-01-23/img2.png)

위와 같이 검색 결과를 얻을 수 있으며 name 사이에 `/` 기호가 있으면 `/` 기준으로 앞에 있는 것이 docker hub 에 이미지를 올린 사용자 ID 로 인식하면 된다. 

또한 검색 갯수 제한을 두고 싶으면 `--limit` 옵션을 넣어 다음과 같이 검색 할 수 있다.

```shell
docker search --limit=3 ubuntu
```


## docker pull 이미지명
search 된 이미지를 확인하고 다운로드하려면 다음과같이 pull 명령어로 docker image 를 다운로드 하면 된다.

```shell
docker pull ubuntu
```

!["img3"](/assets/img/blog/it/devops/2022-01-23/img3.PNG)


## docker images
`docker pull [이미지명]` 명령어로 image를 설치하였다면 다음 명령어로 image 목록을 확인한다. 

```shell
docker images
```

!["img3"](/assets/img/blog/it/devops/2022-01-23/img4.PNG)

이와 같은 역할을 하는 명령어는 여러 방식으로 사용할 수 있는데 다음과 같다.

```shell
docker images 

docker image ls 
```

위의 두개의 명령어는 같은 출력물을 나타낸다. 

여기에서 ImageID 만 뽑아내는 명령어로 자주 쓰이는 명령어는 다음과 같다. 

```shell
docker image ls -q
```

## docker rmi
pull 받은 도커 이미지를 삭제하는 명령어는 다음과 같습니다. 

```shell
docker rmi 이미지ID

docker image rm 이미지 ID
```


