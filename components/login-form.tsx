'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { authenticate } from '@/lib/auth'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    try {
      console.log('Attempting to authenticate with:', { email, password: '****' })
      const user = await authenticate(email, password)
      console.log('Authentication result:', user)
      if (user) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError('Invalid email or password. Please check your credentials and try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(`An unexpected error occurred: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-red-900/50"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login to Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
        
        <p className="text-sm text-gray-400 text-center mt-4">
          Demo credentials:<br />
          Email: demo@example.com<br />
          Password: password
        </p>
        <p className="text-xs text-gray-500 text-center mt-2">
          If you're a developer, check the browser console for more details.
        </p>
      </form>
    </motion.div>
  )
}

