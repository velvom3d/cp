import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import { SHOP_CONFIG, SERVICES } from '../lib/constants'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {SHOP_CONFIG.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              {SHOP_CONFIG.tagline}
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
            >
              Book an Appointment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Pet Parents Love Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Expert Groomers</h3>
              <p className="text-gray-600">
                Certified professionals with years of experience handling all breeds
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Premium Products</h3>
              <p className="text-gray-600">
                We use only pet-safe, organic grooming products
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Stress-Free Environment</h3>
              <p className="text-gray-600">
                Calm atmosphere designed to keep your pets relaxed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From basic grooming to full spa treatments, we offer everything your furry friend needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Book Your Appointment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Visit Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
              <a href={`tel:${SHOP_CONFIG.phone}`} className="text-primary-600 hover:text-primary-700">
                {SHOP_CONFIG.phone}
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">{SHOP_CONFIG.address}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hours</h3>
              <p className="text-gray-600">
                Mon-Fri: {SHOP_CONFIG.workingHours.weekdays}<br />
                Sat: {SHOP_CONFIG.workingHours.saturday}<br />
                Sun: {SHOP_CONFIG.workingHours.sunday}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Pamper Your Pet?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Book your appointment today and give your furry friend the care they deserve
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
          >
            Book Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
