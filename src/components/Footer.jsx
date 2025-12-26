import { Dog, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SHOP_CONFIG } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dog className="h-8 w-8 text-primary-400" />
              <span className="font-bold text-xl">{SHOP_CONFIG.name}</span>
            </div>
            <p className="text-gray-400">
              {SHOP_CONFIG.tagline}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <a href={`tel:${SHOP_CONFIG.phone}`} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone className="h-4 w-4" />
                {SHOP_CONFIG.phone}
              </a>
              <a href={`mailto:${SHOP_CONFIG.email}`} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Mail className="h-4 w-4" />
                {SHOP_CONFIG.email}
              </a>
              <a href={SHOP_CONFIG.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-primary-400 transition-colors">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                {SHOP_CONFIG.address}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Working Hours</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Mon - Fri: {SHOP_CONFIG.workingHours.weekdays}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Saturday: {SHOP_CONFIG.workingHours.saturday}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Sunday: {SHOP_CONFIG.workingHours.sunday}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SHOP_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
