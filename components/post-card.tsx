import Link from "next/link"
import { formatDate } from "@/lib/posts"
import type { Post } from "@/lib/posts"
import { Calendar, Folder, Tag } from "lucide-react"

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? "md:flex-row" : ""
      }`}
    >
      {/* Image */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col flex-1 p-5 ${featured ? "md:p-6" : ""}`}>
        {/* Meta */}
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

        {/* Title */}
        <h3
          className={`font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        {post.description && (
          <p
            className={`text-muted-foreground line-clamp-2 mb-4 ${
              featured ? "text-base" : "text-sm"
            }`}
          >
            {post.description}
          </p>
        )}

        {/* Tags */}
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
            {post.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{post.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
