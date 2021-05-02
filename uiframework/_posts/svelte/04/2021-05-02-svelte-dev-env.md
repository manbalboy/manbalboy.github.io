---
title: Svelte Vscode 환경셋팅
comments: true
last_modified_at: 2021-05-02
image: 
   path: /assets/img/blog/svelte/svelte.png
description: >
    Svelte를 학습하기에 Vscode 에 스벨트를 실습할수 있는 환경을 만들자
sitemap: true
---

# Svelte Vscode 환경 셋팅

* toc
{:toc}


## 1.Vscode 설치 
이포스팅에서는 Vscode 설치 방법을 가이드 하지 않습니다. Vscode 가 설치되어 있다는 가정하에 진행 됩니다. 

## 2.Nodejs 설치 
이포스팅에서는 Nodejs 설치 방법을 가이드 하지 않습니다. NodeJs가 설치되어 있다는 가정하에 진행 됩니다. 

## 3.Vscode 터미널 open
단축키 <b style="color:tomato">ctrl + \<shift\> + `</b> 를 눌러 터미널을 활성화 시킵니다. 

![terminal](/assets/img/blog/svelte/2021/05/01.PNG "terminal")

## 3.Node 설치 확인
open 된 터미널에 다음과 같은 명령어를 입력하세요

```bash
 $ node -v
 $ npm -v
```
위의 명령어를 입력하면 아래와 같은 결과가 나옵니다. version 은 설치 버전에 따라 값이 다를수 있습니다.
![node v](/assets/img/blog/svelte/2021/05/02.PNG "node v")

## 4.npx degit sveltejs/template [프로젝트명]
터미널에 다음과 같은 명령어를 입력한다.

```bash
# 여기서 start-svelte는 원하는 프로젝트 명
$ npx degit sveltejs/template start-svelte
```

위의 명령어의 결과는 아래와 같다 

![npx](/assets/img/blog/svelte/2021/05/03.PNG "npx")

명령어가 시작되면 폴더에 파일이 아래와 같이 생성된다.

![svelte](/assets/img/blog/svelte/2021/05/04.PNG "svelte")

```bash
 $ cd [프로젝트명]
```

프로젝트명으로 터미널을 이동하세요

## 5.npm i 명령을 사용하여 모듈을 install 하세요
```bash
$ npm i
```
![svelte](/assets/img/blog/svelte/2021/05/05.PNG "svelte")

위와같이 npm i 명령어를 입력하면 모듈들이 node_modules 라는 폴더에 설치가 됩니다. 


## 6.Vscode Svelte plugin 설치 (Svelte for VS Code)
![svelte](/assets/img/blog/svelte/2021/05/06.PNG "svelte")

위의 그림과같은 플러그인을 설치합니다.


## 7.Svelte 실행 
터미널에 아래의 명령어를 입력하세요

```bash
$ npm run dev
```
![svelte](/assets/img/blog/svelte/2021/05/07.PNG "svelte")

위의 그림과같이 빌드가 완료되면
<b style="color:tomato">localhost:5000</b>으로 접속해 보세요 

![svelte](/assets/img/blog/svelte/2021/05/08.PNG "svelte")

위와 같은 화면이 표출된다면 정상적으로 설치가 된 것입니다.



## 8.정리
이 포스팅은 어느정도 npm 이나 Vscode 를 다뤄본 사람들입장에서 쓴 가이드 글입니다. 이해가 가지 않는다면 node 와 그외의 기본지식들을 학습하고 시작하시는 것을 추천드립니다.