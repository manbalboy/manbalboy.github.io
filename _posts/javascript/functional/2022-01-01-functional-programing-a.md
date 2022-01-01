---
layout: post
title:  "[함수형 프로그래밍] 일급 함수와, 고차 함수"
comments: true
category: javascript
tags: functional
image: 
    path: /assets/img/post/js/functional.jpeg
description: >
    일급함수와 고차 함수의 개념을 알아본다.
sitemap: true
---

# [함수형 프로그래밍] 일급 함수와, 고차 함수


## 1. 개요
함수형 프로그래밍이란 함수적인 접근 방법으로 문제 해결을 하기 위하여 만들어졌습니다.
**순수 함수**를 작성하여 숨겨진 입력이나 출력을 최대한 제거하여 코드 대부분이 단지 입력과 출력의 관계를 기술하게끔 하는것을 말합니다.
물론 대부분의 프로그램은 반환 값을 얻기 위해서가 아닌 어떤 동작을 하기 위한 경우도 있기 때문에 가능한 모든 곳에서 철저하게 통제 해야 합니다.

<!--more-->

* toc
{:toc}

## 2. 함수형 프로그래밍의 중요 키워드 
함수형 프로그래밍의 중요 키워드는 많은 키워드 들이 있지만 제일 중요한 키워드는 순수함수, 일급함수, 고차함수 라고 생각되며 
이 포스팅에서는 일급함수, 고차함수에 의미에대해 파악해 보겠다. 

## 3. 일급함수
일급함수는 함수를 값으로 다룰수 있어야 일급함수로 불릴수 있으며 
이는 함수를 다른 함수에 메개변수로 제공하거나 함수가 함수를 반환할 수 있어야하면 변수에도 할당할 수 있어야 한다.

```js
// 변수에 함수할당
const foo = function() {
  console.log("foobar");
}
// 변수를 사용해 호출
foo();
```

```js
// 함수를 인자로 전달
function sayHello() {
  return "Hello, ";
}
function greeting(helloMessage, name) {
  console.log(helloMessage() + name);
}
// `sayHello`를 `greeting` 함수에 인자로 전달
greeting(sayHello, "JavaScript!");
```

## 4. 고차함수
함수를 값으로 다루는 함수 함수를 값으로 반환하는 함수를 고차 함수라고 한다. 

```js
function sayHello() {
   return function() {
      console.log("Hello!");
   }
}
```



