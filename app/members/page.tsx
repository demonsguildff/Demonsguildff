'use client'

import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Crown, Shield, Sword, Star } from 'lucide-react'

const members = [
  {
    name: "DragonSlayer",
    role: "Guild Leader",
    status: "Online",
    rank: "Elite",
    achievements: ["Tournament Champion", "Community Leader"],
    icon: Crown,
  },
  {
    name: "ShadowHunter",
    role: "Co-Leader",
    status: "In Game",
    rank: "Veteran",
    achievements: ["Strategy Master", "Team Captain"],
    icon: Shield,
  },
  {
    name: "PhoenixRider",
    role: "Senior Member",
    status: "Online",
    rank: "Expert",
    achievements: ["MVP Player", "Mentor"],
    icon: Star,
  },
  {
    name: "StormBringer",
    role: "Elite Member",
    status: "In Practice",
    rank: "Professional",
    achievements: ["Clutch Player", "Rising Star"],
    icon: Sword,
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

export default function MembersPage() {
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
            <h1 className="text-4xl font-bold mb-4">Our Members</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the elite players who make DEMONS GUILD FF one of the most formidable teams in the game.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {members.map((member) => (
              <motion.div key={member.name} variants={item}>
                <Card className="hover:scale-105 transition-transform duration-300">
                  <CardHeader className="text-center">
                    <member.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <CardTitle>{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {member.role}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`ml-2 ${
                          member.status === "Online" 
                            ? "bg-green-500/10 text-green-500" 
                            : member.status === "In Game" 
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        {member.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-2">Rank: {member.rank}</p>
                      <div className="space-y-1">
                        {member.achievements.map((achievement) => (
                          <p key={achievement}>• {achievement}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

