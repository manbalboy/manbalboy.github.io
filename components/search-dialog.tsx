"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface SearchPost {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [posts, setPosts] = React.useState<SearchPost[]>([])
  const [results, setResults] = React.useState<SearchPost[]>([])

  React.useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/search")
        if (res.ok) {
          const data = await res.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Failed to load posts for search:", error)
      }
    }
    if (open && posts.length === 0) {
      loadPosts()
    }
  }, [open, posts.length])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
    setResults(filtered.slice(0, 8))
  }, [query, posts])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] gap-0 p-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="sr-only">Search posts</DialogTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 px-0 text-base"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
        </DialogHeader>
        <div className="border-t border-border">
          {results.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto py-2">
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex flex-col gap-1 px-4 py-3 hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-sm line-clamp-1">{post.title}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {post.description}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                      {post.category}
                    </span>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Start typing to search posts...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
