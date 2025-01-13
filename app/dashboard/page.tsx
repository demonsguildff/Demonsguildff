import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/')
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.username}!</h1>
        <p className="text-gray-400 mt-2">Manage your DEMONS GUILD FF account and access exclusive features.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-900 rounded-lg border border-red-900/50">
          <h2 className="text-xl font-bold mb-2">Your Stats</h2>
          <p className="text-gray-400">View your gaming statistics and achievements</p>
        </div>
        
        <div className="p-6 bg-gray-900 rounded-lg border border-red-900/50">
          <h2 className="text-xl font-bold mb-2">Team Events</h2>
          <p className="text-gray-400">Upcoming tournaments and practice sessions</p>
        </div>
        
        <div className="p-6 bg-gray-900 rounded-lg border border-red-900/50">
          <h2 className="text-xl font-bold mb-2">Shop</h2>
          <p className="text-gray-400">Browse and purchase guild merchandise</p>
        </div>
      </div>
    </div>
  )
}

