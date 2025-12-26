import { Droplets, Scissors, Sparkles, Hand, Ear, Smile } from 'lucide-react'

const iconMap = {
  droplets: Droplets,
  scissors: Scissors,
  sparkles: Sparkles,
  hand: Hand,
  ear: Ear,
  smile: Smile
}

export default function ServiceCard({ service, onSelect, selected }) {
  const Icon = iconMap[service.icon] || Sparkles

  return (
    <div
      onClick={() => onSelect?.(service)}
      className={`
        bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2
        ${selected ? 'border-primary-500 bg-primary-50' : 'border-transparent hover:border-primary-200'}
      `}
    >
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center mb-4
        ${selected ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-600'}
      `}>
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="font-semibold text-lg text-gray-800 mb-2">
        {service.name}
      </h3>

      <p className="text-gray-600 text-sm mb-4">
        {service.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-primary-600 font-bold text-lg">
          ₹{service.price}
        </span>
        <span className="text-gray-500 text-sm">
          {service.duration}
        </span>
      </div>
    </div>
  )
}
