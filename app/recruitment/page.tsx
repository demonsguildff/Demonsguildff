'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'

export default function RecruitmentPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    discord: '',
    experience: '',
    motivation: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log('Form submitted:', formState)
    // Reset form
    setFormState({
      name: '',
      email: '',
      discord: '',
      experience: '',
      motivation: ''
    })
    alert('Thank you for your application! We will contact you soon.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      <PageHeader
        title="Join DEMONS GUILD FF"
        description="Take the first step towards becoming a member of our elite gaming community"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="discord" className="block text-sm font-medium text-gray-300">
              Discord Username
            </label>
            <input
              type="text"
              id="discord"
              name="discord"
              required
              value={formState.discord}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-300">
              Free Fire Experience (Years)
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              required
              min="0"
              max="10"
              value={formState.experience}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-300">
              Why do you want to join DEMONS GUILD FF?
            </label>
            <textarea
              id="motivation"
              name="motivation"
              required
              rows={4}
              value={formState.motivation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-colors"
          >
            Submit Application
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

