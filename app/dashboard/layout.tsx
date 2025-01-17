'use client'

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
const { logout } = useAuth()
const pathname = usePathname()

const menuItems = [
  { title: "Overview", href: "/dashboard" },
  { title: "Tournaments", href: "/dashboard/tournaments" },
  { title: "Users", href: "/dashboard/users" },
  { title: "Members", href: "/dashboard/members" },
  { title: "Hacks", href: "/dashboard/hacks" },
]

return (
  <div className="min-h-screen bg-background">
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://i.postimg.cc/Hkd3GctP/DEMONS-NEW-LOGO.jpg"
            alt="DEMONS GUILD FF Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <Button 
          variant="ghost" 
          onClick={logout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
    <div className="container py-4 border-b">
      <nav className="flex space-x-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
    {children}
  </div>
)
}

