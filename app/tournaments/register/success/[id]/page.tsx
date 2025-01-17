'use client'

import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2, Trophy, Users, Calendar } from 'lucide-react'
import { useAuth } from "@/contexts/auth-context"
import { useTournaments } from "@/contexts/tournament-context"

export default function RegistrationSuccessPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { isAuthenticated, userRole } = useAuth()
  const { tournaments } = useTournaments()

  const tournament = tournaments.find(t => t.id === parseInt(params.id))

  const handleBackToMain = () => {
    if (!isAuthenticated) {
      router.push('/')
    } else if (userRole === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/member/dashboard')
    }
  }

  if (!tournament) {
    return null
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="text-center">
              <CardHeader>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                </motion.div>
                <CardTitle className="text-2xl mb-2">Registration Successful!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">{tournament.title}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{tournament.date}</p>
                    </div>
                    <div className="text-center">
                      <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="font-medium">{tournament.prizePool}</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Teams</p>
                      <p className="font-medium">{tournament.participants.current}/{tournament.participants.max}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    You will receive further details and instructions via email.
                  </p>
                  <p className="text-muted-foreground">
                    Make sure to join our Discord server for tournament updates.
                  </p>
                </div>

                <Button 
                  onClick={handleBackToMain}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

