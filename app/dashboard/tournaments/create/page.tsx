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

export default function CreateTournamentPage() {
  const router = useRouter()
  const { addTournament } = useTournaments()

  const handleSubmit = async (data: Omit<Tournament, 'id'>) => {
    addTournament(data)
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
          <h2 className="text-3xl font-bold mb-2">Create Tournament</h2>
          <p className="text-muted-foreground">
            Set up a new tournament
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
            <CardDescription>
              Fill in the details for your new tournament
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TournamentForm
              onSubmit={handleSubmit}
              onCancel={() => router.back()}
              submitLabel="Create Tournament"
            />
          </CardContent>
        </Card>
      </main>
    </PageTransition>
  )
}

