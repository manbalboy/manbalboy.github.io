---
layout: post
title:  "[Vue] Vue Router"
comments: true
category: javascript
tags: vue
image: 
   path: /assets/img/blog/vue/vue-logo.png 
description: >
    Vue에서 Router를 설치하고 그 사용법에 대해서 알아본다.
sitemap: true
---

# [Vue] Vue Router


## 1. 개요
Vue Router는 Vue.js 공식 플러그인으로 제공되는 라우팅 라이브러리로 SPA 개발에 사용됩니다.

 

Vue에서 SPA(Single Page Application)을 구현 시, 사용자 요청 경로에 따라 해당하는 컴포넌트에 매핑하여 렌더링을 결정해주는 플러그인이 Vue Router입니다.

원래 사용자의 URI Request가 들어오면 서버 즉 백에든에서 Controller가 그 Request에 해당하는 Response로써 정적 파일(html, css, javascript ... )을 보내줍니다.

Vue Router는 프론트앤드에서 요청 URI에 따라 전체 새로운 돔을 변경하는 것이 아니라, 브라우져에서 변화가 있는 부분의 돔을 변경하는 방식입니다.

 

Vue Router는 기본적인 페이지 이동 기능 외에도 다음과 같은 고급 기능을 제공합니다.

- 중첩 라우팅
- 리다이렉션과 앨리어싱
- HTML5 History API와 URL 해시를 이용한 히스토리 관리 (IE9에서는 자동으로 풀백)
- 자동으로 CSS 클래스가 활성화되는 링크 기능
- Vue.js 트랜지션 기능을 이용한 페이지 이동 트랜지션
- 커스터마이즈된 스크롤링
<!--more-->

* toc
{:toc}

## 2. Vue Router 구현하기
이 글 에서는 vue-cli로 vue2를 설치후 기본 프로젝트가 생성됬다는 가정하에 예제를 진행하겠습니다.

Vue Router 는 vue cli 시작할때 설치하거나 다음 명령어로 설치가 가능합니다. 

```bash
 $ npm i vuer-router
```

그리고 폴더 구조는 사실 개인 취향이 반영되겠지만 기본구조는 다음 구조와 같습니다. 

![vue](/assets/img/post/vue/2021/05/04.PNG)

여기에 다음경로에 src/router/index.js 파일을 작성하세요

```js
// file: "/src/router/index.js"

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    //코드 스플릿팅
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

위와 같이 작성하고 이제 Vue 인스턴스에 router 를 등록 하시면 되겠습니다. 

```js
// file: "/src/main.js"

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

여기 까지 하셨으면 router를 사용 할 기본 세팅은 다 마무리가 된 것입니다. 

실제 사용하는 소스코드를 살펴볼까요 App.vue 파일을 살펴보겠습니다. 

```html
<!-- file: "App.vue" -->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
```

위의 코드에서 <b style="color:tomato">\<router-link to="/"\>Home\</router-link\> </b>이부분이 링크로 대체되는 부분이고  <b style="color:tomato">\<router-view /\></b> 이부분이 라우터에 등록된 컴포넌트가 보여지는 부분입니다. 

그럼 터미널에서 다음명령어로 프로젝트를 실행해 보겠습니다. 

```bash
 $ npm run serve
```

실행결과는 다음과 같습니다. 

![vue](/assets/img/post/vue/2021/05/02.gif)

Home과 About 을 클릭 시 전환이 되는 것을 알 수 있습니다. 


## 3.코드 스플릿팅
SPA의 최대 단점은 페이지가 하나이기 대문에 js가 비대해지면 초기 로딩속도가 느려집니다. 이를 피하기위해 코드를 조각내서 컨텐츠를 활용하는 시점에 내려받는것이 효율적일 때가 있습니다. 이를 구현하는 방법이 code-splitting 이라고 불리며 지연된로딩 lazy loading 이라고도 합니다. 

Vue에서 코드스플릿팅하는 기법은 라우터에서 컴포넌트를 작성할때 다음과 같이 입력하면 Webpack 이 코드를 분할하여 빌드 합니다. 

```js
{
	path: 'url 이름',
	component: () => import('컴포넌트 이름')
}
```

위에서 활용했던 예제에서 다음과 같은 코드를 확인해 볼 수 있습니다. 

```js
//코드 스플릿팅
  component: () =>
    import(/* webpackChunkName: "about" */ "../views/About.vue"),
```
이제 어떻게 코드스플리팅을 하는지 감이 오시나요? 

여기서 한가지더 깊게 들어가자면 <b style="color:tomato">/* webpackChunkName: "about" */</b>  이 주석 부분도 의미가 있다는 것 입니다. 코드가 분할 되었을때 이름이 about이름으로 저장해라라는 의미가 있으며 또한 prefetch 기능을 설정할수 있는 주석 코드도 존재합니다. 

주석안에 webpackPrefetch: true 이 구문을 첨가하면 됩니다. 

프리패치기능은 기본 true 이기때문에 전역적으로 해제 하고 싶다고 한다면 
vue.config.js 파일에 다음과 같은 설정을 추가하면 됩니다. 

```js
// file: "vue.config.js"

module.exports = {

    //prefetch 방지 설정 부분
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    },
  
  	configureWebpack:{
    	......
    }
    
    .....
 }
```

프리패치 기능은 미리 브라우저 메모리에 받아다가 실제 사용할떄 넘겨주는 역할인데 상황에 맞게 사용을 하면 성능개선에 큰 도움이 되므로 적절하게 사용하는 것을 추천한다. 


## 4. 정리 
이번 글 에서는 Vue Router 에 대해서 학습하였습니다. Router에 대한 모든 것을 살펴본 것은 아니기 때문에 추가로 네이게이션 가드 router hisory 처리 등을 다시 다뤄볼 예정이며 이 글에서는 아주 기본적인 사용법을 알아 보았습니다. 
