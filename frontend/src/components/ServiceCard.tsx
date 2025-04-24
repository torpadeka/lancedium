import { Link } from "react-router-dom"
import { Star, Heart } from "lucide-react"
import { Card } from "./ui/card"
import type { Service } from "../types"

interface ServiceCardProps {
  service: Service
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link to={`/freelancer/${service.freelancerId}`} className="block">
      <Card className="h-full overflow-hidden service-card-hover group border border-gray-100 dark:border-gray-800 rounded-xl">
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={service.image || `/placeholder.svg?height=200&width=300`}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <Heart className="h-4 w-4" />
          </button>
          {service.featured && (
            <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-primary text-white rounded-full">
              Featured
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2 border border-gray-200 dark:border-gray-700">
                <img
                  src={service.freelancerAvatar || `/placeholder.svg?height=32&width=32`}
                  alt={service.freelancerName}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">{service.freelancerName}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{service.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({service.reviewCount})</span>
            </div>
          </div>
          <h3 className="font-medium text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{service.description}</p>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">Starting at</div>
            <div className="text-lg font-bold text-primary">${service.price}</div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ServiceCard
