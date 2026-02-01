"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import Image from "next/image"
import Link from "next/link"

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="prose animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4 mb-4" />
        <div className="h-4 bg-muted rounded w-full mb-4" />
        <div className="h-4 bg-muted rounded w-5/6 mb-4" />
      </div>
    )
  }

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          h1: ({ children, id }) => (
            <h1 id={id} className="scroll-mt-20">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2 id={id} className="scroll-mt-20">
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id} className="scroll-mt-20">
              {children}
            </h3>
          ),
          h4: ({ children, id }) => (
            <h4 id={id} className="scroll-mt-20">
              {children}
            </h4>
          ),
          a: ({ href, children }) => {
            if (href?.startsWith("/")) {
              return (
                <Link href={href} className="text-primary hover:underline">
                  {children}
                </Link>
              )
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {children}
              </a>
            )
          },
          img: ({ src, alt }) => {
            if (!src) return null
            
            // Handle relative paths
            const imageSrc = src.startsWith("/assets") 
              ? src 
              : src.startsWith("http") 
              ? src 
              : `/assets/img${src}`
            
            return (
              <span className="block my-4">
                <img
                  src={imageSrc}
                  alt={alt || ""}
                  className="rounded-lg border border-border max-w-full"
                  loading="lazy"
                />
                {alt && (
                  <span className="block text-center text-sm text-muted-foreground mt-2">
                    {alt}
                  </span>
                )}
              </span>
            )
          },
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match
            
            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-sm" {...props}>
                  {children}
                </code>
              )
            }
            
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-card rounded-lg p-4 overflow-x-auto my-4 border border-border">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
