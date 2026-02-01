import Link from "next/link"
import { getAllCategories } from "@/lib/posts"
import { Folder, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Categories",
  description: "블로그 카테고리 목록",
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">
            {categories.length}개의 카테고리
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                <Folder className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {category.title}
                  </h2>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {category.count} posts
                  </span>
                </div>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
                <span className="inline-flex items-center text-sm text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  View posts
                  <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
