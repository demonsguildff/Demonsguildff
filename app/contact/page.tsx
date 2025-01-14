'use client'

import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail } from 'lucide-react'

export default function ContactPage() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:demonsguildff@gmail.com'
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Have questions or want to join our guild? We'd love to hear from you!
                </p>
                <Button
                  onClick={handleEmailClick}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-transform duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </Button>
                <p className="text-sm text-muted-foreground">
                  Our team typically responds within 24 hours.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

