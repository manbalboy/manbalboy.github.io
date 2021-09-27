---
layout: post
title:  "[spring] Spring Boot 에 Swagger ui 연동"
comments: true
category: java
tags: spring
image: 
   path: /assets/img/blog/java/spring/img.png
description: >
    Swagger란 개발한 REST API를 편리하게 문서화 해주고, 이를 통해서 관리 및 제 3의 사용자가 편리하게 API를 호출해보고 테스트 할 수 있는 프로젝트이다. 
sitemap: true
---

# [spring] Spring Boot 에 Swagger ui 연동

<!--more-->

* toc
{:toc}

## 1. Swagger 란
Swagger 란 개발한 Rest api를 편리하게 문서화 해주고, 이를 통해서 관리 및 제 3의 사용자가 편리하게 API를 호출해보고 테스트 할 수 있는 프로젝트 이다. 

## 2. Spring Boot에 Swagger-Ui 연동하기
Spring Boot에서는 간단하게 springfox-boot-starter 를 dependencies 에 추가 함으로써 사용할 수 있다.

[Maven Repository 바로가기](https://mvnrepository.com/artifact/io.springfox/springfox-boot-starter/3.0.0)

```
//file: "build.gradle"
plugins {
    id 'org.springframework.boot' version '2.5.5'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.manbalboy'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    // https://mvnrepository.com/artifact/io.springfox/springfox-boot-starter
    implementation group: 'io.springfox', name: 'springfox-boot-starter', version: '3.0.0'

}

test {
    useJUnitPlatform()
}
```

그래이들을 설정 후 프로젝트를 실행 한후 /swagger-ui/ path로 접근하면 swagger 로 접근가능 

## 3. Swagger Annotation
<table class="tableblock frame-all grid-all stretch">
<colgroup>
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
</colgroup>
<thead>
<tr>
<th class="tableblock halign-left valign-top">Annotation</th>
<th class="tableblock halign-left valign-top">Attribute</th>
<th class="tableblock halign-left valign-top">Target Property</th>
<th class="tableblock halign-left valign-top">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">ApiModelProperty</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">value</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">ModelProperty#description</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@ApiModelProperty(value="${property1.description}")</code></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">ApiModelProperty</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">description</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">ModelProperty#description</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@ApiModelProperty(notes="${property1.description}")</code></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">ApiParam</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">value</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Parameter#description</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@ApiParam(value="${param1.description}")</code></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">ApiImplicitParam</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">value</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Parameter#description</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@ApiImplicitParam(value="${param1.description}")</code></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">ApiOperation</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">notes</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Operation#notes</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@ApiOperation(notes="${operation1.description}")</code></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">ApiOperation</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">summary</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Operation#summary</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@ApiOperation(value="${operation1.summary}")</code></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">RequestParam</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">defaultValue</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Parameter#defaultValue</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@RequestParam(defaultValue="${param1.defaultValue}")</code></p></td>
</tr>
</tbody>
<tfoot>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">RequestHeader</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">defaultValue</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Parameter#defaultValue</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">e.g. <code>@RequestHeader(defaultValue="${param1.defaultValue}")</code></p></td>
</tr>
</tfoot>
</table>


## 4.마무리
Swagger의 데모 프로젝트는 다음과 같다 .

[https://github.com/springfox/springfox-demos](https://github.com/springfox/springfox-demos)

