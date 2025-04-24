import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Star, MapPin, Calendar, MessageSquare } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import ServiceGrid from "../components/ServiceGrid"
import ChatInterface from "../components/ChatInterface"
import { useServices } from "../contexts/ServicesContext"
import type { Service } from "../types"

interface Freelancer {
  id: string
  name: string
  title: string
  avatar: string
  location: string
  memberSince: string
  bio: string
  skills: string[]
  rating: number
  reviewCount: number
  portfolioItems: {
    id: string
    title: string
    image: string
    description: string
  }[]
}

const FreelancerProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { getServicesByFreelancer } = useServices()
  const [activeTab, setActiveTab] = useState<"services" | "portfolio" | "reviews" | "chat">("services")
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      // Fetch freelancer data - in a real app, this would be an API call
      setTimeout(() => {
        setFreelancer({
          id,
          name: "Alex Johnson",
          title: "Full Stack Developer & UI/UX Designer",
          avatar: "/placeholder.svg?height=200&width=200",
          location: "San Francisco, CA",
          memberSince: "January 2020",
          bio: "Experienced full-stack developer with a passion for creating beautiful, functional web applications. Specialized in React, Node.js, and modern web technologies.",
          skills: ["React", "Node.js", "TypeScript", "UI/UX Design", "Figma", "MongoDB"],
          rating: 4.9,
          reviewCount: 127,
          portfolioItems: [
            {
              id: "1",
              title: "E-commerce Website Redesign",
              image: "/placeholder.svg?height=400&width=600",
              description: "Complete redesign of an e-commerce platform, improving conversion rates by 35%.",
            },
            {
              id: "2",
              title: "Mobile Banking App",
              image: "/placeholder.svg?height=400&width=600",
              description:
                "Designed and developed a mobile banking application with focus on security and user experience.",
            },
            {
              id: "3",
              title: "SaaS Dashboard",
              image: "/placeholder.svg?height=400&width=600",
              description:
                "Created an analytics dashboard for a SaaS company, visualizing complex data in an intuitive way.",
            },
          ],
        })

        // Get services by freelancer
        setServices(getServicesByFreelancer(id))
        setIsLoading(false)
      }, 500)
    }
  }, [id, getServicesByFreelancer])

  if (isLoading || !freelancer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Freelancer Info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="h-32 w-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={freelancer.avatar || "/placeholder.svg"}
                    alt={freelancer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{freelancer.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{freelancer.title}</p>

                <div className="flex items-center justify-center mt-2">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="ml-1 font-medium">{freelancer.rating}</span>
                  <span className="ml-1 text-gray-600 dark:text-gray-400">({freelancer.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{freelancer.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>Member since {freelancer.memberSince}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full">Contact Me</Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-gray-600 dark:text-gray-400">{freelancer.bio}</p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("services")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "services"
                    ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "portfolio"
                    ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "chat"
                    ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "services" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Services Offered</h2>
                {services.length > 0 ? (
                  <ServiceGrid services={services} />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">This freelancer hasn't added any services yet.</p>
                )}
              </div>
            )}

            {activeTab === "portfolio" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {freelancer.portfolioItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Client Reviews</h2>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-current text-yellow-500" />
                    <span className="ml-1 font-medium">{freelancer.rating}</span>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">({freelancer.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img
                                src={`/placeholder.svg?height=40&width=40&text=C${i}`}
                                alt={`Client ${i}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">Client {i}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {Array(5)
                              .fill(0)
                              .map((_, j) => (
                                <Star
                                  key={j}
                                  className={`h-4 w-4 ${
                                    j < 5 - (i % 2)
                                      ? "fill-current text-yellow-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {i === 1
                            ? "Excellent work! Delivered the project ahead of schedule and exceeded my expectations. Very professional and communicative throughout the process."
                            : i === 2
                              ? "Great experience working with this freelancer. They understood my requirements perfectly and delivered high-quality work."
                              : "Very talented and professional. Would definitely hire again for future projects."}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Chat with {freelancer.name}</h2>
                <ChatInterface freelancerId={freelancer.id} freelancerName={freelancer.name} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerProfile
