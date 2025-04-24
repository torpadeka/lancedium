"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Service, Category } from "../types"
import { mockServices, mockCategories } from "../mockData"

interface ServicesContextType {
  services: Service[]
  categories: Category[]
  featuredServices: Service[]
  popularServices: Service[]
  getServicesByCategory: (categoryId: string) => Service[]
  getServicesByFreelancer: (freelancerId: string) => Service[]
  searchServices: (query: string) => Service[]
  addService: (service: Omit<Service, "id">) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  isLoading: boolean
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined)

export const useServices = () => {
  const context = useContext(ServicesContext)
  if (context === undefined) {
    throw new Error("useServices must be used within a ServicesProvider")
  }
  return context
}

export const ServicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load mock data
    setServices(mockServices)
    setCategories(mockCategories)
    setIsLoading(false)
  }, [])

  const featuredServices = services
    .filter((service) => service.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)

  const popularServices = services.sort((a, b) => b.rating - a.rating).slice(0, 8)

  const getServicesByCategory = (categoryId: string) => {
    return services.filter((service) => service.categoryId === categoryId)
  }

  const getServicesByFreelancer = (freelancerId: string) => {
    return services.filter((service) => service.freelancerId === freelancerId)
  }

  const searchServices = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return services.filter(
      (service) =>
        service.title.toLowerCase().includes(lowercaseQuery) ||
        service.description.toLowerCase().includes(lowercaseQuery) ||
        service.freelancerName.toLowerCase().includes(lowercaseQuery),
    )
  }

  const addService = (service: Omit<Service, "id">) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
    }
    setServices([...services, newService])
  }

  const updateService = (id: string, updatedFields: Partial<Service>) => {
    setServices(services.map((service) => (service.id === id ? { ...service, ...updatedFields } : service)))
  }

  const deleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  return (
    <ServicesContext.Provider
      value={{
        services,
        categories,
        featuredServices,
        popularServices,
        getServicesByCategory,
        getServicesByFreelancer,
        searchServices,
        addService,
        updateService,
        deleteService,
        isLoading,
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}
