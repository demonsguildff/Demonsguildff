'use client'

import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Users, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SelectTournamentTypePage() {
  const router = useRouter()

  return (
    <PageTransition>
      <main className="container py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Create Tournament</h2>
          <p className="text-muted-foreground">
            Select the type of tournament you want to create
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => router.push('/dashboard/tournaments/create/form?type=members')}
            >
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Members Tournament</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Create a private tournament exclusively for guild members
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => router.push('/dashboard/tournaments/create/form?type=public')}
            >
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Public Tournament</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Create a tournament open to all players
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  )
}

