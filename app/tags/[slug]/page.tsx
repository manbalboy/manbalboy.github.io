import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllTags, getPostsByTag } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Tag } from "lucide-react"
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
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/tags">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Tags
          </Link>
        </Button>

        {/* Header */}
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

        {/* Related Tags */}
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

        {/* Posts Grid */}
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
