"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "client" | "freelancer"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: "client" | "freelancer") => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("freelance_hub_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in a real app, this would be an API call
      if (email === "client@example.com" && password === "password") {
        const user: User = {
          id: "1",
          name: "John Client",
          email: "client@example.com",
          role: "client",
          avatar: "/placeholder.svg?height=100&width=100",
        }
        setUser(user)
        localStorage.setItem("freelance_hub_user", JSON.stringify(user))
      } else if (email === "freelancer@example.com" && password === "password") {
        const user: User = {
          id: "2",
          name: "Jane Freelancer",
          email: "freelancer@example.com",
          role: "freelancer",
          avatar: "/placeholder.svg?height=100&width=100",
        }
        setUser(user)
        localStorage.setItem("freelance_hub_user", JSON.stringify(user))
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "client" | "freelancer") => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration - in a real app, this would be an API call
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      setUser(user)
      localStorage.setItem("freelance_hub_user", JSON.stringify(user))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("freelance_hub_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>{children}</AuthContext.Provider>
  )
}
