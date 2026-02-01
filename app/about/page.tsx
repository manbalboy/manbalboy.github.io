import { Github, Mail, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Hun Jung - 항상 배움을 구하는 개발자",
}

const skills = {
  Frontend: ["JavaScript", "TypeScript", "React", "Vue.js", "Next.js", "Nuxt.js", "HTML/CSS"],
  Backend: ["Node.js", "Express", "Java", "Spring Boot"],
  DevOps: ["Docker", "Git", "CI/CD"],
  Database: ["MySQL", "PostgreSQL", "MongoDB"],
}

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/manbalboy",
    icon: Github,
  },
  {
    name: "Email",
    href: "mailto:manbalboy@hanmail.net",
    icon: Mail,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/junghunihun",
    icon: Instagram,
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-primary/20">
              <img
                src="/assets/img/profileJH.jpg"
                alt="Hun Jung"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Hun Jung</h1>
            <p className="text-xl text-primary font-medium mb-4">Software Developer</p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              항상 부족함을 느끼고 배움을 구하는 노력하는 개발자가 되고 싶은 개발자입니다.
              새로운 기술을 배우고 공유하는 것을 좋아하며, 
              이 블로그를 통해 학습한 내용을 기록하고 있습니다.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <Button key={social.name} asChild variant="outline" size="icon">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full" />
            About Me
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              웹 개발에 대한 열정을 가지고 있으며, 프론트엔드와 백엔드 모두에서 
              다양한 프로젝트 경험을 쌓아왔습니다. 사용자 경험을 개선하고 
              효율적인 코드를 작성하는 것에 관심이 많습니다.
            </p>
            <p>
              JavaScript/TypeScript 생태계를 중심으로 React, Vue.js, Node.js 등을 
              활용한 개발을 주로 하고 있으며, Java/Spring 기반의 백엔드 개발 경험도 
              보유하고 있습니다.
            </p>
            <p>
              지속적인 학습과 성장을 추구하며, 새로운 기술 트렌드를 빠르게 습득하고 
              실무에 적용하는 것을 좋아합니다.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full" />
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="font-semibold text-lg mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-muted rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full" />
            Contact
          </h2>
          <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-border p-8">
            <p className="text-muted-foreground mb-6">
              프로젝트 협업, 기술 토론, 또는 단순한 대화도 환영합니다.
              언제든지 연락 주세요!
            </p>
            <Button asChild size="lg">
              <a href="mailto:manbalboy@hanmail.net">
                <Mail className="mr-2 h-4 w-4" />
                manbalboy@hanmail.net
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
