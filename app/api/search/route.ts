import { getAllPosts } from "@/lib/posts"
import { NextResponse } from "next/server"

export async function GET() {
  const posts = await getAllPosts()
  
  // Return simplified post data for search
  const searchData = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
  }))

  return NextResponse.json(searchData)
}
