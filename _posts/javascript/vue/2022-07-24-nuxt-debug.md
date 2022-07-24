---
layout: post
title:  "[Nuxt] VSCODE DEBUG 하기"
comments: true
category: javascript
tags: vue
image:
  path: /assets/img/blog/vue/vue-logo.png
description: >
  VSCODE 에서 NUXT DEBUG 하기 
sitemap: true
---

# [Nuxt] VSCODE 에서 NUXT DEBUG 하기

## 개요
nuxt 개발시 VSCODE 에서 DEBUG 하는 방법에 대해 학습해 보자 

<!--more-->
* toc
{:toc}

NUXT를 개발을 함에 있어 NODE(Server) 와 Client(Browser) 둘다 Debugging 을 해야하며 이에 대해 설명한다. 

## 방법
.vscode 폴더에 launch.json 파일에 다음 소스를 붙여 넣는다. 

```json
{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "chrome",
        "request": "launch",
        "name": "client: chrome",
        "url": "http://localhost:3000",
        "webRoot": "${workspaceFolder}"
      },
      {
        "type": "node",
        "request": "launch",
        "name": "server: nuxt",
        "args": ["dev"],
        "osx": {
          "program": "${workspaceFolder}/node_modules/.bin/nuxt"
        },
        "linux": {
          "program": "${workspaceFolder}/node_modules/.bin/nuxt"
        },
        "windows": {
          "program": "${workspaceFolder}/node_modules/nuxt/bin/nuxt.js"
        }
      }
    ],
    "compounds": [
      {
        "name": "fullstack: nuxt",
        "configurations": ["server: nuxt", "client: chrome"]
      }
    ]
}
```

![debug](/assets/img/blog/vue/2021/07/png1.PNG  "debug"){:.border}


디버그 탭에 가서 디버깅을 시작한다. 