'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import Image from 'next/image'

const members = [
  { name: 'DemonSlayer123', role: 'Guild Leader', avatar: '/placeholder.svg?height=100&width=100' },
  { name: 'FireFox007', role: 'Co-Leader', avatar: '/placeholder.svg?height=100&width=100' },
  { name: 'ShadowNinja', role: 'Elite Member', avatar: '/placeholder.svg?height=100&width=100' },
  { name: 'BlazingPhoenix', role: 'Elite Member', avatar: '/placeholder.svg?height=100&width=100' },
  { name: 'ThunderBolt', role: 'Member', avatar: '/placeholder.svg?height=100&width=100' },
  { name: 'IceQueen', role: 'Member', avatar: '/placeholder.svg?height=100&width=100' },
]

export default function MembersPage() {
  return (
    <div>
      <PageHeader
        title="Our Members"
        description="Meet the elite players of DEMONS GUILD FF"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg p-6 flex flex-col items-center"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-red-500 mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

