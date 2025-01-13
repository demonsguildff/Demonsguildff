'use server'

import { cookies } from 'next/headers'

type User = {
  id: string
  username: string
  email: string
}

// This is a mock authentication function. In production, you would use a real authentication system
export async function authenticate(email: string, password: string): Promise<User | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock validation - in production, you would check against a real database
  if (email === 'demo@example.com' && password === 'password') {
    const user = {
      id: '1',
      username: 'DemoUser',
      email: 'demo@example.com'
    }
    
    // Set auth cookie
    cookies().set('auth', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    return user
  }
  
  return null
}

export async function getCurrentUser(): Promise<User | null> {
  const authCookie = cookies().get('auth')
  if (!authCookie) return null
  
  try {
    return JSON.parse(authCookie.value) as User
  } catch {
    return null
  }
}

export async function logout() {
  cookies().delete('auth')
}

