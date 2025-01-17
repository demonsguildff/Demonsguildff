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
import { Trophy, Users, Calendar, Activity, Shield, Settings, Database, UserPlus } from 'lucide-react'
import Link from 'next/link'

const adminControls = [
  {
    title: "User Management",
    description: "Manage users and administrators",
    icon: Users,
    href: "/dashboard/users",
    color: "text-blue-500"
  },
  {
    title: "Tournament Control",
    description: "Create and manage tournaments",
    icon: Trophy,
    href: "/dashboard/tournaments",
    color: "text-yellow-500"
  },
  {
    title: "Member Profiles",
    description: "View and manage member profiles",
    icon: UserPlus,
    href: "/dashboard/members",
    color: "text-green-500"
  },
  {
    title: "Security Settings",
    description: "Manage system security",
    icon: Shield,
    href: "/dashboard/hacks",
    color: "text-red-500"
  },
  {
    title: "System Settings",
    description: "Configure system parameters",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-purple-500"
  },
  {
    title: "Database Management",
    description: "Manage application data",
    icon: Database,
    href: "/dashboard/database",
    color: "text-orange-500"
  },
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
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-background">
      <PageTransition>
        <main className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">Admin Control Panel</h2>
            <p className="text-muted-foreground">
              Manage all aspects of your gaming community
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {adminControls.map((control) => (
              <motion.div key={control.title} variants={item}>
                <Link href={control.href}>
                  <Card className="hover:scale-105 transition-transform duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-bold">
                        {control.title}
                      </CardTitle>
                      <control.icon className={`h-6 w-6 ${control.color}`} />
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{control.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

