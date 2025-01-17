import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="https://i.postimg.cc/Hkd3GctP/DEMONS-NEW-LOGO.jpg" 
            alt="DEMONS GUILD FF Logo" 
            width={40} 
            height={40}
            className="rounded-full"
          />
          <span className="hidden font-bold sm:inline-block">
            DEMONS GUILD FF
          </span>
        </Link>
        
        <div className="flex items-center">
          <nav className="hidden md:flex items-center justify-center space-x-16 mr-8">
            <Link href="/members" className="text-sm font-medium transition-colors hover:text-primary">
              Members
            </Link>
            <Link href="/tournaments" className="text-sm font-medium transition-colors hover:text-primary">
              Tournaments
            </Link>
            <Link href="/join" className="text-sm font-medium transition-colors hover:text-primary">
              Join Guild
            </Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-transform duration-300">
                Login
              </Button>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader className="text-center mb-8">
                <SheetTitle className="text-xl font-bold">DEMONS GUILD FF</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col items-center space-y-8">
                <Link 
                  href="/" 
                  className="text-lg font-medium transition-colors hover:text-primary hover:scale-105 transform"
                >
                  Home
                </Link>
                <Link 
                  href="/members" 
                  className="text-lg font-medium transition-colors hover:text-primary hover:scale-105 transform"
                >
                  Members
                </Link>
                <Link 
                  href="/tournaments" 
                  className="text-lg font-medium transition-colors hover:text-primary hover:scale-105 transform"
                >
                  Tournaments
                </Link>
                <Link 
                  href="/join" 
                  className="text-lg font-medium transition-colors hover:text-primary hover:scale-105 transform"
                >
                  Join Guild
                </Link>
                <Link 
                  href="/login" 
                  className="w-full"
                >
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-transform duration-300">
                    Login
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

