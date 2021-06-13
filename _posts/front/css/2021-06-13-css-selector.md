---
layout: post
title: "[CSS] CSS 선택자"
comments: true
category: front
tags: css
image: 
   path: /assets/img/blog/css/css.png
description: >
    CSS 선택자에 대해서 알아본다.
sitemap: true
---

# \[CSS\] CSS 선택자


## 1. 개요
CSS의 선택자의 종류는 크게 5가지 종류가 있습니다.

- 기본
- 복합
- 가상클래스
- 가상요소
- 속성

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 2. 기본
기본 선택자의 종류는 다음과 같습니다. 
- 전체 선택자 (Universal Selector)
- 태그 선택자 (Type Selector)
- 클래스 선택자 (Class Selector)
- 아이디 선택자 (ID Selector)


### 2-1. 전체선택자 
\* 아스타로 표현하며 전체 요소를 지정합니다. 

```css
* {
  color : red;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="YzZRWBe" data-editable="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css selector base Universal Selector">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/YzZRWBe">
  css selector base Universal Selector</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### 2-2. 태그 선택자
태그 네임으로 시작하며 태그를 선택합니다. 

```css
/* li 요소 선택자 */
li {
  color : red;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="bGqQeJJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css selector tag selector">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/bGqQeJJ">
  css selector tag selector</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


### 2-3. 클래스 선택자
\.name 으로 이루어져 있으며 class 안의 속성을 찾습니다. 
```css
/* class 의 이름이 orange 인 요소 선택자 */
.orange {
  color : orange;
}
```
<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="rNyQLXM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css class class selector">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/rNyQLXM">
  css class class selector</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### 2-4. ID 선택자
\#ID 로 검색 
```css
#orange {
  color: orange;
}
```
<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="jOBQMEE" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css selector id">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/jOBQMEE">
  css selector id</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


## 2.복합선택자
복합선택자는 기본선택자를 조합하여 사용하는 선택자 입니다. 종류는 다음과 같습니다. 

- 일치선택자 (Basic Combinator)
- 자식선택자
- 하위(후손)선택자
- 인접 형제 선택자
- 일반 형제 선택자


### 2-1. 일치선택자 (Basic Combinator)
기본선택자1기본선택자2 -> 선택자 1과 선택자 2를 동시에 만족하는 요소를 선택

```css
/* span 태그중 orange 클래스를 가진 태그만 적용 */
span.orange {
  color : red;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="mdWQrVQ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css Basic Combinator">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/mdWQrVQ">
  css Basic Combinator</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


### 2-2. 자식선택자 (child combinator)
기본선택자1 > 기본선택자2 -> 선택자 1의 자식요소 선택

```css
ul > .orange {
  color : red;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="poeQEbg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="child combinator">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/poeQEbg">
  child combinator</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


### 2-3. 하위(후손)선택자 (descendant combinator)
선택자1 선택자2 -> 띄어쓰기가 선택자의 기호이며 하위요소를 선택

```css
div .orange {
  color : red;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="dyvQppK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="descendant combinator">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/dyvQppK">
  descendant combinator</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### 2-4. 인접 형제 선택자 (Adjacent Sibling combinator)
선택자1 + 선택자2 -> 선택자1의 다음 형제 요소 XYZ를 선택 

```css
  .orange + li {
    color : red;
  }
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="bGqQwKV" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Adjacent Sibling combinator">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/bGqQwKV">
  Adjacent Sibling combinator</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### 2-5. 일반 형제 선택자 (General Sibling combinator)
선택자1 ~ 선택자2 -> 선택자1 다음 형제 요소 모두를 선택

```css
.orange ~ li {
  color : red;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="manbalboy" data-slug-hash="dyvQpgw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="General Sibling combinator">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/dyvQpgw">
  General Sibling combinator</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


## 3.가상 클래스 (Pseudo-Classes)
선택자 뒤에 :가상이벤트를 붙이면 특정 이벤트마다 적용 할 스타일을 설정 할 수 있으며, 이를 가상 (추상)클래스라 합니다.

- :link - 방문한적이 없는 링크
- :visited - 방문한 적이 있는 링크
- :hover - 마우스를 롤오버 했을 때
- :active - 마우스를 클릭했을 때
- :focus - 포커스 되었을 때 (input 태그 등)
- :first - 첫번째 요소
- :last - 마지막 요소
- :first-child - 첫번째 자식
- :last-child - 마지막 자식
- :nth-child(2n+1) - 홀수 번째 자식
- :not - 부정선택자


사용법 
```css
.some-box:hover{ background-color: red; }
input.no-border:focus{ border: none }
.container-box:last-child{ margin-right: 0; }
```


<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="manbalboy" data-slug-hash="QWpJGWp" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pseudo-Classes">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/QWpJGWp">
  Pseudo-Classes</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## 4.가상요소(Pseudo-Elements)
가상요소는 document tree에 존재하지 않은 것을 생성할 때 사용하는 것

- ::after
- ::before
- ::first-letter
- ::first-line


<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="manbalboy" data-slug-hash="BaWGQWp" data-editable="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pseudo-Elements">
  <span>See the Pen <a href="https://codepen.io/manbalboy/pen/BaWGQWp">
  Pseudo-Elements</a> by Jung Hun (<a href="https://codepen.io/manbalboy">@manbalboy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


## 4.속성(attribute)
\[속성이름=속성값\] 의 형태로 속성을 가지고 있는 요소 선택

```css
[disabled] {
  color : red;
}
```

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"/>

