"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./ThemeProvider"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-xl font-bold gradient-text">Lancedium</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "border-primary text-primary dark:text-primary-foreground"
                    : "border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/browse")
                    ? "border-primary text-primary dark:text-primary-foreground"
                    : "border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                }`}
                onClick={closeMenu}
              >
                Browse Services
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "border-primary text-primary dark:text-primary-foreground"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user ? (
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={user.avatar || `/placeholder.svg?height=32&width=32`}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>{user.name.split(" ")[0]}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="ghost" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button className="font-medium shadow-sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg z-50">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/"
              className={`block py-2 px-3 rounded-lg text-base font-medium ${
                isActive("/")
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`block py-2 px-3 rounded-lg text-base font-medium ${
                isActive("/browse")
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Browse Services
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`block py-2 px-3 rounded-lg text-base font-medium ${
                  isActive("/dashboard")
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                className="block w-full text-left py-2 px-3 rounded-lg text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => {
                  logout()
                  closeMenu()
                }}
              >
                Sign Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  className="block py-2 text-center rounded-lg border border-gray-300 dark:border-gray-700 font-medium"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-center rounded-lg bg-primary text-white font-medium"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
