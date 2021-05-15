---
layout: post
title: "[NODE] express로 html 서빙"
comments: true
category: javascript
tags: node
last_modified_at: 2021-05-15
image: 
   path: /assets/img/blog/node/logo.png 
description: >
    NODE.js의 express를 사용하여 html파일을 서빙 해보자.
sitemap: true
---
# [NODE] NODE.js의 express의 정적자원 서빙방법


## 1.개요
Node의 express에서 정적자원을 서빙하는 방법에 대해서 학습해봅시다.  

express 에서는 html, css 파일 같은 정적파일을 서빙하기위해 response 객체에 sendFile 이라는 메서드를 제공합니다. 

예제로 사용밥법을 살펴 보겠습니다. 
<!--more-->

* toc
{:toc}

## 2.express의 정적자원 서빙 사용방법 예제
```html
<!-- file: "test.html" -->
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
</head>
<body>
    <h1>Manbalboy</h1>
    <div>express static file 서빙</div>
</body>
</html>
```
html 파일을 작성후 express 서버에 다음과 같이 코드를 작성합니다. 

```js
// file: "app.js"

import express from "express";
import path from 'path';

const app = express();


app.set('port', process.env.PORT || 3000);


app.get('/', (req, res) => {
    res.send('Hello, Express');
});

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, "../static/test.html"));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '에서 server 응답 대기중');
});
```

저는 test.html 을 하위폴더에 static 폴더에 경로를 위치 시켰습니다. 경로는 다음과 같습니다. 

![express](/assets/img/post/node/2021/05/99.PNG  "express"){:.border}

위와같이 파일을 구성 하였으면 다음 명령어로 서버를 구동시킵니다. 

```bash
 $ npm start 또는 node app.js
```
구동을 시키셨으면 http://localhost:3000/html 경로를 입력 하여서 해당 결과물을 확인합니다. 

![express](/assets/img/post/node/2021/05/98.PNG  "express"){:.border}


## 3.정리
정적자원 서빙은 http 모듈에서 구현하는 것 보다 간단한 메서드로 제공하기 때문에 엄청 구현이 쉬워진것을 볼 수 있습니다. 

여기서 경로와 이러한 것들은 node 내장 모듈을 사용할 것을 권고합니다.
