'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'DEMONS GUILD T-Shirt',
    price: 29.99,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Premium black t-shirt with DEMONS GUILD FF logo'
  },
  {
    id: 2,
    name: 'Gaming Mouse Pad',
    price: 19.99,
    image: '/placeholder.svg?height=300&width=300',
    description: 'XL mousepad with guild design'
  },
  {
    id: 3,
    name: 'Guild Hoodie',
    price: 49.99,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Comfortable hoodie with embroidered logo'
  },
  // Add more products as needed
]

export default function ShopPage() {
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([])
  
  function addToCart(productId: number) {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { id: productId, quantity: 1 }]
    })
  }
  
  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id)
    return total + (product?.price ?? 0) * item.quantity
  }, 0)
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Guild Shop</h1>
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900 rounded-md">
          <ShoppingCart className="text-red-500" />
          <span className="text-gray-300">Total: ${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-lg overflow-hidden border border-red-900/50"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(product.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

