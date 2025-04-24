import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Edit, Trash2, MessageSquare, User, Settings, FileText } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import ServiceGrid from "../components/ServiceGrid"
import { useAuth } from "../contexts/AuthContext"
import { useServices } from "../contexts/ServicesContext"
import type { Service } from "../types"

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { services, deleteService } = useServices()
  const [activeTab, setActiveTab] = useState<"services" | "messages" | "profile" | "settings">("services")

  // Redirect if not logged in
  if (!user) {
    navigate("/login")
    return null
  }

  const userServices = services.filter((service) => service.freelancerId === user.id)

  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(id)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={user.avatar || `/placeholder.svg?height=48&width=48`}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-medium">{user.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.role === "freelancer" ? "Freelancer" : "Client"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-md ${
                activeTab === "services" ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>My Services</span>
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-md ${
                activeTab === "messages" ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-md ${
                activeTab === "profile" ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-md ${
                activeTab === "settings" ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </nav>

          {user.role === "freelancer" && (
            <div className="pt-4">
              <Button onClick={() => navigate("/portfolio-builder")} className="w-full">
                Edit Portfolio
              </Button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Services</h1>
                {user.role === "freelancer" && (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Service
                  </Button>
                )}
              </div>

              {user.role === "freelancer" ? (
                userServices.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userServices.map((service: Service) => (
                      <Card key={service.id} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={service.image || `/placeholder.svg?height=200&width=300`}
                            alt={service.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{service.title}</h3>
                            <div className="font-medium">${service.price}</div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)}>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any services yet</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Service
                    </Button>
                  </div>
                )
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-4">Recently Hired</h2>
                  {/* For clients, show services they've hired */}
                  <ServiceGrid services={services.slice(0, 4)} />
                </div>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Messages</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Inbox</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=U${i}`}
                            alt={`User ${i}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium truncate">
                              {i === 1 ? "Sarah Johnson" : i === 2 ? "Michael Chen" : "Emma Wilson"}
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(Date.now() - i * 3600000).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {i === 1
                              ? "Hi there! I'm interested in your web design service..."
                              : i === 2
                                ? "Thanks for the quick response. When can we schedule a call?"
                                : "The project looks great! Just a few minor revisions..."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Profile</h1>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="h-24 w-24 rounded-full overflow-hidden">
                      <img
                        src={user.avatar || `/placeholder.svg?height=96&width=96`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{user.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {user.role === "freelancer" ? "Freelancer" : "Client"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        readOnly
                      />
                    </div>
                  </div>

                  {user.role === "freelancer" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Professional Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Full Stack Developer"
                          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                          placeholder="Tell clients about yourself and your work..."
                          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Skills</label>
                        <input
                          type="text"
                          placeholder="e.g. Web Design, JavaScript, React"
                          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate skills with commas</p>
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Two-Factor Authentication</label>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications about new messages and projects
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Browser Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications in your browser
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      This action cannot be undone. All your data will be permanently deleted.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
