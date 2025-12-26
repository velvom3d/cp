// Shop Configuration
export const SHOP_CONFIG = {
  name: "Pawsome Grooming Studio",
  tagline: "Where Every Pet Gets the Royal Treatment",
  phone: "+91 98765 43210",
  email: "hello@pawsomestudio.com",
  address: "123, Pet Paradise Lane, Koramangala, Bangalore - 560034",
  workingHours: {
    weekdays: "9:00 AM - 7:00 PM",
    saturday: "9:00 AM - 6:00 PM",
    sunday: "10:00 AM - 4:00 PM"
  },
  mapUrl: "https://maps.google.com/?q=Koramangala,Bangalore"
}

// Services offered
export const SERVICES = [
  {
    id: "bath",
    name: "Bath & Dry",
    description: "Complete bathing with premium shampoo and blow dry",
    price: 500,
    duration: "45 mins",
    icon: "droplets"
  },
  {
    id: "haircut",
    name: "Haircut & Styling",
    description: "Professional haircut and breed-specific styling",
    price: 800,
    duration: "60 mins",
    icon: "scissors"
  },
  {
    id: "full-grooming",
    name: "Full Grooming Package",
    description: "Bath, haircut, nail trim, ear cleaning & teeth brushing",
    price: 1500,
    duration: "90 mins",
    icon: "sparkles"
  },
  {
    id: "nail-trim",
    name: "Nail Trimming",
    description: "Safe and precise nail trimming",
    price: 200,
    duration: "15 mins",
    icon: "hand"
  },
  {
    id: "ear-cleaning",
    name: "Ear Cleaning",
    description: "Gentle ear cleaning and inspection",
    price: 250,
    duration: "20 mins",
    icon: "ear"
  },
  {
    id: "teeth-cleaning",
    name: "Teeth Brushing",
    description: "Dental hygiene care with pet-safe products",
    price: 300,
    duration: "15 mins",
    icon: "smile"
  }
]

// Pet types
export const PET_TYPES = [
  { id: "dog", name: "Dog" },
  { id: "cat", name: "Cat" }
]

// Pet sizes with price multipliers
export const PET_SIZES = [
  { id: "small", name: "Small (Under 10kg)", multiplier: 1 },
  { id: "medium", name: "Medium (10-25kg)", multiplier: 1.3 },
  { id: "large", name: "Large (Over 25kg)", multiplier: 1.6 }
]

// Time slots
export const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM"
]

// Booking statuses
export const BOOKING_STATUSES = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" }
}
