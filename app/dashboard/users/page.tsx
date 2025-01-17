'use client'

import { useState, useEffect } from "react"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Loader2, Search, UserPlus, Trash2, Shield } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { getAllUsers, getAllAdmins, addUser, removeUser, addAdmin, removeAdmin } from "@/lib/firebase-admin"

interface UserFormData {
  userId: string
  username: string
  password: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<Record<string, any>>({})
  const [admins, setAdmins] = useState<Record<string, any>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    userId: '',
    username: '',
    password: ''
  })
  const { toast } = useToast()

  const loadUsers = async () => {
    try {
      const [usersData, adminsData] = await Promise.all([
        getAllUsers(),
        getAllAdmins()
      ])
      setUsers(usersData)
      setAdmins(adminsData)
    } catch (error) {
      console.error('Error loading users:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users. Please try again.",
      })
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await addUser(formData.userId, {
        username: formData.username,
        password: formData.password
      })

      toast({
        title: "Success",
        description: "User added successfully.",
      })

      setFormData({ userId: '', username: '', password: '' })
      setIsAddingUser(false)
      loadUsers()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePromoteToAdmin = async (userId: string, userData: any) => {
    try {
      await addAdmin(userId, userData)
      await removeUser(userId)
      toast({
        title: "Success",
        description: "User promoted to admin successfully.",
      })
      loadUsers()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to promote user. Please try again.",
      })
    }
  }

  const handleRemoveUser = async (userId: string, isAdmin: boolean) => {
    try {
      if (isAdmin) {
        await removeAdmin(userId)
      } else {
        await removeUser(userId)
      }
      toast({
        title: "Success",
        description: "User removed successfully.",
      })
      loadUsers()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove user. Please try again.",
      })
    }
  }

  const filteredUsers = Object.entries(users).filter(([id, user]) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredAdmins = Object.entries(admins).filter(([id, admin]) =>
    admin.username.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h2 className="text-3xl font-bold mb-2">User Management</h2>
            <p className="text-muted-foreground">
              Manage users and administrators
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-[200px]"
              />
            </div>
            <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-500 to-orange-500">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddUser}>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account. The user will be able to login with these credentials.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="userId">User ID</Label>
                      <Input
                        id="userId"
                        value={formData.userId}
                        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                        placeholder="Enter user ID"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Enter username"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingUser(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-red-500 to-orange-500"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add User"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Administrators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAdmins.map(([id, admin]) => (
                  <Card key={id} className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{admin.username}</p>
                          <p className="text-sm text-muted-foreground">Admin</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveUser(id, true)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map(([id, user]) => (
                  <Card key={id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-muted-foreground">Member</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary hover:text-primary hover:bg-primary/10"
                            onClick={() => handlePromoteToAdmin(id, user)}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveUser(id, false)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageTransition>
  )
}

