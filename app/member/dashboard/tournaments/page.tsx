'use client'

import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"
import { TournamentList } from "@/components/tournament-list"
import { useTournaments } from "@/contexts/tournament-context"

export default function MemberTournamentsPage() {
  const { tournaments } = useTournaments()

  return (
    <PageTransition>
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Available Tournaments</h2>
          <p className="text-muted-foreground">
            Browse and register for upcoming tournaments
          </p>
        </motion.div>

        <TournamentList tournaments={tournaments} />
      </main>
    </PageTransition>
  )
}

