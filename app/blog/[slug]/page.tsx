import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts"
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

function MDXContent({ content }: { content: string }) {
  return (
    <div 
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-h1:text-3xl prose-h1:font-bold
        prose-h2:text-2xl prose-h2:font-semibold prose-h2:border-b prose-h2:border-border prose-h2:pb-2
        prose-h3:text-xl prose-h3:font-semibold
        prose-p:leading-7
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:before:content-none prose-code:after:content-none
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-border
        prose-img:rounded-lg prose-img:border prose-img:border-border"
      dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
    />
  )
}

function formatMarkdown(content: string): string {
  let html = content
  
  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`
  })
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 id="$1">$1</h1>')
  
  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
  
  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim())
    if (cells.some(c => c.trim().match(/^-+$/))) {
      return ''
    }
    const row = cells.map(c => `<td class="border border-border px-3 py-2">${c.trim()}</td>`).join('')
    return `<tr>${row}</tr>`
  })
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, '<table class="w-full border-collapse">$&</table>')
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  html = html.replace(/<p><(h[1-3]|ul|ol|pre|table)/g, '<$1')
  html = html.replace(/<\/(h[1-3]|ul|ol|pre|table)><\/p>/g, '</$1>')
  html = html.replace(/<p><\/p>/g, '')
  
  return html
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/^##? .+$/gm) || []
  
  if (headings.length < 2) return null
  
  const toc = headings.map((heading) => {
    const level = heading.startsWith('## ') ? 2 : 1
    const text = heading.replace(/^##? /, '')
    return { level, text, id: text }
  })
  
  return (
    <div className="sticky top-24">
      <h4 className="text-sm font-semibold mb-4 text-muted-foreground">On this page</h4>
      <nav className="space-y-2">
        {toc.map((item, i) => (
          <a
            key={i}
            href={`#${item.id}`}
            className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
              item.level === 2 ? 'pl-4' : ''
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}

function Giscus() {
  return (
    <div className="giscus-wrapper">
      <script
        src="https://giscus.app/client.js"
        data-repo="manbalboy/manbalboy.github.io"
        data-repo-id="MDEwOlJlcG9zaXRvcnkyOTQyNzE1NTQ="
        data-category="Comments"
        data-category-id="DIC_kwDOEYkwEs4CUjHa"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="ko"
        crossOrigin="anonymous"
        async
      />
    </div>
  )
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
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="mb-8">
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          )}

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

        {post.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12 border border-border">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex gap-12">
          <div className="flex-1 min-w-0">
            <MDXContent content={post.content} />
          </div>

          <aside className="hidden xl:block w-64 shrink-0">
            <TableOfContents content={post.content} />
          </aside>
        </div>

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

        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-8">Comments</h2>
          <Giscus />
        </section>
      </div>
    </article>
  )
}
