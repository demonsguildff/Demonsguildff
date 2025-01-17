'use client'

import { createContext, useContext, useState } from 'react'

export type TournamentStatus = 'Registering' | 'In Progress' | 'Completed' | 'Upcoming'
export type TournamentType = 'members' | 'public'

export interface Tournament {
  id: number
  title: string
  date: string
  time: string
  prizePool: string
  status: TournamentStatus
  participants: {
    current: number
    max: number
  }
  description: string
  registrationEnds: string
  type: TournamentType
  teamSize: {
    min: number
    max: number
  }
  registeredTeams: string[]
}

interface TournamentContextType {
  tournaments: Tournament[]
  addTournament: (tournament: Omit<Tournament, 'id'>) => void
  updateTournament: (id: number, updatedTournament: Partial<Tournament>) => void
  deleteTournament: (id: number) => void
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined)

const initialTournaments: Tournament[] = [
  {
    id: 1,
    title: "Weekly Championship",
    date: "2024-01-21",
    time: "20:00",
    prizePool: "$1,000",
    status: "Registering",
    participants: {
      current: 16,
      max: 32
    },
    description: "Weekly tournament for all guild members.",
    registrationEnds: "2 days",
    type: 'members',
    teamSize: {
      min: 4,
      max: 6
    },
    registeredTeams: ["Team Alpha", "Team Beta"]
  },
  {
    id: 2,
    title: "Open Championship",
    date: "2024-01-28",
    time: "18:00",
    prizePool: "$2,000",
    status: "Upcoming",
    participants: {
      current: 45,
      max: 64
    },
    description: "Open tournament for all players.",
    registrationEnds: "5 days",
    type: 'public',
    teamSize: {
      min: 4,
      max: 6
    },
    registeredTeams: ["Team X", "Team Y", "Team Z"]
  },
]

export function TournamentProvider({ children }: { children: React.ReactNode }) {
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments)

  const addTournament = (tournament: Omit<Tournament, 'id'>) => {
    setTournaments(prev => [
      ...prev,
      {
        ...tournament,
        id: Math.max(...prev.map(t => t.id), 0) + 1
      }
    ])
  }

  const updateTournament = (id: number, updatedTournament: Partial<Tournament>) => {
    setTournaments(prev =>
      prev.map(tournament =>
        tournament.id === id
          ? { ...tournament, ...updatedTournament }
          : tournament
      )
    )
  }

  const deleteTournament = (id: number) => {
    setTournaments(prev => prev.filter(tournament => tournament.id !== id))
  }

  return (
    <TournamentContext.Provider value={{ tournaments, addTournament, updateTournament, deleteTournament }}>
      {children}
    </TournamentContext.Provider>
  )
}

export function useTournaments() {
  const context = useContext(TournamentContext)
  if (!context) {
    throw new Error('useTournaments must be used within a TournamentProvider')
  }
  return context
}

