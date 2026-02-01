import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
      <div className="relative">
        <span className="text-[150px] md:text-[200px] font-bold text-muted/20 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold">Page Not Found</h1>
        </div>
      </div>
      
      <p className="text-muted-foreground mt-4 max-w-md">
        요청하신 페이지를 찾을 수 없습니다. 
        URL을 확인하거나 아래 버튼을 클릭하여 홈으로 이동하세요.
      </p>
      
      <div className="flex gap-4 mt-8">
        <Button asChild variant="outline">
          <Link href="javascript:history.back()">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </Button>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
