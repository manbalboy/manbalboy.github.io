---
layout: post
title:  "[Vue] Vue SFC 방식 개발 환경 요소(Webpack, Babel, Eslint, Prettier)"
comments: true
category: javascript
tags: vue
image: 
   path: /assets/img/blog/vue/vue-logo.png 
description: >
    Vue의 개발 환경요소에 대해서 학습한다.
sitemap: true
---

# [Vue] Vue SFC 방식 개발 환경 요소(Webpack, Babel, Eslint, Prettier)

## 1. webpack
웹팩은 오픈 소스 자바스크립트 모듈 번들러이다. 주로 자바스크립트를 위한 모듈 번들러이지만 호환 플러그인을 포함하는 경우 HTML, CSS, 심지어는 이미지와 같은 프론트엔드 자산들을 변환할 수 있다. 웹팩은 의존성이 있는 모듈을 취하여 해당 모듈을 대표하는 정적 자산들을 생성한다.

> [webpack 공식 사이트 ](https://webpack.js.org/)

<!--more-->
* toc
{:toc}


vue-cli 설치시 웹팩 환경설정은 숨겨져 있으므로 vue.config.js 파일로 대체 관리가 된다. 해당 내용은 다음 사이트에서 확인 할 수 있다.

 ## 2. babel
 Babel은 주로 ECMAScript 2015+ 코드를 이전 JavaScript 엔진에서 실행할 수있는 이전 버전과 호환되는 JavaScript 버전으로 변환하는 데 사용되는 무료 오픈 소스 JavaScript 트랜스 컴파일러.

 Vue에서의 바벨은 webpack이 모듈을 번들링을 동작할 때 ES6+ 코드를 바벨을 이용하여 트랜스 파일링하도록 설정하여 크로스브라우징에 대해 대비한다. preset 이나 babel 의 설정은 babel.config.js 파일에서 이루어진다.

 > [babel 공식 사이트 ](https://babeljs.io/)

 ## 3. Eslint
ESLint는 JavaScript 코드에서 발견 된 문제 패턴을 식별하기위한 정적 코드 분석 도구입니다. ESLint의 규칙은 구성 가능하며 사용자 정의 된 규칙을 정의하고로드 할 수 있습니다. ESLint는 코드 품질과 코딩 스타일 문제를 모두 다룬다. Vue 에서는 Prettier 와 함께 사용되는 것이 일반적이며 설정 파일은 package.json 또는 .eslintrc.js 파일에 설정을 구성할 수 도 있다. [plugin:vue/essential] 스타일을 기본 Lint 셋으로 채택하였다.

 > [eslint 공식 사이트 ](https://eslint.org/)

 ## 4. Prettier 
 Prettier는 javascript, jsx, Vue, typeScript, Css 등을 지원하는 코드 포멧터이다. Vue 에서는 @vue/prettier 모듈을 이용해 룰을 확장하여 Eslint 에 종속적인 확장를 할 수 있도록 설정하였고 Eslint 설정파일에서 rules 영역에 
 prettier/prettier 밑에 prettier 속성을 명명 하여 사용 할 수 있다.

 > [Prettier 공식 사이트 ](https://prettier.io/)