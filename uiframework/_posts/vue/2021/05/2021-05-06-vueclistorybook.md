---
title: Vue storybook 설치
comments: true
image: 
   path: /assets/img/blog/vue/vue-logo.png 
description: >
    Vue 프로젝트에 storybook을 설치하고 사용해 봅니다.
sitemap: true
---

# [Vue] Vue project에 Storybook 설치

* toc
{:toc}


## 1. 개요
Storybook은 UI 개발 환경이며 동시에 UI 컴포넌트 플레이그라운드라고 할 수 있습니다.

컴포넌트를 관리하고 DOC을 제시해주며 디자인 시스템의 모체가 되기도 합니다.

이번 글에서는 Vue 프로젝트에 Storybook 을 설치하는 방법에 대해서 소개하겠습니다.

## 2. 설치
기존 Vue 프로젝트에 Story book 을 설치하는 방법으로 소개합니다. 

Vue 프로젝트 터미널에서 다음 아래의 명령어를 입력합니다. 
```bash
 $ npx -p @storybook/cli sb init --type vue
```
명령어를 입력하면 설치가 진행됩니다. 

![storybook](/assets/img/blog/vue/2021/05/08.PNG  "storybook"){:.border}

설치가 완료되면 root 경로에 .storybook 폴더와 src/stories 폴더가 생성되는 것을 보실 수 있습니다. 

![storybook](/assets/img/blog/vue/2021/05/09.PNG  "storybook"){:.border}

이렇게 폴더가 생성되면 Package.json 을 살펴 볼까요?

![storybook](/assets/img/blog/vue/2021/05/10.PNG  "storybook"){:.border}

scripts, devDependencies 에 storybook 관련 코드들이 추가 된 것을 보실 수 있습니다.

터미널에 다음 명령어를 입력합니다. 

```bash
$ npm run storybook
```
DevServer 가 로딩된후 localhost:6006 으로 접속하시면 storybook 이 구동 되는 것을 확인 할 수 있습니다.


![storybook](/assets/img/blog/vue/2021/05/11.PNG  "storybook"){:.border}

## 3.정리
Vue프로젝트에 stroybook 을 설치하는 방법에 대해서 알아보았는데요 Storybook 을 활용하면 컴포넌트의 관리가 용이해 집니다. 많은 플러그인들을 사용하면 여러가지 기능들도 추가가 가능하기 때문에 추후에 이런 기능들을 추가하는 방법을 포스팅 해 보겠습니다. 