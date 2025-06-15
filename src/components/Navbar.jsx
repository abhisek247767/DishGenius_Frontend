import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChefHat, Menu, X, Home, Heart, Settings, LogOut } from "lucide-react"

// Define navigation pages
const pages = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Recipe", path: "/recipe", icon: ChefHat },
  { name: "Favorites", path: "/fav", icon: Heart },
]

function Navbar({ user, logout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleUserMenuClick = (action) => {
    setIsUserMenuOpen(false)
    if (action === "logout") {
      logout()
    } else if (action === "settings") {
      navigate("/settings")
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.username?.slice(0, 2).toUpperCase() || "U"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold hidden sm:block">Recipe AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {pages.map((page) => {
              const IconComponent = page.icon
              return (
                <Link
                  key={page.name}
                  to={page.path}
                  className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{page.name}</span>
                </Link>
              )
            })}
          </div>

          {/* User Menu & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* User Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-semibold text-sm"
              >
                {getUserInitials()}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        {user?.name || user?.username || "User"}
                      </div>
                      <button
                        onClick={() => handleUserMenuClick("settings")}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </button>
                      <button
                        onClick={() => handleUserMenuClick("logout")}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-25 z-10 md:hidden" onClick={closeMobileMenu} />
            {/* Mobile Menu */}
            <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-20 md:hidden">
              <div className="py-2">
                {pages.map((page) => {
                  const IconComponent = page.icon
                  return (
                    <Link
                      key={page.name}
                      to={page.path}
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors"
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{page.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
