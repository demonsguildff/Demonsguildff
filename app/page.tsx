'use client'

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import Image from "next/image"
import Link from "next/link"
import { Trophy, Users, Calendar, LogIn } from 'lucide-react'
import { motion } from "framer-motion"

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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex flex-col items-center gap-4 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://i.postimg.cc/Hkd3GctP/DEMONS-NEW-LOGO.jpg"
                  alt="DEMONS GUILD FF Logo"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-primary/50"
                  priority
                />
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text"
              >
                DEMONS GUILD FF
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              >
                Join the elite gaming community. Compete in tournaments, make friends, and become a legend.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/join">
                  <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500">
                    Join Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl"
            >
              {[
                {
                  icon: <Trophy className="h-10 w-10 text-primary mb-4" />,
                  title: "Tournaments",
                  description: "Compete in weekly tournaments with amazing prizes and recognition."
                },
                {
                  icon: <Users className="h-10 w-10 text-primary mb-4" />,
                  title: "Community",
                  description: "Join a thriving community of passionate gamers and make lasting friendships."
                },
                {
                  icon: <Calendar className="h-10 w-10 text-primary mb-4" />,
                  title: "Events",
                  description: "Regular events, training sessions, and community meetups."
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-6">
                      {feature.icon}
                      <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section id="members-login" className="border-t">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="container flex flex-col items-center gap-4 py-8 md:py-12 lg:py-24 text-center"
            >
              <h2 className="text-3xl font-bold md:text-4xl">Welcome Back, Warriors!</h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Access your guild dashboard, participate in tournaments, and connect with your fellow members.
              </p>
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-transform duration-300"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login to Dashboard
                </Button>
              </Link>
            </motion.div>
          </section>
        </main>
      </PageTransition>
      <footer className="border-t py-12 md:py-16">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-lg font-bold">About Us</h3>
              <p className="text-muted-foreground">
                DEMONS GUILD FF is an elite gaming community focused on competitive excellence and team spirit. 
                Founded with a passion for gaming, we've grown into one of the most respected guilds.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Learn More</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">• Regular tournaments with prizes</p>
                <p className="text-muted-foreground">• Professional training sessions</p>
                <p className="text-muted-foreground">• Active community support</p>
                <p className="text-muted-foreground">• Structured progression system</p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} DEMONS GUILD FF. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

