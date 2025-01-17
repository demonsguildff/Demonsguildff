'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

interface TournamentFormData {
  title: string
  description: string
  date: string
  time: string
  maxParticipants: string
  prizePool: string
  rules: string
}

export default function EditTournamentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { tournaments, updateTournament } = useTournaments()
  
  const tournamentType = searchParams.get('type')
  const tournamentId = searchParams.get('id')
  
  const tournament = tournaments.find(t => t.id === parseInt(tournamentId || '0'))
  const initialFormData: TournamentFormData = {
    title: tournament?.title || '',
    description: tournament?.description || '',
    date: tournament?.date || '',
    time: tournament?.time || '',
    maxParticipants: tournament?.maxParticipants || '',
    prizePool: tournament?.prizePool || '',
    rules: tournament?.rules || ''
  }

  const [formData, setFormData] = useState<TournamentFormData>(initialFormData)

  useEffect(() => {
    if (!tournamentType || !tournamentId || !tournament) {
      router.push('/dashboard/tournaments/edit/select-type')
    }
  }, [tournamentType, tournamentId, tournament, router])

  useEffect(() => {
    if (tournament) {
      setFormData({
        title: tournament.title || '',
        description: tournament.description || '',
        date: tournament.date || '',
        time: tournament.time || '',
        maxParticipants: tournament.maxParticipants || '',
        prizePool: tournament.prizePool || '',
        rules: tournament.rules || ''
      })
    }
  }, [tournament])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Update tournament in context
    if (tournament) {
      updateTournament(tournament.id, formData)
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Tournament Updated!",
      description: "The tournament has been updated successfully.",
    })

    setIsLoading(false)
    router.push('/dashboard/tournaments')
  }

  if (!tournament) {
    return null
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
            Update the tournament details
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
            <CardDescription>
              Modify the information for your tournament
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tournament Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maximum Participants</Label>
                  <Select 
                    value={formData.maxParticipants}
                    onValueChange={(value) => setFormData({ ...formData, maxParticipants: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select max participants" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8 Teams</SelectItem>
                      <SelectItem value="16">16 Teams</SelectItem>
                      <SelectItem value="32">32 Teams</SelectItem>
                      <SelectItem value="64">64 Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prizePool">Prize Pool</Label>
                  <Input
                    id="prizePool"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rules">Tournament Rules</Label>
                <Textarea
                  id="rules"
                  value={formData.rules}
                  onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                  className="min-h-[100px]"
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
                      Updating...
                    </>
                  ) : (
                    "Update Tournament"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </PageTransition>
  )
}

