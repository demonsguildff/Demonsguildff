'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { Trophy, Users, Calendar, Activity, Sword, Target } from 'lucide-react'
import { TournamentList } from "@/components/tournament-list"
import { useTournaments } from "@/contexts/tournament-context"

const statsData = [
  { title: "Total Matches", value: "128", icon: Activity },
  { title: "Win Rate", value: "76%", icon: Target },
  { title: "Team Rank", value: "#4", icon: Trophy },
  { title: "Guild Points", value: "1,234", icon: Sword },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function MemberDashboardPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const { tournaments } = useTournaments()

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'member') {
      router.push('/login')
    }
  }, [isAuthenticated, userRole, router])

  return (
    <div className="min-h-screen bg-background">
      <PageTransition>
        <main className="container py-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {statsData.map((stat, index) => (
              <motion.div key={stat.title} variants={item}>
                <Card className="hover:scale-105 transition-transform duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Available Tournaments</h2>
            <TournamentList tournaments={tournaments} />
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

