---
layout: post
title:  "[Nuxt] SSR LOGGER"
comments: true
category: javascript
tags: vue
image:
  path: /assets/img/blog/vue/vue-logo.png
description: >
  운영시 Generate 방식이 아닌 SSR 방식으로 Nuxt 를 구동시 운영 LOG 에 대하여 학습해보자.
sitemap: true
---

# [Nuxt] SSR LOGGER

## 개요
운영시 SSR 방식으로 Nuxt 를 구동시 운영 LOG 에 대하여 학습해보자.

<!--more-->
* toc
{:toc}

운영상에서 LOGGING 은 아주 중요한 부분중 하나이다. 장애시 대응을 하기 위해서 적절한 LOG 를 쌓아야한다.  
또한 이를 위해서 LOG FILE 의 ROTATE 주기를 주어야하며, LOG_LEVEL 또한 고려 대상이다. 

무슨 DATA 를 남길 것인가, 어떠한 형태로 포멧을 남길 것인가도 핵심 사항 중에 한 부분이다.

필자의 생각으로는 Nuxt 에서는 api 서버 역할을 대체하지 않는 이상. 다음의 로그 형태는 갖춰줘야 한다고 생각한다. 

- access log
- error log
- message log (alert, info, debug)
- axios log(api log)

## 방법
log는 Console 표준출력 표준에러 형태로 터미널에 보여지는 것과 보관을 하기위해 파일로 증적을 남겨야한다. 

이를 사용하기 쉽게 개발해 놓은 모듈로 유명한 것이 winston 이라는 모듈이 있다. 이를 래핑 하여 

필자는 `nuxt-logger-winston` 이라는 모듈을 개발하여 npm publish 하였다. 

https://www.npmjs.com/package/nuxt-logger-winston

해당 모듈은 nuxt.hook 에 여러가지 로그들을 설정하여 Console 또는 File 로 남길 수 있도록 래핑하였다.
