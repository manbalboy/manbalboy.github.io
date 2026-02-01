import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts"
import { MDXContent } from "@/components/mdx-content"
import { TableOfContents } from "@/components/table-of-contents"
import { Giscus } from "@/components/giscus"
import { Button } from "@/components/ui/button"
import { Calendar, Folder, Tag, ArrowLeft, ArrowRight, Clock } from "lucide-react"
import type { Metadata } from "next"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return { title: "Post Not Found" }
  }
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : [],
    },
  }
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  const allPosts = await getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const readingTime = estimateReadingTime(post.content)

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <Link
              href={`/categories/${post.category}`}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Folder className="h-4 w-4" />
              {post.category}
            </Link>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12 border border-border">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content with TOC */}
        <div className="flex gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <MDXContent content={post.content} />
          </div>

          {/* TOC Sidebar */}
          <aside className="hidden xl:block w-64 shrink-0">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {/* Post Navigation */}
        <nav className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex flex-col p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <span className="text-sm text-muted-foreground mb-1 flex items-center">
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Previous Post
                </span>
                <span className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col p-4 rounded-lg border border-border hover:border-primary/50 transition-colors text-right md:col-start-2"
              >
                <span className="text-sm text-muted-foreground mb-1 flex items-center justify-end">
                  Next Post
                  <ArrowRight className="h-3 w-3 ml-1" />
                </span>
                <span className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </nav>

        {/* Comments */}
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-8">Comments</h2>
          <Giscus />
        </section>
      </div>
    </article>
  )
}
