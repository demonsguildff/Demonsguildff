'use client'

import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Membership Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By joining DEMONS GUILD FF, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Follow our code of conduct</li>
                  <li>Participate actively in guild activities</li>
                  <li>Maintain good sportsmanship</li>
                  <li>Support fellow guild members</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tournament Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When participating in tournaments:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Follow all game rules</li>
                  <li>Be punctual for matches</li>
                  <li>Report results accurately</li>
                  <li>Respect decisions of administrators</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Code of Conduct</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Members must maintain:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Respectful communication</li>
                  <li>Fair play practices</li>
                  <li>Active participation</li>
                  <li>Positive community contribution</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

