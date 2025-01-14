'use client'

import { PageTransition } from "@/components/page-transition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Shield, Lock, Zap } from 'lucide-react'

const hacks = [
  {
    title: "Anti-Cheat Protection",
    description: "Learn about our anti-cheat measures and how to stay protected.",
    icon: Shield,
  },
  {
    title: "Account Security",
    description: "Best practices for keeping your account secure.",
    icon: Lock,
  },
  {
    title: "Performance Tips",
    description: "Legitimate ways to improve your gameplay performance.",
    icon: Zap,
  },
]

export default function HacksPage() {
  return (
    <PageTransition>
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Security & Performance</h2>
            <p className="text-muted-foreground">
              Stay informed about security measures and legitimate performance improvements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {hacks.map((hack, index) => (
              <motion.div
                key={hack.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <hack.icon className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle className="text-xl">{hack.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{hack.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </PageTransition>
  )
}

