import { getAllPosts } from "@/lib/posts"

const SITE_URL = "https://manbalboy.github.io"

export async function GET() {
  const posts = await getAllPosts()
  
  const rssItems = posts.map((post) => {
    const pubDate = new Date(post.date).toUTCString()
    const link = `${SITE_URL}/blog/${post.slug}`
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
  }).join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Hun Jung Developer Blog</title>
    <link>${SITE_URL}</link>
    <description>항상 부족함을 느끼고 배움을 구하는 노력하는 개발자가 되고싶은 개발자의 기술 블로그입니다.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
