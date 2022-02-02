---
layout: post
title: Dockerfile 이란 무엇인가?
category: it
tags: devops
comments: true
image: 
   path: /assets/img/blog/it/devops/index.png 
description: >
    Dockerfile 에 대하여 이해하고 이를 작성 할 수 있도록 기본 개념을 이해해 본다.
sitemap: true
---
# Dockerfile 에 대하여

## 개요
`Dockerfile`은 사용자가 이미지를 조합하기 위해 명령줄에서 호출할 수 있는 모든 명령을 포함하는 텍스트 문서이며

사용자는 `docker build` 명령어를 통해 문서를 실행하여 자동화된 이미지를 build 할 수 있다. 

<!--more-->

* toc
{:toc}

## Dockerfile 작성법 
- 텍스트 형태로 작성 됨
- 여러가지 사용 명령 Keyword 를 제공하며 이를 바탕으로 작성한다. 


|   Keyword    | 설명                                                                                |
|:------------:|:----------------------------------------------------------------------------------|
|     FROM     | 새빌드 단계를 초기화 후속 명령에 대한 기본 이미지 다운로드                                                 |
|    LABEL     | 버전 정보, 작성자와 같은 이미지 설명을 작성하기 위한 명령                                                 |
|     RUN      | 쉘 명령을 실행하는 명령                                                                     |
|     CMD      | docker 컨테이너가 시작할 때, 실행하는 쉘 명령을 지정하는 명령.                                           |
|  ENTRYPOINT  | docker 컨테이너가 시작할 때 실행하는 쉘 명령 CMD 와 비슷하지만 다른점은 docker run 시 오버라이딩 되지 않으며 값을 인자로 받음 |
|     ENV      | 환경 변수 지정                                                                          |
|   WORKDIR    | 작업 dir 설정 run 이후에 `docker exec` 명령어로 내부에 접근 시 이 폴더에 위치                            |
|    EXPOSE    | 외부에 노출될 포트설정                                                                      |
|     COPY     | 파일을 복사                                                                            |
|     ADD      | 파일을 복사 하는 명령어로 기존 동일 파일이 있으면 오버라이딩이 안되며 자동으로 압축을 풀어주는 행위를 함                       |
|     ARG      | dockerfile 내에서 사용할 변수지정                                                           |
|     USER     | 시스템 사용자 ID를 지정                                                                    |



### FROM
새 빌드 단계를 초기화하고 후속 명령어에 대한 기본 이미지를 설정합니다. 
FROM 에 설정된 이미지는 모든것을 지정할 수 있으며 
Public Repositories 에서 이미지를 검색후 명시하면 그 베이스 이미지 부터 사용 됩니다.  
```shell
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
```

### LABEL
이미지에 메타데이터를 추가 할 때 사용

```shell
# 기본문법
LABEL <key>=<value> <key>=<value> <key>=<value> ...

# 사용방법
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL description="This text illustrates \
that label-values can span multiple lines."
```

### RUN
현재 이미지 위에 명령어를 실행하여 결과를 커밋하여 새로운 이미지를 반환 다음 단계의 RUN 에 사용 
이미지를 계층화 할 때 사용하는 명령어라고 이해

```shell
# 기본문법
RUN <command> or RUN ["executable", "param1", "param2"]

# 사용 방법
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
RUN ["/bin/bash", "-c", "echo hello"]
```

### CMD
CMD 의 주요 목적은 실행 컨테이너에 대한 기본값을 제공하는 것. 
여러개의 CMD 를 한파일에 작성하면 마지막 항목만 CMD 에 적용됩니다. 

```shell
CMD ["executable","param1","param2"]( exec 형식, 선호하는 형식)
CMD ["param1","param2"]( ENTRYPOINT에 대한 기본 매개변수로 )
CMD command param1 param2( 쉘 형태)
```

### ENTRYPOINT 
CMD 와 비슷하지만 `docker run` 수행 시  해당 command 가 유지 되어 사용되어야 할 때 사용 됩니다. 

```shell
ENTRYPOINT ["executable", "param1", "param2"] or ENTRYPOINT command param1 param2
```

### COPY
COPY 명령은 에서 새 파일이나 디렉토리를 복사 <src> 하여 경로에 있는 컨테이너의 파일 시스템에 추가합니다.

>--chown 기능은 Linux 컨테이너를 빌드하는 데 사용되는 Dockerfile 에서만 지원되며 Windows 컨테이너에서는 작동하지 않습니다. 사용자 및 그룹 소유권 개념은 Linux 와 Windows 간에 변환되지 않으므로 사용자 및 그룹 이름을 ID로 변환하는 데 /etc/passwd 및 /etc/group 를 사용하면 이 기능이 Linux OS 기반 컨테이너에서만 실행 가능하도록 제한됩니다.
```shell
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]

COPY test.txt /absoluteDir/
```
### EXPOSE
EXPOSE 명령은 컨테이너가 런타임에 지정된 네트워크 포트에서 수신 대기함을 Docker 에 알립니다. 포트가 TCP 또는 UDP 에서 수신 대기하는지 여부를 지정할 수 있으며 프로토콜이 지정되지 않은 경우 기본값은 TCP 입니다.

```shell
EXPOSE <port> [<port>/<protocol>...]

EXPOSE 80/udp

# 사용
docker run -p 80:80/tcp -p 80:80/udp ...
```

## Dockerfile 실행법
```shell
# 도커 공식홈페이지 예제
docker build -f /path/to/a/Dockerfile .

# 요약
docker build 옵션 [도커파일 경로]
```
| 옵션  | 설명                                  |
|-----|:------------------------------------|
| -t  | 이미지 태그 설정, 이미지이름:태그 형태로 이미지 name 설정 |
| -f  | 이미지 빌드시 Dockerfile 의 명칭을 명시할 때 사용   |

실행실습
```shell
# docker image name 이  test 이며 버전은 14 버전의 이미지이며 dockerfile 이름은 test_14_dockerfile 이다.
docker build -t test:14 -f test_14_dockerfile ./
```


