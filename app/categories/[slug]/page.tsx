import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllCategories, getPostsByCategory } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Folder } from "lucide-react"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getAllCategories()
  const category = categories.find((c) => c.slug === slug)
  
  if (!category) {
    return { title: "Category Not Found" }
  }
  
  return {
    title: `${category.title} Posts`,
    description: category.description || `Posts in ${category.title} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getAllCategories()
  const category = categories.find((c) => c.slug === slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(slug)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Categories
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary shrink-0">
            <Folder className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.title}</h1>
            {category.description && (
              <p className="text-muted-foreground">{category.description}</p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              {posts.length}개의 포스트
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
