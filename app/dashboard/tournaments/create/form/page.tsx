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

export default function CreateTournamentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const tournamentType = searchParams.get('type')

  useEffect(() => {
    if (!tournamentType) {
      router.push('/dashboard/tournaments/create/select-type')
    }
  }, [tournamentType, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Tournament Created!",
      description: `Your ${tournamentType} tournament has been created successfully.`,
    })

    setIsLoading(false)
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
          <h2 className="text-3xl font-bold mb-2">
            Create {tournamentType === 'members' ? 'Members' : 'Public'} Tournament
          </h2>
          <p className="text-muted-foreground">
            Fill in the details for your new tournament
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
            <CardDescription>
              Provide the necessary information for your tournament
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tournament Title</Label>
                <Input
                  id="title"
                  placeholder="Enter tournament title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter tournament description"
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maximum Participants</Label>
                  <Select required>
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
                    placeholder="Enter prize pool amount"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rules">Tournament Rules</Label>
                <Textarea
                  id="rules"
                  placeholder="Enter tournament rules and guidelines"
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
                      Creating...
                    </>
                  ) : (
                    "Create Tournament"
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

