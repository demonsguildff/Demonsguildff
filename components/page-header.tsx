'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-b from-black to-gray-900 py-20 px-4 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">{title}</h1>
      {description && (
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">{description}</p>
      )}
    </motion.div>
  )
}

