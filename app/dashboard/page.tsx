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
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Trophy, Users, Calendar, LogOut, Activity, Sword, Target } from 'lucide-react'

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

export default function DashboardPage() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-background">
      <PageTransition>
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
              <h1 className="text-2xl font-bold">Dashboard</h1>
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

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tournaments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Weekly Championship", date: "This Sunday" },
                      { name: "Monthly Finals", date: "Next Week" },
                      { name: "Special Event", date: "In 2 Weeks" }
                    ].map((tournament, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="font-medium">{tournament.name}</div>
                        <div className="text-muted-foreground">{tournament.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Team Members Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Player One", status: "In Game" },
                      { name: "Player Two", status: "Online" },
                      { name: "Player Three", status: "In Practice" }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-muted-foreground">{member.status}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

