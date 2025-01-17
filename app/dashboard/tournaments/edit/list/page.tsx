'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Search, Calendar, Trophy, Users, Edit } from 'lucide-react'

const membersTournaments = [
  {
    id: 1,
    title: "Weekly Championship",
    date: "Sunday, 8:00 PM",
    prizePool: "$1,000",
    status: "Upcoming",
    participants: "16/32",
  },
  {
    id: 2,
    title: "Guild Practice Tournament",
    date: "Saturday, 6:00 PM",
    prizePool: "$500",
    status: "In Progress",
    participants: "8/16",
  },
]

const publicTournaments = [
  {
    id: 1,
    title: "Open Championship",
    date: "Next Sunday, 8:00 PM",
    prizePool: "$2,000",
    status: "Registration Open",
    participants: "45/64",
  },
  {
    id: 2,
    title: "Rookie Tournament",
    date: "Saturday, 4:00 PM",
    prizePool: "$300",
    status: "Upcoming",
    participants: "12/32",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function TournamentListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tournamentType = searchParams.get('type')
  const [searchQuery, setSearchQuery] = useState("")

  const tournaments = tournamentType === 'members' ? membersTournaments : publicTournaments
  
  const filteredTournaments = tournaments.filter(tournament =>
    tournament.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageTransition>
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {tournamentType === 'members' ? 'Members' : 'Public'} Tournaments
            </h2>
            <p className="text-muted-foreground">
              Select a tournament to edit
            </p>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTournaments.map((tournament) => (
            <motion.div key={tournament.id} variants={item}>
              <Card 
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => router.push(`/dashboard/tournaments/edit/form?type=${tournamentType}&id=${tournament.id}`)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">
                    {tournament.title}
                  </CardTitle>
                  <Badge 
                    variant="outline"
                    className={
                      tournament.status === "Registration Open"
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
                        <span className="text-sm">{tournament.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Edit</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </PageTransition>
  )
}

