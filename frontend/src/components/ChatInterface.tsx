"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/Input"
import { useAuth } from "../contexts/AuthContext"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatInterfaceProps {
  freelancerId: string
  freelancerName: string
}

const ChatInterface = ({ freelancerId, freelancerName }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    // Add initial bot message
    setMessages([
      {
        id: "1",
        content: `Hi there! I'm ${freelancerName}'s assistant. How can I help you today?`,
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [freelancerName])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateBotResponse(input, freelancerName),
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  const generateBotResponse = (message: string, name: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return `${name}'s pricing depends on the specific requirements of your project. They typically charge between $50-$100 per hour. Would you like me to notify them to discuss your project in detail?`
    }

    if (lowerMessage.includes("time") || lowerMessage.includes("deadline") || lowerMessage.includes("available")) {
      return `${name} is currently available for new projects and typically delivers work within 1-2 weeks depending on complexity. Would you like to discuss your timeline?`
    }

    if (lowerMessage.includes("portfolio") || lowerMessage.includes("work") || lowerMessage.includes("sample")) {
      return `You can view ${name}'s portfolio by clicking on the Portfolio tab above. They have extensive experience in this field with over 50 completed projects.`
    }

    return `Thanks for your message! ${name} will get back to you as soon as possible. Is there anything specific about their services you'd like to know in the meantime?`
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-medium">{freelancerName}'s Assistant</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-gray-800 text-white dark:bg-gray-700"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-100"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={!user || isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={!user || !input.trim() || isLoading} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {!user && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please sign in to send messages</p>}
      </form>
    </div>
  )
}

export default ChatInterface
