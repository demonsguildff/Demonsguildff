'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import type { Tournament, TournamentStatus, TournamentType } from "@/contexts/tournament-context"

interface TournamentFormData extends Omit<Tournament, 'id'> {}

interface TournamentFormProps {
  initialData?: Partial<TournamentFormData>
  onSubmit: (data: TournamentFormData) => Promise<void>
  onCancel: () => void
  submitLabel: string
}

const defaultFormData: TournamentFormData = {
  title: '',
  description: '',
  date: '',
  time: '',
  prizePool: '',
  status: 'Upcoming',
  participants: {
    current: 0,
    max: 32
  },
  registrationEnds: '',
  type: 'public',
  teamSize: {
    min: 4,
    max: 6
  },
  registeredTeams: []
}

export function TournamentForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel
}: TournamentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<TournamentFormData>({
    ...defaultFormData,
    ...initialData
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await onSubmit(formData)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Tournament Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="min-h-[100px]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="status">Tournament Status</Label>
          <Select 
            value={formData.status}
            onValueChange={(value: TournamentStatus) => 
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Registering">Registering</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tournament Type</Label>
          <Select 
            value={formData.type}
            onValueChange={(value: TournamentType) => 
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="members">Members Only</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="prizePool">Prize Pool</Label>
          <Input
            id="prizePool"
            value={formData.prizePool}
            onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="registrationEnds">Registration Deadline</Label>
          <Input
            id="registrationEnds"
            value={formData.registrationEnds}
            onChange={(e) => setFormData({ ...formData, registrationEnds: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Team Size</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="minTeamSize" className="text-xs">Min</Label>
              <Input
                id="minTeamSize"
                type="number"
                value={formData.teamSize.min}
                onChange={(e) => setFormData({
                  ...formData,
                  teamSize: { ...formData.teamSize, min: parseInt(e.target.value) || 0 }
                })}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="maxTeamSize" className="text-xs">Max</Label>
              <Input
                id="maxTeamSize"
                type="number"
                value={formData.teamSize.max}
                onChange={(e) => setFormData({
                  ...formData,
                  teamSize: { ...formData.teamSize, max: parseInt(e.target.value) || 0 }
                })}
                required
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Participants</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="currentParticipants" className="text-xs">Current</Label>
              <Input
                id="currentParticipants"
                type="number"
                value={formData.participants.current}
                onChange={(e) => setFormData({
                  ...formData,
                  participants: { ...formData.participants, current: parseInt(e.target.value) || 0 }
                })}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="maxParticipants" className="text-xs">Maximum</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.participants.max}
                onChange={(e) => setFormData({
                  ...formData,
                  participants: { ...formData.participants, max: parseInt(e.target.value) || 0 }
                })}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="registeredTeams">Registered Teams</Label>
        <Textarea
          id="registeredTeams"
          value={formData.registeredTeams.join('\n')}
          onChange={(e) => setFormData({
            ...formData,
            registeredTeams: e.target.value.split('\n').filter(team => team.trim())
          })}
          placeholder="One team name per line"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-orange-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {submitLabel}...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  )
}

