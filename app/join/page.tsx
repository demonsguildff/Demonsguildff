'use client'

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"
import { Shield, Users, Trophy, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const benefits = [
  {
    title: "Elite Community",
    description: "Join a community of dedicated players",
    icon: Users,
  },
  {
    title: "Tournament Access",
    description: "Participate in exclusive tournaments",
    icon: Trophy,
  },
  {
    title: "Professional Support",
    description: "Get guidance from experienced players",
    icon: Shield,
  },
]

export default function JoinPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    })

    setIsLoading(false)
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Join DEMONS GUILD FF</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take your gaming to the next level by joining one of the most prestigious gaming communities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <benefit.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>Guild Application Form</CardTitle>
                <CardDescription>
                  Please fill out the form below to apply for membership.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ingameName">In-game Name</Label>
                      <Input 
                        id="ingameName" 
                        placeholder="Your in-game name"
                        required
                        className="transition-all duration-300 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="uid">Player UID</Label>
                      <Input 
                        id="uid" 
                        placeholder="Your player UID"
                        required
                        className="transition-all duration-300 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discord">Discord Username</Label>
                    <Input 
                      id="discord" 
                      placeholder="username#0000"
                      required
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rank">Current Rank</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your rank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bronze">Bronze</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="diamond">Diamond</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                        <SelectItem value="grandmaster">Grandmaster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Gaming Experience</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="3-plus">3+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Why do you want to join?</Label>
                    <Textarea 
                      id="reason"
                      placeholder="Tell us why you'd like to join DEMONS GUILD FF..."
                      required
                      className="min-h-[100px] transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">Notable Achievements</Label>
                    <Textarea 
                      id="achievements"
                      placeholder="List any tournament wins, rankings, or other achievements..."
                      className="min-h-[100px] transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-transform duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
      <Toaster />
    </div>
  )
}

