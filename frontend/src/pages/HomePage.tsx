import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, ArrowRight, CheckCircle, Star, Users, Briefcase, Zap } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import ServiceGrid from "../components/ServiceGrid"
import { useServices } from "../contexts/ServicesContext"

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { featuredServices, categories, popularServices } = useServices()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="hero-pattern pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Find the perfect <span className="gradient-text">freelance services</span> for your business
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Connect with talented freelancers and bring your ideas to life
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for services..."
                  className="pl-12 h-14 w-full rounded-l-full rounded-r-none border-r-0 text-base shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="h-14 px-8 rounded-r-full rounded-l-none shadow-sm">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-primary" /> Verified Freelancers
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-primary" /> Secure Payments
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-primary" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-900 py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">10k+</p>
              <p className="text-gray-600 dark:text-gray-400">Freelancers</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">8k+</p>
              <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">15k+</p>
              <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">4.8</p>
              <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Categories</h2>
              <p className="text-gray-600 dark:text-gray-400">Browse our most in-demand service categories</p>
            </div>
            <Button variant="ghost" className="flex items-center group">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <div
                key={category.id}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <img
                  src={category.image || `/placeholder.svg?height=300&width=300`}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lancedium makes it easy to connect with skilled professionals and get your projects done
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-900 shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="absolute -top-8 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mt-8 mb-3">Find the perfect service</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse through thousands of services from talented freelancers around the world
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-900 shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="absolute -top-8 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mt-8 mb-3">Connect with freelancers</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Chat with freelancers to discuss your project requirements and expectations
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-900 shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="absolute -top-8 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mt-8 mb-3">Get your work done</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Receive high-quality work delivered on time and to your satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Services</h2>
              <p className="text-gray-600 dark:text-gray-400">Handpicked services from top-rated freelancers</p>
            </div>
            <Button variant="ghost" className="flex items-center group">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <ServiceGrid services={featuredServices} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience with our freelancers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                "I was amazed by the quality of work I received. The freelancer understood my requirements perfectly and
                delivered beyond my expectations."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="/placeholder.svg?height=40&width=40&text=JD"
                    alt="John Doe"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CEO, TechStart</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                "The process was smooth from start to finish. Communication was excellent, and the work was delivered
                ahead of schedule."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="/placeholder.svg?height=40&width=40&text=SJ"
                    alt="Sarah Johnson"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                "I've used many freelance platforms before, but Lancedium has the most talented professionals. Will
                definitely use again!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="/placeholder.svg?height=40&width=40&text=MC"
                    alt="Michael Chen"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9zdmc+')]"></div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">Are you a freelancer?</h2>
              <p className="text-white/80 mb-6 text-lg">
                Join our community of talented freelancers and start offering your services to clients worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-md">
                  Become a Freelancer
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=600&text=Freelancer"
                alt="Freelancer working"
                className="rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
