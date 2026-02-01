import Link from "next/link"
import { getRecentPosts, getAllCategories, getAllTags, formatDate } from "@/lib/posts"
import type { Post } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { ArrowRight, Folder, Tag, BookOpen, Github, Mail, Calendar } from "lucide-react"

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? "md:flex-row" : ""
      }`}
    >
      {post.image && (
        <div
          className={`relative overflow-hidden bg-muted ${
            featured ? "md:w-2/5 aspect-video md:aspect-auto" : "aspect-video"
          }`}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className={`flex flex-col flex-1 p-5 ${featured ? "md:p-6" : ""}`}>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.date)}
          </span>
          <Link
            href={`/categories/${post.category}`}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Folder className="h-3 w-3" />
            {post.category}
          </Link>
        </div>

        <h3
          className={`font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        {post.description && (
          <p className={`text-muted-foreground line-clamp-2 mb-4 ${featured ? "text-base" : "text-sm"}`}>
            {post.description}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-border/50">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="relative z-10 inline-flex items-center gap-1 text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts(6)
  const categories = await getAllCategories()
  const tags = await getAllTags()
  const featuredPost = recentPosts[0]
  const otherPosts = recentPosts.slice(1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              <span className="text-primary">Hun Jung</span>
              <br />
              <span className="text-foreground/80">Developer Blog</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              항상 부족함을 느끼고 배움을 구하는 개발자입니다. 
              Frontend, Backend, DevOps 등 다양한 기술에 대한 학습 내용을 기록합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/blog">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Blog
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://github.com/manbalboy" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Post</h2>
          </div>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Recent Posts */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Categories & Tags */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Folder className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Categories</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="font-medium">{category.title}</span>
                  <span className="text-sm text-muted-foreground bg-background px-2 py-0.5 rounded">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Popular Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 15).map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                >
                  #{tag.slug}
                  <span className="text-xs text-muted-foreground">({tag.count})</span>
                </Link>
              ))}
            </div>
            <Button asChild variant="link" size="sm" className="mt-4 p-0">
              <Link href="/tags">
                View all tags
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl border border-border p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              궁금한 점이나 협업 제안이 있으시면 언제든지 연락해 주세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="mailto:manbalboy@hanmail.net">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">
                  About Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
