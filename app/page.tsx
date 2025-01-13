'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy, Users, Target } from 'lucide-react'
import { LoginForm } from '@/components/login-form'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.postimg.cc/Hkd3GctP/DEMONS-NEW-LOGO.jpg"
            alt="DEMONS GUILD FF Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center md:text-left"
            >
              <Image
                src="https://i.postimg.cc/Hkd3GctP/DEMONS-NEW-LOGO.jpg"
                alt="DEMONS GUILD FF Logo"
                width={200}
                height={200}
                className="mx-auto md:mx-0 rounded-full mb-8 border-4 border-red-500"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-4">
                DEMONS GUILD FF
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Join the Elite. Dominate the Battlefield.
              </p>
              <Link
                href="/recruitment"
                className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                Join Now <ArrowRight className="ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <LoginForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <Trophy className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Competitive Gaming</h3>
              <p className="text-gray-400">
                Participate in tournaments and climb the ranks with dedicated teammates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6"
            >
              <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Active Community</h3>
              <p className="text-gray-400">
                Join a vibrant community of passionate Free Fire players
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-6"
            >
              <Target className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Skill Development</h3>
              <p className="text-gray-400">
                Regular training sessions and mentorship from experienced players
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

