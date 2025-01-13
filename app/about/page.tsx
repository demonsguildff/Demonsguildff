'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Shield, Target, Trophy, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About DEMONS GUILD FF"
        description="Learn about our history, values, and mission in the Free Fire community"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-red-500 mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              DEMONS GUILD FF was founded by a group of passionate Free Fire players who shared a vision
              of creating an elite gaming community. Since our inception, we have grown into one of
              the most respected guilds in the Free Fire ecosystem.
            </p>
            <p className="text-gray-300">
              Our members are carefully selected based on their skill, dedication, and teamwork
              abilities. We believe in fostering talent and helping each member reach their full
              potential through structured training and competitive play.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-gray-900 p-6 rounded-lg">
              <Shield className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-400">To create an elite gaming community that dominates Free Fire competitions</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <Target className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-400">To be recognized as the most prestigious Free Fire guild globally</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <Trophy className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Achievements</h3>
              <p className="text-gray-400">Multiple tournament victories and high-ranking competitive success</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <Users className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">A growing network of skilled and dedicated players</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

