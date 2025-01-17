'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticateUser } from '@/lib/firebase'

type UserRole = 'admin' | 'member' | null

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRole
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const router = useRouter()

  const login = async (username: string, password: string) => {
    try {
      const { success, role } = await authenticateUser(username, password)
      
      if (success && role) {
        setIsAuthenticated(true)
        setUserRole(role)
        
        // Set auth cookie
        document.cookie = `auth=true; path=/; max-age=86400` // 24 hours
        
        // Redirect based on role
        if (role === 'admin') {
          router.push('/dashboard')
        } else {
          router.push('/member/dashboard')
        }
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    // Clear auth cookie
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

