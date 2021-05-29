---
layout: post
title: "[JS] 연산자(Operator)"
comments: true
category: front
tags: javascript
image: 
   path: /assets/img/blog/javascript/js.gif
description: >
    연산자의 종류와 사용방법에 대해 학습한다.
sitemap: true
---

# [JS] 연산자(Operator)


## 1.개요
연산자는 산술, 할당, 비교, 논리, 타입, 지수연산 등을 수행할 수 있는 키워드라고 할수 있으며 각각의 문법이 존재한다. 

<!--more-->

* toc
{:toc}

## 2.산술 연산자.
산술 연산자는 수학적 계산을 수행해 새로운 숫자 값을 만든다. 산술 연산이 불가능한 경우 NaN을 반환한다.

|연산자|의미|
|------|---|
|+|덧셈|
|-|뺄셈|
|*|곳셈|
|/|나눗셈|
|%|나머지|
|++|값 증가|
|--|값 감소|


```js
// 단항연산자 

// +의 쓰임세 
// 문자열을 숫자로 변환시킬 때
let x = "1"; // 문자열
x = +x;
console.log( x );  // 1
console.log(typeof x); // number

// -의 쓰임세 
// 문자열을 숫자로 변환시킬 때 부호를 변환할 때
let y = "1"; // 문자열
y = -y;
console.log( y );  // -1
console.log(typeof y); //number

// ++ 연산자 값을 증가시킬 때
let nConsoleVal = x;
console.log(nConsoleVal, x); // 1, 1
nConsoleVal = ++x;
console.log(nConsoleVal, x); // 2, 2
nConsoleVal = x++;
console.log(nConsoleVal, x); // 2, 3

// -- 연산자 값을 감소시킬 때
nConsoleVal = --x;
console.log(nConsoleVal, x); // 2, 2
nConsoleVal = x--;
console.log(nConsoleVal, x); // 2, 1

// 2항 연산자
// +  값을 더할 때 문자열을 더할 때
nConsoleVal = x + y
console.log(nConsoleVal); // 0

nConsoleVal = x + y + "3" + x + y
console.log(nConsoleVal); // 031-1

// - 값을 뺄때
console.log(2 - 1); // 1

// * 값을 곱할때
console.log(2 * 2); // 4

// / 값을 나눌때
console.log(2 / 2); // 1

// % 값 나머지를 구할떄
console.log(5 % 2); // 1
```

위의 예제 를 머릿속으로 상상 해본 후 돌려보세요.

## 3. 할당연산자
할당 연산자는 연산된 값을 변수에 할당하는 역할로 다음과 같다.

|연산자|예|동일표현|
|------|---|------|
|=| x = 5|x=5|
|+=|x += 5| x = x+5| 
|-=|x -= 5| x = x-5|
|\*=| x \*= 5| x = x*5|
|%=|x %= 5| x = x%5|

## 4. 비교연산자
비교연산자는 좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환한다. 

비교연산자에는 동등 비교와 일치비교연산자 , 대소비교연산자가 속해있다.

### 4-1. 동등 비교 
동등비교(==)는 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교한다.

동등비교는 사실 자주 사용하지 않는 편이 좋으며 다음과 같은 패턴들을 알아 두어야 에러가 나지 않는다.

```js
// 비교연산자의 다양한 안티패턴들
console.log('0' == '') // false
console.log(0 == '') // true
console.log(0 == '0') // true
console.log(false == 'false') // false
console.log(false == '0') // true
console.log(false == null) // false
console.log(false == undefined) // false
console.log(null == undefined) // true
```

### 4-2. 일치 비교
일치비교(===)는 타입도 같고 갑도 같은 경우에 한하여 true를 반환
```js
console.log( 0 === '') //false
console.log( 5 === '5') //false
```
일치 비교에서 주의해야할 점은 NaN 비교와 0 비교를 조심하여야한다. 
```js
console.log(NaN === NaN) //false
console.log(0 === -0) //false
```

이를 해결하기 위해서는 isNaN 메서드 또는 Object.is() 메서드를 사용하여 비교하자.

### 4-3. 대소관계 비교 연산자
대소관계 연산자는 좌항과 우항의 비교연산자로 문법은 다음과 같다.
> \>, \<, \>=, \<= 

```js
console.log(2 > 2) // false
console.log(2 > 1) // true
console.log(2 >= 2) // true
console.log(2 < 2) // false
console.log(2 < 3) // true
console.log(2 <= 2) // true
```

### 5. 삼항연산자
삼항 조건 연산자는 조건식의 평가 결과에 따라 반환할 값을 결정한다. 

> 조건식 ? 조건식이 true일 때  : 조건식이 false일 때 

```js
let consoleVal3 = true ? '조건식이 true' : '조건식이 false';
console.log(consoleVal3); 

consoleVal3 = false ? '조건식이 true' : '조건식이 false';
console.log(consoleVal3);
```

### 6. 그 밖에 연산자.
앞서 살펴본 연산자외의 논리연산자 null 병합 연산자, 쉼표(,), 그룹연산자(()), typeof, 지수연산자, new, ?., delete, in 등이 있으니 MDN 사이트나 타 사이트에서 한번 내용을 학습하시는 것을 추천드립니다.

## 7.참고
- [ko.javascript.info](https://ko.javascript.info/nullish-coalescing-operator)
- 모던 자바스크립트 Deep Dive