import type React from "react"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Search, Filter, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/Input"
import ServiceGrid from "../components/ServiceGrid"
import { useServices } from "../contexts/ServicesContext"
import type { Service } from "../types"

const BrowseServices = () => {
  const location = useLocation()
  const { services, categories } = useServices()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [filteredServices, setFilteredServices] = useState<Service[]>(services)
  const [showFilters, setShowFilters] = useState(false)

  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get("q")
    const category = params.get("category")

    if (q) setSearchQuery(q)
    if (category) setSelectedCategory(category)
  }, [location.search])

  // Apply filters
  useEffect(() => {
    let results = [...services]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.freelancerName.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter((service) => service.categoryId === selectedCategory)
    }

    // Apply price range
    results = results.filter((service) => service.price >= priceRange[0] && service.price <= priceRange[1])

    setFilteredServices(results)
  }, [searchQuery, selectedCategory, priceRange, services])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search params
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedCategory) params.set("category", selectedCategory)

    window.history.pushState({}, "", `${location.pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setPriceRange([0, 1000])
    window.history.pushState({}, "", location.pathname)
  }

  // return (
  //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-  '', location.pathname)8">
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className={`md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center justify-between md:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategory === category.id}
                    onChange={() => {
                      setSelectedCategory(
                        selectedCategory === category.id ? null : category.id
                      )
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  setPriceRange([priceRange[0], value])
                }}
                className="w-full"
              />
            </div>
          </div>
          
          <Button onClick={clearFilters} variant="outline" className="w-full">
            Clear Filters
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 flex">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for services..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="ml-2">
                  Search
                </Button>
              </form>
              <Button
                variant="outline"
                className="md:hidden flex items-center"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {filteredServices.length > 0 ? (
            <ServiceGrid services={filteredServices} />
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No services found matching your criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseServices
