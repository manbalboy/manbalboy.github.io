---
layout: post
title: "[NODE] node npm의 version 관리 체계"
comments: true
category: javascript
tags: node
last_modified_at: 2021-05-15
image: 
   path: /assets/img/blog/node/logo.png 
description: >
    npm version 관리 체계에 대해서 알아보고 학습해본다.
sitemap: true
---
# [NODE] NODE.js의 npm의 version 관리 체계 SemVer


## 1.개요
node package 들은 버전의 의존관계가 매우 중요하며 버전에 따라서 어플리케이션들이 동작이 안 될 수 있습니다. 

그렇기에 npm 의 버전 체계를 알 필요가 있으므로 npm의 버전 체계에 대해서 학습해 보겠습니다. 

<!--more-->

* toc
{:toc}

## 2.SemVer (Semantic Versioning) 유의적 버저닝
npm 버저닝은 SemVer 를 따르고 있으며 버전형식에 의미를 부여하여 체계적인 버전 관리를 목적으로 합니다. 

SemVer 의 주요 핵심은 다음과 같습니다. 
- 버전의 형식은 \[Major\].\[Minor\].\[Patch\] 형식으로 한다.
- 이전 버전과 호환되지 않는 API 변경은 MAJOR 버전 증가
- 이전 버전과 호환되면서 기능의 변경, 추가된 경우는 MINOR 버전 증가
- 버그 수정은 PATCH 버전 증가

위의 요약을 풀어서 이야기 하자면 다음과 같습니다.

1.0.0 과 같이 3자리의 형식으로 버전이 나누어지며 단순 버그 패치는 Patch 의 버전을 올리고 기능상 추가된 기능이 있으나 하위 호환성이 있을때 Minor 버전을 올리고 하위호환이 되지 않고 대대적인 작업이 추가되었을때는 Major 버전을 올려 관리 합니다.

그렇다면 이것을 왜 알아야 할까요 node project 시 package.json 에는 많은 모듈들이 설치되어있고 npm i 명령어를 통하여 많은 모듈들을 설치 관리 할 수 있습니다. 


package.json 의 내용을 살펴보겠습니다. 
```json
  "dependencies": {
    "express": "^4.17.1",
    "vue": "3.0.1"
  },
  "devDependencies": {
    "nodemon": "~2.0.7"
  }
```

위의 내용을 자세히 보면 각각의 디펜던시에 버저닝이 되어있는 것을 볼 수 있습니다. 

~, ^ 처럼 특문이 붙어있는 것을 볼 수 있는데요 ^는 Major 버전은까지는 고정 하라는 의미이며 ~는 minor 버전까지는 고정하라라는 의미 입니다. 

아무런 표시 없으면 모든 버전을 고정하라는 의미로 해석 하시면 되겠습니다. 

## 3.정리
NODE 에서 버전은 매우 중요하며 서로간의 버전 충돌 문제가 있으며 이러한 버전 체계를 알고 있어야 문제점을 빠르게 파악하는데 도움이 됩니다. 




