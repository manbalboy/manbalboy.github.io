import Link from "next/link"

const samplePosts = [
  {
    slug: "javascript-arrowfn",
    title: "ES6 Arrow Function(화살표 함수)",
    description: "ES6 Arrow Function(화살표 함수)에 대해서 학습하고 알아보자.",
    date: "2021-05-01",
    category: "javascript",
    tags: ["javascript", "es6"],
  },
  {
    slug: "spring-swagger-ui",
    title: "Spring Boot Swagger UI 설정",
    description: "Spring Boot에서 Swagger UI를 설정하는 방법을 알아보자.",
    date: "2021-09-27",
    category: "java",
    tags: ["spring", "java"],
  },
  {
    slug: "vue-composition-api",
    title: "Vue 3 Composition API 시작하기",
    description: "Vue 3의 Composition API를 사용하여 더 나은 코드를 작성하는 방법",
    date: "2021-08-15",
    category: "front",
    tags: ["vue", "javascript"],
  },
  {
    slug: "docker-basics",
    title: "Docker 기초 가이드",
    description: "Docker의 기본 개념과 사용법을 알아보자.",
    date: "2021-07-20",
    category: "it",
    tags: ["docker", "devops"],
  },
]

const categories = [
  { name: "javascript", count: 25 },
  { name: "java", count: 18 },
  { name: "front", count: 15 },
  { name: "it", count: 12 },
  { name: "etc", count: 8 },
]

const tags = [
  "javascript", "vue", "react", "spring", "java", "docker", "css", "html", "node", "typescript"
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function HomePage() {
  return (
    <div className="container max-w-screen-2xl px-4 py-12 mx-auto">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
          Welcome to My Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Frontend & Backend 개발에 대한 이야기를 공유합니다.
          JavaScript, Java, Spring, Vue 등 다양한 기술 스택을 다룹니다.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">최근 포스트</h2>
            <Link href="/blog" className="text-primary hover:underline text-sm">
              모든 글 보기
            </Link>
          </div>
          <div className="space-y-4">
            {samplePosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-lg border border-border/50 bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {post.category}
                  </span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground line-clamp-2 mb-3">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-lg border border-border/50 bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">카테고리</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/categories/${category.name}`}
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted transition-colors"
                >
                  <span className="capitalize">{category.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border/50 bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">태그</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border/50 bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-muted-foreground mb-4">
              안녕하세요! Frontend & Backend 개발자 Hun Jung입니다.
              다양한 기술에 대한 경험과 지식을 공유합니다.
            </p>
            <Link
              href="/about"
              className="text-primary hover:underline text-sm"
            >
              더 알아보기
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
