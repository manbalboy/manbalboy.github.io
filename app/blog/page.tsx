import { getAllPosts, getAllCategories, formatDate } from "@/lib/posts"
import type { Post } from "@/lib/posts"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Calendar, Folder, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog",
  description: "모든 블로그 포스트를 확인하세요.",
}

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

const POSTS_PER_PAGE = 12

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {post.image && (
        <div className="relative overflow-hidden bg-muted aspect-video">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
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

        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        {post.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
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

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentCategory = params.category || "all"
  const currentPage = parseInt(params.page || "1", 10)
  
  const allPosts = await getAllPosts()
  const categories = await getAllCategories()
  
  const filteredPosts = currentCategory === "all"
    ? allPosts
    : allPosts.filter((post) => post.category === currentCategory)
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground">
          {filteredPosts.length}개의 포스트
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
        <Link
          href="/blog"
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            currentCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              currentCategory === category.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {category.title} ({category.count})
          </Link>
        ))}
      </div>

      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?${currentCategory !== "all" ? `category=${currentCategory}&` : ""}page=${currentPage - 1}`}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              Previous
            </Link>
          )}
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/blog?${currentCategory !== "all" ? `category=${currentCategory}&` : ""}page=${page}`}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {page}
              </Link>
            ))}
          </div>
          
          {currentPage < totalPages && (
            <Link
              href={`/blog?${currentCategory !== "all" ? `category=${currentCategory}&` : ""}page=${currentPage + 1}`}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
