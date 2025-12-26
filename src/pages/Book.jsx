import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, addDays, isBefore, startOfDay } from 'date-fns'
import { Calendar, Clock, User, Phone, Mail, Dog, Cat, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import ServiceCard from '../components/ServiceCard'
import { SERVICES, PET_TYPES, PET_SIZES, TIME_SLOTS, SHOP_CONFIG } from '../lib/constants'
import { bookingService } from '../lib/supabase'

export default function Book() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [bookedSlots, setBookedSlots] = useState([])

  const [formData, setFormData] = useState({
    // Customer Info
    customer_name: '',
    phone: '',
    email: '',
    // Pet Info
    pet_name: '',
    pet_type: '',
    pet_size: '',
    // Service
    service_id: '',
    service_name: '',
    // Booking
    booking_date: '',
    time_slot: '',
    notes: ''
  })

  const today = startOfDay(new Date())
  const maxDate = addDays(today, 30)

  // Fetch booked slots when date changes
  useEffect(() => {
    if (formData.booking_date) {
      fetchBookedSlots(formData.booking_date)
    }
  }, [formData.booking_date])

  const fetchBookedSlots = async (date) => {
    try {
      const slots = await bookingService.getBookedSlots(date)
      setBookedSlots(slots)
    } catch (error) {
      console.error('Error fetching booked slots:', error)
      setBookedSlots([])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceSelect = (service) => {
    setFormData(prev => ({
      ...prev,
      service_id: service.id,
      service_name: service.name
    }))
  }

  const calculatePrice = () => {
    const service = SERVICES.find(s => s.id === formData.service_id)
    const size = PET_SIZES.find(s => s.id === formData.pet_size)
    if (!service || !size) return 0
    return Math.round(service.price * size.multiplier)
  }

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (!formData.service_id) {
          toast.error('Please select a service')
          return false
        }
        return true
      case 2:
        if (!formData.customer_name || !formData.phone || !formData.email) {
          toast.error('Please fill in all contact details')
          return false
        }
        if (!formData.pet_name || !formData.pet_type || !formData.pet_size) {
          toast.error('Please fill in all pet details')
          return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          toast.error('Please enter a valid email address')
          return false
        }
        const phoneRegex = /^[0-9]{10}$/
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
          toast.error('Please enter a valid 10-digit phone number')
          return false
        }
        return true
      case 3:
        if (!formData.booking_date || !formData.time_slot) {
          toast.error('Please select a date and time')
          return false
        }
        return true
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setLoading(true)
    try {
      const bookingData = {
        customer_name: formData.customer_name,
        phone: formData.phone,
        email: formData.email,
        pet_name: formData.pet_name,
        pet_type: formData.pet_type,
        pet_size: formData.pet_size,
        service_id: formData.service_id,
        service_name: formData.service_name,
        booking_date: formData.booking_date,
        time_slot: formData.time_slot,
        notes: formData.notes,
        total_price: calculatePrice(),
        status: 'pending'
      }

      await bookingService.createBooking(bookingData)
      toast.success('Booking confirmed!')
      setStep(4)
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isSlotAvailable = (slot) => {
    return !bookedSlots.includes(slot)
  }

  const isDateValid = (dateStr) => {
    const date = new Date(dateStr)
    return !isBefore(date, today)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Book Your Appointment
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${step >= s ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-16 md:w-24 h-1 ${step > s ? 'bg-primary-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Select a Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={formData.service_id === service.id}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Customer & Pet Details */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Your Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" /> Contact Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Pet Info */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center gap-2">
                    <Dog className="h-4 w-4" /> Pet Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Pet Name *
                    </label>
                    <input
                      type="text"
                      name="pet_name"
                      value={formData.pet_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Buddy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Pet Type *
                    </label>
                    <div className="flex gap-4">
                      {PET_TYPES.map((type) => (
                        <label
                          key={type.id}
                          className={`
                            flex-1 flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-colors
                            ${formData.pet_type === type.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-200'}
                          `}
                        >
                          <input
                            type="radio"
                            name="pet_type"
                            value={type.id}
                            checked={formData.pet_type === type.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          {type.id === 'dog' ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
                          {type.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Pet Size *
                    </label>
                    <select
                      name="pet_size"
                      value={formData.pet_size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      {PET_SIZES.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Select Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Select Date *
                  </label>
                  <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleInputChange}
                    min={format(today, 'yyyy-MM-dd')}
                    max={format(maxDate, 'yyyy-MM-dd')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Select Time *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const available = isSlotAvailable(slot)
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!available || !formData.booking_date}
                          onClick={() => setFormData(prev => ({ ...prev, time_slot: slot }))}
                          className={`
                            p-2 text-sm rounded-lg border-2 transition-colors
                            ${formData.time_slot === slot
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : available && formData.booking_date
                                ? 'border-gray-200 hover:border-primary-200'
                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                            }
                          `}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any special instructions or requests..."
                />
              </div>

              {/* Booking Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{formData.service_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pet:</span>
                    <span className="font-medium">{formData.pet_name} ({formData.pet_type})</span>
                  </div>
                  {formData.booking_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{format(new Date(formData.booking_date), 'dd MMM yyyy')}</span>
                    </div>
                  )}
                  {formData.time_slot && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{formData.time_slot}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-primary-600">₹{calculatePrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-secondary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for booking with {SHOP_CONFIG.name}. We've sent a confirmation email to <strong>{formData.email}</strong>.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto text-left mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{formData.service_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pet:</span>
                    <span className="font-medium">{formData.pet_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{format(new Date(formData.booking_date), 'dd MMM yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{formData.time_slot}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-primary-600">₹{calculatePrice()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`
                  px-6 py-2 rounded-lg font-medium transition-colors
                  ${step === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `}
              >
                Back
              </button>
              {step === 3 ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-2 rounded-lg font-medium transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
