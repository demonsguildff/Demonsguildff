'use client'

import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Information Collection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We collect information that you provide directly to us when you:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Create an account</li>
                  <li>Participate in tournaments</li>
                  <li>Communicate with other members</li>
                  <li>Contact our support team</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Data Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We use the collected information to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you</li>
                  <li>Organize tournaments</li>
                  <li>Ensure fair play</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information.
                  Your data is encrypted and stored securely on our servers.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

