'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'
import { useTournaments } from "@/contexts/tournament-context"

interface RegistrationFormData {
  teamName: string
  captain: string
  members: string
  contact: string
}

export default function TournamentRegistrationPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { tournaments, updateTournament } = useTournaments()
  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: '',
    captain: '',
    members: '',
    contact: ''
  })

  const tournament = tournaments.find(t => t.id === parseInt(params.id))

  if (!tournament) {
    return <div>Tournament not found</div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Update tournament participants
    updateTournament(tournament.id, {
      participants: {
        ...tournament.participants,
        current: tournament.participants.current + 1
      },
      registeredTeams: [...tournament.registeredTeams, formData.teamName]
    })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Registration Successful!",
      description: "You have successfully registered for the tournament.",
    })

    setIsLoading(false)
    router.push(`/tournaments/register/success/${tournament.id}`)
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">Tournament Registration</h2>
            <p className="text-muted-foreground">
              Registering for: {tournament.title}
            </p>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
              <CardDescription>
                Please provide accurate information for tournament participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                      placeholder="Enter your team name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain">Team Captain</Label>
                    <Input
                      id="captain"
                      value={formData.captain}
                      onChange={(e) => setFormData(prev => ({ ...prev, captain: e.target.value }))}
                      placeholder="Enter captain's name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="members">Team Members</Label>
                  <Textarea
                    id="members"
                    value={formData.members}
                    onChange={(e) => setFormData(prev => ({ ...prev, members: e.target.value }))}
                    placeholder="List all team members (one per line)"
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information</Label>
                  <Input
                    id="contact"
                    type="email"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="Enter contact email"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </PageTransition>
    </div>
  )
}

