'use client'

import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"
import { TournamentList } from "@/components/tournament-list"
import { useTournaments } from "@/contexts/tournament-context"
import { useAuth } from "@/contexts/auth-context"

export default function TournamentsPage() {
  const { tournaments } = useTournaments()
  const { isAuthenticated } = useAuth()

  // Filter tournaments based on authentication status
  const visibleTournaments = tournaments.filter(tournament => 
    isAuthenticated ? true : tournament.type === 'public'
  )

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Tournaments</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isAuthenticated 
                ? "View all available tournaments and register to compete"
                : "Browse public tournaments and join the competition"}
            </p>
          </motion.div>

          <TournamentList tournaments={visibleTournaments} />
        </main>
      </PageTransition>
    </div>
  )
}

