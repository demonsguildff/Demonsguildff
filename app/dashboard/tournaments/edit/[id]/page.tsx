'use client'

import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { motion } from "framer-motion"
import { TournamentForm } from "@/components/tournament-form"
import { useTournaments } from "@/contexts/tournament-context"
import type { Tournament } from "@/contexts/tournament-context"

export default function EditTournamentPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { tournaments, updateTournament } = useTournaments()
  
  const tournament = tournaments.find(t => t.id === parseInt(params.id))

  if (!tournament) {
    router.push('/dashboard/tournaments')
    return null
  }

  const handleSubmit = async (data: Omit<Tournament, 'id'>) => {
    updateTournament(tournament.id, data)
    router.push('/dashboard/tournaments')
  }

  return (
    <PageTransition>
      <main className="container py-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Edit Tournament</h2>
          <p className="text-muted-foreground">
            Update tournament details
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
            <CardDescription>
              Modify the tournament information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TournamentForm
              initialData={tournament}
              onSubmit={handleSubmit}
              onCancel={() => router.back()}
              submitLabel="Update Tournament"
            />
          </CardContent>
        </Card>
      </main>
    </PageTransition>
  )
}

