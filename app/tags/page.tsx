import Link from "next/link"
import { getAllTags } from "@/lib/posts"
import { Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tags",
  description: "블로그 태그 목록",
}

export default async function TagsPage() {
  const tags = await getAllTags()
  
  // Calculate font size based on count
  const maxCount = Math.max(...tags.map((t) => t.count))
  const minCount = Math.min(...tags.map((t) => t.count))
  
  function getTagSize(count: number): string {
    if (maxCount === minCount) return "text-base"
    
    const ratio = (count - minCount) / (maxCount - minCount)
    
    if (ratio > 0.75) return "text-2xl font-bold"
    if (ratio > 0.5) return "text-xl font-semibold"
    if (ratio > 0.25) return "text-lg font-medium"
    return "text-base"
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Tags</h1>
          <p className="text-muted-foreground">
            {tags.length}개의 태그
          </p>
        </div>

        {/* Tag Cloud */}
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all",
                  getTagSize(tag.count)
                )}
              >
                <Tag className="h-4 w-4" />
                {tag.slug}
                <span className="text-xs text-muted-foreground ml-1">({tag.count})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tag List */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">All Tags</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {tag.slug}
                </span>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
