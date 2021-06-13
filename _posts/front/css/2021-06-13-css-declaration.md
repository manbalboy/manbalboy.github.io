---
layout: post
title: "[CSS] 선언방식"
comments: true
category: front
tags: css
image: 
   path: /assets/img/blog/css/css.png
description: >
    CSS 선언방식에 대해서 알아본다. 
sitemap: true
---

# \[CSS\] 선언방식


## 1. 개요
CSS작성하고 HTML 문서에 포함시키는 방식은 크게 4가지 방식으로 이루어져 있습니다.

- 내장방식
- 인라인방식
- 링크방식
- @import 방식

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 2. 내장방식
HTML 파일 안에 \<style\> 태그로 스타일을 작성하는 방식

이 방식은 번들링 하지 않는 프로젝트에서는 대부분 HTML, CSS, JS 파일을 나누어 관리하는 것이 일반적 이므로 번들링하지 않는다면 자주 사용되지 않는 방식입니다. 

```html
<style>
  div {
    color : red;
    margin : 20px;
  }
</style>
```


## 3. 인라인방식
요소의 style 속성에 직접 스타일을 작성하는 방식 입니다. 

우선순위상 우선하기 때문에 공통기능에 대해서 따로 파일로 관리하는 경우 변경이 불가능하기 때문에 유지보수에 어려움이 있는 방식입니다. 그렇기 때문에 권장하지 않는 방식입니다. 

```html
<div style="color:red; margin:20px;">
  ...
</div>
```

## 4. 링크방식
link 태그를 이용하여 외부 CSS문서를 가져와서 연결하는 방식입니다. 

실무에서 주로 사용하는 방식으로 대부분의 프로젝트에서 이방식을 사용하고 있습니다. 

```html
<link rel="stylesheet" href="./css/main.css">
```

## 5. @import 방식
CSS 의 @import 규칙으로 CSS 문서 안에서  또 다른 문서를 가져와 연결하는 방식

직렬 방식이기 때문에 연결이 끝나기전까지 적용이 불가.

```html
<link rel="stylesheet" href="./css/main.css">
```

```css
/* file: "main.css" */
@import url("./box.css");

div {
  color : red;
  margin : 20px;
}
```

```css
/* file: "box.css" */
.box {
  background-color: red;
  padding: 20px;
}
```
