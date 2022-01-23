---
layout: post
title: Docker Container 명령어와 옵션
category: it
tags: devops
comments: true
image: 
   path: /assets/img/blog/it/devops/index.png 
description: >
    Docker Container 관련된 명령어에 대하여 학습한다.
sitemap: true
---

# Docker Container 명령어와 옵션

## 1. 컨테이너 생성법
docker 는 image 를 container 로 생성후 그 컨테이너를 구동하는 방식이다. 

해당 명령어는 다음과 같다. 

```shell
docker create 이미지명

docker create --name 컨테이너이름 이미지이름
```

<!--more-->

* toc
{:toc}


## 2. 생성된 Container 와 실행중인 Container 확인 
Docker process 를 확인하는 명령어는 다음과 같다.
```shell
docker ps

docker ps -a

# 컨테이너 ID 만 출력
docker ps -a -q
```

## 3. 컨테이너 실행
컨테이너를 실행하는 명령어은 다음과 같다.
```shell
docker start 컨테이너이름
```

위의 명령어를 입력하면 실행후 바로 즉히 종료되는 것을 볼 수 있는데 이는 표준 입력으로 받을 수 있는 상태만 대기 상태로 계속 실행 되며 그렇지 않다면, 입력을 받을 수 없기 때문에 해당 프로세스가 종료된다. 

## 4. docker run 
해당 이미지를 다운로드하고 컨테이너를 만들고 바로 시작 하도록 하는 명령어 이며 `docker start` 명령어보다 `docker run` 명령어가 많이 사용된다. 


|옵션|설명|
|:-----|:--------|
|-i|컨테이너 입력(STDIN)을 열어놓는 옵션 (주로 -it 로 -i 옵션과 -t 옵션을 함께 사용함)|
|-t|가상 터미널(tty)을 할당하는 옵션|
|--name|컨테이너 이름 설정|
|-d|컨테이너를 백그라운드에서 실행하는 옵션|
|-rm|컨테이너 종료시 컨테이너를 자동으로 삭제하는 옵션|
|-p|호스트와 컨테이너 포트를 연결하는 옵션|
|-v|호스트와 컨테이너 디렉토리를 연결하는 옵션|

## 5. docker 컨테이너 중지 및 종료하기
```shell
# 종료 명령어
docker stop 컨테이너명

# 재시작
docker start 컨테이너명

# 컨테이너 중지
docker pause 컨테이너명

#컨테이너 재시작
docker unpause 컨테이너명
```


## 6. Docker port 바인딩
```shell
docker run -p [hostport]:[containerport] 이미지 이름
```

## 7. Docker Volume mount
```shell
docker run -v [host 바인딩 폴더의 절대경로]:[containerpath] 이미지 이름
```

