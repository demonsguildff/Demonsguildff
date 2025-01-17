'use client'

import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from "@/contexts/auth-context"

export default function RegistrationSuccessPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const handleBackToMain = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto"
          >
            <Card className="text-center">
              <CardHeader>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                </motion.div>
                <CardTitle className="text-2xl mb-2">Registration Successful!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Thank you for registering for the tournament. You will receive further details via email.
                </p>
                <Button 
                  onClick={handleBackToMain}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                >
                  Back to Main Menu
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

