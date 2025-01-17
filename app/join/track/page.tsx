'use client'

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { getApplication } from "@/lib/firebase-join"

interface ApplicationStatus {
  status: 'pending' | 'approved' | 'rejected'
  fullName: string
  timestamp: number
}

export default function TrackApplicationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [trackingId, setTrackingId] = useState('')
  const [application, setApplication] = useState<ApplicationStatus | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await getApplication(trackingId)
      if (result) {
        setApplication(result)
      } else {
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "No application found with this tracking ID.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch application status. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageTransition>
        <main className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Track Application</CardTitle>
                <CardDescription>
                  Enter your tracking ID to check your application status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trackingId">Tracking ID</Label>
                    <Input
                      id="trackingId"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter your tracking ID"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check Status"
                    )}
                  </Button>
                </form>

                {application && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-lg bg-muted"
                  >
                    <div className="flex items-center justify-center mb-4">
                      {application.status === 'approved' ? (
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                      ) : application.status === 'rejected' ? (
                        <XCircle className="h-12 w-12 text-red-500" />
                      ) : (
                        <Clock className="h-12 w-12 text-yellow-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2">
                      {application.status === 'approved'
                        ? 'Application Approved!'
                        : application.status === 'rejected'
                        ? 'Application Rejected'
                        : 'Application Pending'}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {application.status === 'pending'
                        ? 'Your application is being reviewed by our team.'
                        : application.status === 'approved'
                        ? 'Congratulations! You have been accepted to join the guild.'
                        : 'Unfortunately, your application has not been accepted at this time.'}
                    </p>
                    <div className="mt-4 text-sm text-center text-muted-foreground">
                      <p>Applicant: {application.fullName}</p>
                      <p>Submitted: {new Date(application.timestamp).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  )
}

