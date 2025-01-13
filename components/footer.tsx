'use client'

import Link from 'next/link'
import { Github, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black/90 border-t border-red-900/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-red-500 font-bold text-lg mb-4">DEMONS GUILD FF</h3>
            <p className="text-gray-400">
              Join the elite Free Fire gaming community. Rise through the ranks and become a legend.
            </p>
          </div>
          <div>
            <h3 className="text-red-500 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link href="/recruitment" className="text-gray-400 hover:text-red-500 transition-colors">Join the Guild</Link></li>
              <li><Link href="/members" className="text-gray-400 hover:text-red-500 transition-colors">Our Members</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-red-500 font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-red-900/50 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DEMONS GUILD FF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

