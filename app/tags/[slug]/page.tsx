import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllTags, getPostsByTag, formatDate } from "@/lib/posts"
import type { Post } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Tag, Calendar, Folder } from "lucide-react"
import type { Metadata } from "next"

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({ slug: tag.slug }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tags = await getAllTags()
  const tag = tags.find((t) => t.slug === slug)
  
  if (!tag) {
    return { title: "Tag Not Found" }
  }
  
  return {
    title: `#${slug} Posts`,
    description: `Posts tagged with ${slug}`,
  }
}

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

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tags = await getAllTags()
  const tag = tags.find((t) => t.slug === slug)
  
  if (!tag) {
    notFound()
  }
  
  const posts = await getPostsByTag(slug)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/tags">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Tags
          </Link>
        </Button>

        <div className="flex items-start gap-4 mb-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary shrink-0">
            <Tag className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">#{slug}</h1>
            <p className="text-muted-foreground">
              {posts.length}개의 포스트
            </p>
          </div>
        </div>

        {tags.length > 1 && (
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Other Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags
                .filter((t) => t.slug !== slug)
                .slice(0, 10)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tags/${t.slug}`}
                    className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    #{t.slug}
                  </Link>
                ))}
            </div>
          </div>
        )}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts with this tag yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
