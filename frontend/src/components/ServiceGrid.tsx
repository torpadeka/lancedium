import ServiceCard from "./ServiceCard"
import type { Service } from "../types"

interface ServiceGridProps {
  services: Service[]
  title?: string
}

const ServiceGrid = ({ services, title }: ServiceGridProps) => {
  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default ServiceGrid
