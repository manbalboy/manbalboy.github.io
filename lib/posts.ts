export interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  image?: string
  content: string
}

export interface Category {
  slug: string
  title: string
  description: string
  count: number
}

export interface Tag {
  slug: string
  count: number
}

// Sample posts data - In production, this would be loaded from MDX files
const samplePosts: Post[] = [
  {
    slug: "javascript-arrowFn",
    title: "ES6 Arrow Function (화살표 함수)",
    date: "2021-05-01",
    category: "front",
    tags: ["javascript"],
    description: "ES6 Arrow Function(화살표 함수)에 대해서 학습하고 알아봅니다.",
    image: "/assets/img/blog/javascript/js.gif",
    content: `## Arrow Function이란?

Arrow Function(화살표 함수)은 ES6에서 도입된 새로운 함수 표현식입니다.

### 기본 문법

\`\`\`javascript
// 기존 함수 표현식
const add = function(a, b) {
  return a + b;
};

// Arrow Function
const add = (a, b) => a + b;
\`\`\`

### 특징

1. **간결한 문법**: 함수를 더 짧게 작성할 수 있습니다.
2. **this 바인딩**: 자신만의 this를 생성하지 않고, 외부 스코프의 this를 사용합니다.
3. **arguments 객체 없음**: rest parameter를 대신 사용합니다.

### 언제 사용하면 좋을까?

- 콜백 함수
- 배열 메서드 (map, filter, reduce 등)
- 간단한 함수 표현

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
\`\`\`
`,
  },
  {
    slug: "spring-swagger-ui",
    title: "Spring Boot Swagger UI 설정하기",
    date: "2021-09-27",
    category: "java",
    tags: ["spring", "java"],
    description: "Spring Boot 프로젝트에서 Swagger UI를 설정하고 API 문서를 자동 생성하는 방법을 알아봅니다.",
    image: "/assets/img/blog/spring/spring.png",
    content: `## Swagger란?

Swagger는 RESTful API를 설계, 빌드, 문서화하기 위한 오픈소스 프레임워크입니다.

### 의존성 추가

\`\`\`xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
\`\`\`

### 설정 클래스

\`\`\`java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.example"))
            .paths(PathSelectors.any())
            .build();
    }
}
\`\`\`

### Swagger UI 접속

설정 완료 후 \`http://localhost:8080/swagger-ui/\`에서 API 문서를 확인할 수 있습니다.
`,
  },
  {
    slug: "vue-composition-api",
    title: "Vue 3 Composition API 완벽 가이드",
    date: "2021-08-15",
    category: "front",
    tags: ["vue", "javascript"],
    description: "Vue 3의 Composition API를 활용한 로직 재사용과 코드 구성 방법을 알아봅니다.",
    content: `## Composition API란?

Composition API는 Vue 3에서 도입된 새로운 API로, 컴포넌트 로직을 더 유연하게 구성할 수 있게 해줍니다.

### setup 함수

\`\`\`javascript
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    onMounted(() => {
      console.log('Component mounted!');
    });

    return { count, doubled, increment };
  }
};
\`\`\`

### reactive vs ref

- **ref**: 단일 값을 반응형으로 만듦
- **reactive**: 객체를 반응형으로 만듦
`,
  },
  {
    slug: "node-express-tutorial",
    title: "Node.js Express 기초 튜토리얼",
    date: "2021-07-20",
    category: "front",
    tags: ["node", "javascript"],
    description: "Node.js와 Express를 사용한 웹 서버 구축 기초를 배워봅니다.",
    content: `## Express.js 시작하기

Express는 Node.js를 위한 빠르고 미니멀한 웹 프레임워크입니다.

### 설치

\`\`\`bash
npm init -y
npm install express
\`\`\`

### 기본 서버

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

### 라우팅

\`\`\`javascript
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/users', (req, res) => {
  // 사용자 생성 로직
});
\`\`\`
`,
  },
  {
    slug: "css-flexbox-guide",
    title: "CSS Flexbox 완벽 정리",
    date: "2021-06-10",
    category: "front",
    tags: ["css", "html"],
    description: "CSS Flexbox 레이아웃의 모든 속성과 사용법을 정리합니다.",
    content: `## Flexbox란?

Flexbox는 1차원 레이아웃 모델로, 요소들을 행이나 열로 정렬하는 데 최적화되어 있습니다.

### 기본 사용법

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

### 주요 속성

| 속성 | 설명 |
|-----|------|
| flex-direction | 주축 방향 설정 |
| justify-content | 주축 정렬 |
| align-items | 교차축 정렬 |
| flex-wrap | 줄바꿈 설정 |

### 자식 요소 속성

\`\`\`css
.item {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
}
\`\`\`
`,
  },
  {
    slug: "typescript-basics",
    title: "TypeScript 시작하기",
    date: "2021-10-05",
    category: "front",
    tags: ["typescript", "javascript"],
    description: "TypeScript의 기본 문법과 타입 시스템을 알아봅니다.",
    content: `## TypeScript란?

TypeScript는 JavaScript의 슈퍼셋으로, 정적 타입을 지원합니다.

### 기본 타입

\`\`\`typescript
let name: string = "Hun";
let age: number = 30;
let isActive: boolean = true;
let items: string[] = ["a", "b", "c"];
\`\`\`

### 인터페이스

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

### 제네릭

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
\`\`\`
`,
  },
]

export async function getAllPosts(): Promise<Post[]> {
  return samplePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug) || null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export async function getAllCategories(): Promise<Category[]> {
  const posts = await getAllPosts()
  const categoryMap = new Map<string, { count: number; description: string }>()
  
  const categoryDescriptions: Record<string, { title: string; description: string }> = {
    front: { title: "Frontend", description: "Frontend development with JavaScript, React, Vue" },
    javascript: { title: "JavaScript", description: "JavaScript technology study and trends" },
    java: { title: "Java", description: "Java and Spring development" },
    it: { title: "IT", description: "IT infrastructure and general topics" },
    etc: { title: "Etc", description: "Retrospectives and other topics" },
  }
  
  for (const post of posts) {
    const current = categoryMap.get(post.category)
    if (current) {
      current.count++
    } else {
      categoryMap.set(post.category, { count: 1, description: "" })
    }
  }
  
  return Array.from(categoryMap.entries()).map(([slug, data]) => ({
    slug,
    title: categoryDescriptions[slug]?.title || slug,
    description: categoryDescriptions[slug]?.description || "",
    count: data.count,
  }))
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts()
  const tagMap = new Map<string, number>()
  
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    }
  }
  
  return Array.from(tagMap.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getRecentPosts(limit: number = 5): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
