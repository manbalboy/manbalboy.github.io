"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.async = true
    script.crossOrigin = "anonymous"
    
    script.setAttribute("data-repo", "manbalboy/manbalboy.github.io")
    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzNTI1NjA4NjY=")
    script.setAttribute("data-category", "Comments")
    script.setAttribute("data-category-id", "DIC_kwDOFQCHYs4CkVDJ")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "top")
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light")
    script.setAttribute("data-lang", "ko")
    script.setAttribute("data-loading", "lazy")

    ref.current.appendChild(script)
  }, [])

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    )
    if (!iframe) return

    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: resolvedTheme === "dark" ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    )
  }, [resolvedTheme])

  return (
    <div ref={ref} className="giscus" />
  )
}
