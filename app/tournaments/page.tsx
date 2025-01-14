'use client'

import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Trophy, Users, Timer } from 'lucide-react'

const tournaments = [
  {
    title: "Weekly Championship",
    date: "Every Sunday",
    time: "8:00 PM",
    prizePool: "$1,000",
    status: "Upcoming",
    participants: "32 Teams",
    description: "Weekly tournament for all guild members with exciting prizes.",
  },
  {
    title: "Monthly Finals",
    date: "Last Saturday",
    time: "6:00 PM",
    prizePool: "$5,000",
    status: "Registration Open",
    participants: "16 Teams",
    description: "Monthly championship event featuring top teams from weekly tournaments.",
  },
  {
    title: "Season Championship",
    date: "December 2024",
    time: "7:00 PM",
    prizePool: "$10,000",
    status: "Coming Soon",
    participants: "64 Teams",
    description: "The biggest tournament of the season with massive prizes.",
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

export default function TournamentsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Tournaments</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compete in our regular tournaments to win prizes and glory for your team.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {tournaments.map((tournament) => (
              <motion.div key={tournament.title} variants={item}>
                <Card className="hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant="outline"
                        className={
                          tournament.status === "Upcoming"
                            ? "bg-green-500/10 text-green-500"
                            : tournament.status === "Registration Open"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-orange-500/10 text-orange-500"
                        }
                      >
                        {tournament.status}
                      </Badge>
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{tournament.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {tournament.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{tournament.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{tournament.prizePool}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{tournament.participants}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500">
                      Register Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

