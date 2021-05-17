---
layout: post
title: "[NODE] express의 미들웨어(middleware)"
comments: true
category: javascript
tags: node
last_modified_at: 2021-05-15
image: 
   path: /assets/img/blog/node/logo.png 
description: >
    NODE.js의 express의 미들웨어에 대해서 알아보고 학습해본다.
sitemap: true
---
# [NODE] express의 미들웨어(middleware)


## 1.개요
Express는 자체적인 최소한의 기능을 갖춘 라우팅 및 미들웨어 웹 프레임워크이며, Express 애플리케이션은 기본적으로 일련의 미들웨어 함수 호출입니다.

Express에서 다음과 같은 유형의 미들웨어를 사용할 수 있게 구현 되어 있습니다. 

- 어플리케이션 레벨 미들웨어
- 라우터 레벨 미들웨어
- 오류 처리 미들웨어
- 기본 제공 미들웨어
- 써드 파티 미들웨어
<!--more-->

* toc
{:toc}

그럼 각각의 미들웨어를 살펴 보겠습니다.

## 2.어플리케이션 레벨 미들웨어
애플리 케이션 레벨 미들웨어는 다음과 같이 사용됩니다.

```js
const app = express();

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

위의 소스에서 use 안에 있는 함수 가 미들웨어입니다. 

위의 소스구문은 요청이 올 때마다 Time : date 를 찍고 바이패스하는 미들웨어의 역할을 수행합니다. 

그렇다면 특정 경로만 처리해야할 로직이 있다면 어떻게 어플리케이션 레벨에서 미들웨어를 처리할까요 ?


```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});
```

위의 예제는 /user/:id 경로로 호출 될 때 미들웨어가 실행됩니다. 



위와같이 파일을 구성 하였으면 다음 명령어로 서버를 구동시킵니다. 

```bash
 $ npm start 또는 node app.js
```
구동을 시키셨으면 http://localhost:3000/html 경로를 입력 하여서 해당 결과물을 확인합니다. 

![express](/assets/img/post/node/2021/05/98.PNG  "express"){:.border}


## 3.정리
정적자원 서빙은 http 모듈에서 구현하는 것 보다 간단한 메서드로 제공하기 때문에 엄청 구현이 쉬워진것을 볼 수 있습니다. 

여기서 경로와 이러한 것들은 node 내장 모듈을 사용할 것을 권고합니다.
