'use client'

import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Search, Crown, Shield, Sword, MessageCircle } from 'lucide-react'
import { useState } from "react"

const members = [
  {
    id: 1,
    name: "DragonSlayer",
    role: "Guild Leader",
    status: "Online",
    rank: "Elite",
    winRate: "78%",
    matches: 234,
    icon: Crown,
  },
  {
    id: 2,
    name: "ShadowHunter",
    role: "Co-Leader",
    status: "In Game",
    rank: "Veteran",
    winRate: "72%",
    matches: 189,
    icon: Shield,
  },
  {
    id: 3,
    name: "PhoenixRider",
    role: "Senior Member",
    status: "Offline",
    rank: "Expert",
    winRate: "68%",
    matches: 156,
    icon: Sword,
  },
  {
    id: 4,
    name: "StormBringer",
    role: "Elite Member",
    status: "Online",
    rank: "Professional",
    winRate: "75%",
    matches: 142,
    icon: Sword,
  },
  {
    id: 5,
    name: "ThunderWolf",
    role: "Member",
    status: "In Practice",
    rank: "Advanced",
    winRate: "65%",
    matches: 98,
    icon: Sword,
  },
  {
    id: 6,
    name: "BlazeMaster",
    role: "Member",
    status: "Online",
    rank: "Intermediate",
    winRate: "62%",
    matches: 76,
    icon: Sword,
  }
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
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.rank.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h2 className="text-3xl font-bold mb-2">Guild Members</h2>
            <p className="text-muted-foreground">
              View and manage guild members
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-[200px]"
              />
            </div>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500">
              Invite Member
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredMembers.map((member) => (
            <motion.div key={member.id} variants={item}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <member.icon className="h-5 w-5 text-primary" />
                    {member.name}
                  </CardTitle>
                  <Badge 
                    variant="outline"
                    className={
                      member.status === "Online"
                        ? "bg-green-500/10 text-green-500"
                        : member.status === "In Game"
                        ? "bg-blue-500/10 text-blue-500"
                        : member.status === "In Practice"
                        ? "bg-orange-500/10 text-orange-500"
                        : "bg-gray-500/10 text-gray-500"
                    }
                  >
                    {member.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium">{member.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rank</p>
                        <p className="font-medium">{member.rank}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="font-medium">{member.winRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Matches</p>
                        <p className="font-medium">{member.matches}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {}}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>
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

