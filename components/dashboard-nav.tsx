'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ShoppingBag, LogOut } from 'lucide-react'
import { logout } from '@/lib/auth'

export function DashboardNav() {
  const router = useRouter()
  
  async function handleLogout() {
    await logout()
    router.push('/')
    router.refresh()
  }
  
  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-gray-900 min-h-screen p-4 border-r border-red-900/50"
    >
      <div className="space-y-4">
        <div className="px-4 py-2">
          <h2 className="text-xl font-bold text-red-500">Dashboard</h2>
        </div>
        
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-300 hover:text-red-500 hover:bg-gray-800 rounded-md transition-colors"
          >
            <Home className="mr-3 h-5 w-5" />
            Overview
          </Link>
          
          <Link
            href="/dashboard/shop"
            className="flex items-center px-4 py-2 text-gray-300 hover:text-red-500 hover:bg-gray-800 rounded-md transition-colors"
          >
            <ShoppingBag className="mr-3 h-5 w-5" />
            Shop
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-red-500 hover:bg-gray-800 rounded-md transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </motion.nav>
  )
}

