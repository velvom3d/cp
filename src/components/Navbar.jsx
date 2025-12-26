import { Link, useLocation } from 'react-router-dom'
import { Dog, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { SHOP_CONFIG } from '../lib/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Dog className="h-8 w-8 text-primary-500" />
              <span className="font-bold text-xl text-gray-800">
                {SHOP_CONFIG.name}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'
              } font-medium transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/book"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive('/') ? 'text-primary-600' : 'text-gray-600'
                } font-medium`}
              >
                Home
              </Link>
              <Link
                to="/book"
                onClick={() => setIsOpen(false)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full font-medium text-center transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
