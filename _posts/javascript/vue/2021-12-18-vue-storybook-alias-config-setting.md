---
layout: post
title:  "[Storybook] Vue alias 설정하기"
comments: true
category: javascript
tags: vue
image:
path: /assets/img/blog/vue/vue-logo.png
description: >
"Vue 를 개발하다보면 import 시 ~ 나 @ 와 같이경로를 alias 를 주어 import 하였을 것이다. 그렇다면 storybook 에서는 alias 를 어떻게 설정할 수 있는지 같이 알아보자."
sitemap: true
---

# [Storybook] Vue alias 설정하기

## 개요
Vue 를 개발하다보면 import 시 `~` 나 `@` 와 같이경로를 alias 를 주어 import 하였을 것이다.
그렇다면 storybook 에서는 alias 를 어떻게 설정할 수 있는지 같이 알아보자.

> [webpack 공식 사이트 ](https://webpack.js.org/)
<!--more-->
* toc
  {:toc}

## 방법
방법은 간단하다. alias 는 웹팩 설정을 바꾸어주면 되기 때문에 Storybook 을 어떻한 형태로 설치 하였는지는 각각의 설치 방법에 따라
다르기때문에 이 포스팅에서는 `npx -p @storybook/cli sb init` 명령어로 설치된 storybook 의 setting 방법으로 소개하겠다.

1. .storybook 폴더안에 **main.js** `module.exports` 안에 다음과 같은 내용을 삽입한다.
```js
webpackFinal: async (config, { configType }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../'),
    vue$: 'vue/dist/vue.esm.js'
  };
  // Return the altered config
  return config;
}
```

2. alias 를 사용해 stories.js 파일에서 vue 파일을 import 한다.

```js
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';
export default {
  title: 'Component/Inputs/BaseCheckbox',
  component: BaseCheckbox,
  argTypes: {},
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseCheckbox },
  template: `<BaseCheckbox v-bind="$props">체크박스 라벨</BaseCheckbox> `,
});
export const 기본 = Template.bind({});
기본.args = {};
export const 비활성화 = Template.bind({});
비활성화.args = {
  disabled: true,
};
export const 체크 = Template.bind({});
체크.args = {
  checked: true,
};
```


## 정리
alias 뿐만아니라 webpack config 를 수정하고 싶다면 webpackFinal 하위에 alias 처럼 변경하여 setting 해주면된다.

마지막으로 main.js 의 전체 소스를 공유.

```js
const path = require('path');
module.exports = {
  "stories": [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-jest"
  ],
  webpackFinal: async (config, { configType }) => {
    // scss setting
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    // scss alias setting
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../'),
      vue$: 'vue/dist/vue.esm.js'
    };
    // Return the altered config
    return config;
  },
}
```