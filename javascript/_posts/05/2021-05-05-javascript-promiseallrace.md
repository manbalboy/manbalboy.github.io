---
title: ES6 Promise.all Promise.race
comments: true
image: 
   path: /assets/img/blog/javascript/js.gif
description: >
    Promise.all 과 Promise.race에 대해서 학습한다.
sitemap: true
related_posts:
  - javascript/_posts/04/2021-04-30-javascript-promise.md
---

# [JS] ES6 Promise.all 과 Promise.race

* toc
{:toc}


## 1.개요
이번 포스팅에서는 Promise.all 과 Promise.race 에 대해서 학습하겠습니다. 

Promise에 대해서 학습을 하지 못하신 분들은 아래의 링크로 가셔서 학습을 하신 후에 이글을 읽어 주시길 부탁드립니다. 

링크 : [\[Promise\]](https://manbalboy.github.io/blog/javascript/2021-04-30-javascript-promise/)


## 2.Promise.all
문법은 다음과 같습니다. 

```js
Promise.all([프로미스 객체들(iterator)]);
```

프로미스 객체 여러개를 생성하여, 배열로 만들어 인자로 넣고 <b style="color:tomato">Promise.all</b>을 실행하면, 배열의 모든 프로미스 객체들이 <b style="color:tomato">fulfilled</b> 되었을 때, <b style="color:tomato">then</b> 의 함수가 실행됩니다. then의 함수의 인자로 프로미스 객체들의 <b style="color:tomato">resolve</b> 인자값을 배열로 돌려줍니다.

코드로 살펴 볼까요? 

```js
function foo(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(ms)
    }, ms)
  })
}

Promise.all([foo(1000), foo(2000), foo(3000)]).then(res => {
  console.log(res);
});

```
위의 코드를 실행하면 실행결과는 다음과 같습니다. 

![promise all](/assets/img/blog/javascript/2021/05/07.PNG  "promise all"){:.border}

다시 정리하자면 프로미스를 모두 배열로 인자로 넣고 <b style="color:tomato">Promise.all</b> 을 실행하면 모든 프로미스가 비동기적으로 처리되고 <b style="color:tomato">모두 완료상태</b>일때 <b style="color:tomato">then</b>으로 인자 값이 배열로 넘어오게 됩니다. 

이때 주의해야할 점은 배열안의 <b style="color:tomato">하나의 프로미스라도 reject가 되면 모두 reject가 된다</b>는 점 입니다.

```js
function foo(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      if(ms === 2000) {
        reject(ms);
      }
      resolve(ms)
    }, ms)
  })
}

Promise.all([foo(1000), foo(2000), foo(3000)])
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err)
        });

```
위의 코드를 실행하면 아래의 결과가 나옵니다.

![promise all](/assets/img/blog/javascript/2021/05/08.PNG  "promise all"){:.border}


## 3.Promise.race 
문법은 다음과 같습니다. 

```js
Promise.race([프로미스 객체들(iterator)]);
```

프로미스 객체 여러개를 생성하여, 배열로 만들어 인자로 넣고 <b style="color:tomato">Promise.race</b>을 실행하면, 배열의 모든 프로미스 객체들 중 가장 먼저 <b style="color:tomato">fulfilled</b> 된 것으로, <b style="color:tomato">then</b> 의 함수가 실행됩니다. then의 함수의 인자로 가장 먼저 fulfilled된 프로미스 객체의 <b style="color:tomato">resolve</b> 인자값을 배열로 돌려줍니다.

Promise.all 이랑 비슷하지만 race는 가장 빠른응답을 주는 Promise 에대해서 알고 싶을때 사용 된다.

```js
function foo(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(ms)
    }, ms)
  })
}

Promise.race([foo(1000), foo(2000), foo(3000)]).then(res => {
  console.log(res);
});

```
위의 코드를 실행하면 실행결과는 다음과 같습니다. 

![promise race](/assets/img/blog/javascript/2021/05/09.PNG  "promise race"){:.border}


Promise.race 는 reject가 반환되도 첫번째 fulfilled된 함수가 reject가 반환되지 않으면 온전한 값을 반환한다. 

```js
function foo(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      if(ms === 2000) {
        reject(ms);
      }
      resolve(ms)
    }, ms)
  })
}

Promise.race([foo(1000), foo(2000), foo(3000)])
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err)
        });

```

위의 코드를 실행하면 아래와 같다

![promise race](/assets/img/blog/javascript/2021/05/10.PNG  "promise race"){:.border}


## 4.정리
Promise.all 과 Promise.race 에 대해서 알아보았습니다. all 은 모든 처리가 다 완료되었을때 처리하는 로직일때 사용되고 race는 가장 빠른 처리를 보이는 프로미스로 처리할때 사용됩니다. 


## 4.참고
- [ECMA JS](https://262.ecma-international.org/6.0/ECMA-262.pdfn)
- [http://es6-features.org/](http://es6-features.org/#Constants)