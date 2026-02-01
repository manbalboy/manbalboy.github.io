import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "_posts")

export interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  image?: string
  content: string
}

export interface Category {
  slug: string
  title: string
  description: string
  count: number
}

export interface Tag {
  slug: string
  count: number
}

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath))
    } else if (item.name.endsWith(".md")) {
      files.push(fullPath)
    }
  }
  
  return files
}

function extractSlugFromFilename(filename: string): string {
  // Format: YYYY-MM-DD-slug.md
  const basename = path.basename(filename, ".md")
  const parts = basename.split("-")
  
  if (parts.length >= 4) {
    // Remove date parts (YYYY-MM-DD)
    return parts.slice(3).join("-")
  }
  
  return basename
}

function extractDateFromFilename(filename: string): string {
  const basename = path.basename(filename, ".md")
  const match = basename.match(/^(\d{4}-\d{2}-\d{2})/)
  
  if (match) {
    return match[1]
  }
  
  return new Date().toISOString().split("T")[0]
}

export async function getAllPosts(): Promise<Post[]> {
  const files = getAllMarkdownFiles(postsDirectory)
  
  const posts = files.map((file) => {
    const fileContents = fs.readFileSync(file, "utf8")
    const { data, content } = matter(fileContents)
    
    const slug = extractSlugFromFilename(file)
    const date = extractDateFromFilename(file)
    
    // Handle tags - can be string or array
    let tags: string[] = []
    if (data.tags) {
      if (Array.isArray(data.tags)) {
        tags = data.tags
      } else if (typeof data.tags === "string") {
        tags = data.tags.split(",").map((t: string) => t.trim())
      }
    }
    
    // Extract image path
    let image: string | undefined
    if (data.image?.path) {
      image = data.image.path
    } else if (typeof data.image === "string") {
      image = data.image
    }
    
    return {
      slug,
      title: data.title || slug,
      date,
      category: data.category || "uncategorized",
      tags,
      description: data.description || "",
      image,
      content: processContent(content),
    }
  })
  
  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug) || null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export async function getAllCategories(): Promise<Category[]> {
  const posts = await getAllPosts()
  const categoryMap = new Map<string, { count: number; description: string }>()
  
  // Category descriptions mapping
  const categoryDescriptions: Record<string, { title: string; description: string }> = {
    front: { title: "Frontend", description: "Frontend development with HTML, CSS, JavaScript" },
    javascript: { title: "JavaScript", description: "JavaScript technology study and trends" },
    java: { title: "Java", description: "Java and Spring development" },
    it: { title: "IT", description: "IT infrastructure and general topics" },
    etc: { title: "Etc", description: "Retrospectives and other topics" },
  }
  
  for (const post of posts) {
    const current = categoryMap.get(post.category)
    if (current) {
      current.count++
    } else {
      categoryMap.set(post.category, { count: 1, description: "" })
    }
  }
  
  return Array.from(categoryMap.entries()).map(([slug, data]) => ({
    slug,
    title: categoryDescriptions[slug]?.title || slug,
    description: categoryDescriptions[slug]?.description || "",
    count: data.count,
  }))
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts()
  const tagMap = new Map<string, number>()
  
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    }
  }
  
  return Array.from(tagMap.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getRecentPosts(limit: number = 5): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

function processContent(content: string): string {
  // Remove Jekyll-specific TOC markers
  let processed = content.replace(/\*\s*toc\s*\n\{:toc\}/gi, "")
  
  // Remove <!--more--> markers
  processed = processed.replace(/<!--more-->/gi, "")
  
  // Process Jekyll-style notes
  processed = processed.replace(/\{:.note\}/g, "")
  
  // Process border class on images
  processed = processed.replace(/\{:.border\}/g, "")
  
  return processed.trim()
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
