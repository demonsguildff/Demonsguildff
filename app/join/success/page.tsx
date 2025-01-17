'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2, Search } from 'lucide-react'

export default function ApplicationSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const trackingId = searchParams.get('trackingId')

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
                <CardTitle className="text-2xl mb-2">Application Submitted!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Your Tracking ID:</p>
                  <p className="text-xl font-mono font-bold">{trackingId}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Save this ID to track your application status
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => router.push('/join/track')}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Track Application
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/')}
                    className="w-full"
                  >
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

