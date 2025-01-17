'use client'

import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { TournamentList } from "@/components/tournament-list"
import { useTournaments } from "@/contexts/tournament-context"

export default function DashboardTournamentsPage() {
  const router = useRouter()
  const { tournaments } = useTournaments()

  const handleRegister = (tournamentId: number) => {
    router.push(`/dashboard/tournaments/edit/${tournamentId}`)
  }

  return (
    <PageTransition>
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Tournaments</h2>
            <p className="text-muted-foreground">
              Manage and organize tournaments
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-gradient-to-r from-red-500 to-orange-500"
            onClick={() => router.push('/dashboard/tournaments/create')}
          >
            Create Tournament
          </Button>
        </motion.div>

        <TournamentList 
          tournaments={tournaments} 
          onRegister={handleRegister}
        />
      </main>
    </PageTransition>
  )
}

