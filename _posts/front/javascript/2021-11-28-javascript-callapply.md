---
layout: post
title: Javascript 의 call, apply
comments: true
category: front
tags: javascript
image: 
   path: /assets/img/blog/javascript/js.gif
description: >
    Javascript 의 call, apply 를 알아보자
sitemap: true
---

# [JS] JS 의 call, apply


## 1.개요
JS 함수의 호출 방법에는 널리 알려진 () 붙여 호출하는 방법과 이번 포스팅에서 알아볼 
**call(), apply()** 를 사용하여 호출 하는 방법이 있다.

<!--more-->

* toc
{:toc}

## 2.Function.prototype.call()
### 구문
>func.call(thisArg[, arg1[, arg2[, ...]]])

### 매개변수 
- thisArg
  - func 호출에 제공되는 this의 값

- arg1, arg2, ...
  - 객체를 위한 인수.


### 설명
call()은 이미 할당되어있는 다른 객체의 함수/메소드를 호출하는 해당 객체에 재할당할때 사용됩니다. 

this는 현재 객체(호출하는 객체)를 참조합니다. 

메소드를 한번 작성하면 새 객체를 위한 메소드를 재작성할 필요 없이 call()을 이용해 다른 객체에 상속할 수 있습니다.

### 예
#### 1.객체의 생성자 연결에 call 사용

```js
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

#### 2.익명 함수 호출에 call 사용
```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
```

#### 4. 함수 호출 및 this를 위한 문맥 지정에 call 사용 
```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```

#### 5. 첫번째 인수 지정 없이 함수 호출에 call 사용
```js
var sData = 'Wisen';
function display(){
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
```

## 3.Function.prototype.apply()
### 구문
> func.apply(thisArg, [argsArray])

### 매개변수
- thisArg
  - 옵션. func 를 호출하는데 제공될 this 의 값. this 는 메소드에 의해 실제로 보여지는 값이 아닐 수 있음을 유의합니다. 메소드가 non-strict mode 코드의 함수일 경우, null 과 undefined 가 전역 객체로 대체되며, 기본 값은 제한됩니다.

- argsArray
  - 옵션. func 이 호출되어야 하는 인수를 지정하는 유사 배열 객체, 함수에 제공된 인수가 없을 경우 null 또는 undefined. ECMAScript 5 의 시작으로 이러한 인수들은 배열 대신 제네릭 유사 배열 객체로 사용될 수 있습니다. 

### 설명
이미 존재하는 함수를 호출할 때 다른 this 객체를 할당할 수 있습니다. this 는 현재 객체, 호출하는 객체를 참조합니다. apply 를 사용해, 새로운 객체마다 메소드를 재작성할 필요없이 한 번만 작성해 다른 객체에 상속시킬 수 있습니다.

apply 는 지원되는 인수의 타입만 제외하면 call() 과 매우 유사합니다. 인수(파라미터)의 리스트 대신 인수들의 배열을 사용할 수 있습니다. 또한 apply 를 사용해, 배열 리터럴이나 (예, func.apply(this, ['eat', 'bananas']), Array 객체 (예, func.apply(this, new Array('eat', 'bananas'))) 를 사용할 수 있습니다.

argsArray 파라미터를 위한 arguments 를 사용할 수도 있습니다. arguments 는 함수의 지역 변수입니다. 이는 호출된 객체의 지정되지 않은 모든 인수에 대해 사용할 수 있습니다. 따라서, apply 메소드를 사용할 때 호출된 객체의 인수를 알 필요가 없습니다. arguments 를 사용해 모든 인수들을 호출된 객체로 전달할 수 있습니다. 그럼 호출된 객체는 그 인수들을 처리할 수 있게 됩니다.

ECMAScript 5번 째 판의 시작으로, 모든 유사 배열 객체 타입을 사용할 수 있으며, 실제로 이는 프로퍼티 length 와 범위 (0..length-1) 내의 정수 프로퍼티를 갖는 다는 것을 의미합니다. 예를 들면, 이제 NodeList 또는 { 'length': 2, '0': 'eat', '1': 'bananas' } 와 같은 커스텀 객체를 사용할 수 있습니다.


### 예제
#### 1.배열에 배열을 붙이기 위해 apply 사용하기
```js
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```
#### 2. apply 와 내장함수 사용
```js
// min/max number in an array
var numbers = [5, 6, 2, 3, 7];

// using Math.min/Math.max apply
var max = Math.max.apply(null, numbers);
// 이는 Math.max(numbers[0], ...) 또는 Math.max(5, 6, ...)
// 와 거의 같음

var min = Math.min.apply(null, numbers);
/////////////////////////////////////
// vs. simple loop based algorithm
////////////////////////////////////
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
  if (numbers[i] < min) {
    min = numbers[i];
  }
}
```

## 4.참고사이트
- [https://developer.mozilla.org](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
