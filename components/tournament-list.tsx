'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users, Timer, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/contexts/auth-context"
import type { Tournament } from "@/contexts/tournament-context"

interface TournamentListProps {
  tournaments: Tournament[]
  onRegister?: (tournamentId: number) => void
}

export function TournamentList({ tournaments, onRegister }: TournamentListProps) {
  const router = useRouter()
  const { userRole } = useAuth()

  const handleRegister = (tournamentId: number) => {
    if (onRegister) {
      onRegister(tournamentId)
    } else {
      const basePath = userRole === 'admin' 
        ? '/dashboard/tournaments' 
        : userRole === 'member'
        ? '/member/dashboard/tournaments'
        : '/tournaments'
      router.push(`${basePath}/register/${tournamentId}`)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((tournament) => (
        <Card key={tournament.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              {tournament.title}
            </CardTitle>
            <Badge 
              variant="outline"
              className={
                tournament.status === "Registering"
                  ? "bg-green-500/10 text-green-500"
                  : tournament.status === "In Progress"
                  ? "bg-blue-500/10 text-blue-500"
                  : "bg-orange-500/10 text-orange-500"
              }
            >
              {tournament.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <p className="text-muted-foreground">
                {tournament.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tournament.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tournament.prizePool}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {`${tournament.participants.current}/${tournament.participants.max} Teams`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Ends: {tournament.registrationEnds}</span>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => handleRegister(tournament.id)}
                disabled={tournament.status === "In Progress" || tournament.status === "Completed"}
              >
                {tournament.status === "In Progress" ? (
                  "Tournament in Progress"
                ) : tournament.status === "Completed" ? (
                  "Tournament Completed"
                ) : (
                  <>
                    {userRole === 'admin' ? 'Edit Tournament' : 'Register Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

