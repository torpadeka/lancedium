import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PortfolioEditor from "../components/PortfolioEditor"
import { useAuth } from "../contexts/AuthContext"

interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
  tags: string[]
}

const PortfolioBuilder = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "E-commerce Website",
      description: "A fully responsive e-commerce website built with React and Node.js",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: ["React", "Node.js", "E-commerce"],
    },
  ])

  // Redirect if not logged in or not a freelancer
  if (!user) {
    navigate("/login")
    return null
  }

  if (user.role !== "freelancer") {
    navigate("/dashboard")
    return null
  }

  const handleSavePortfolio = (items: PortfolioItem[]) => {
    setPortfolioItems(items)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PortfolioEditor initialItems={portfolioItems} onSave={handleSavePortfolio} />
    </div>
  )
}

export default PortfolioBuilder
