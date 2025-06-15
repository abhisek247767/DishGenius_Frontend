import { Link } from "react-router-dom"
import { ChefHat, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/home" },
        { name: "Recipes", path: "/recipe" },
        { name: "Favorites", path: "/fav" },
        { name: "Settings", path: "/settings" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "#" },
        { name: "Contact Us", path: "#" },
        { name: "Privacy Policy", path: "#" },
        { name: "Terms of Service", path: "#" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Github", icon: Github, href: "https://github.com/abhisek247767" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/abhisekroy169" },
    { name: "Linkedin", icon: Linkedin, href: "https://www.linkedin.com/in/royabhisek247767/" },
  ]

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">Recipe AI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Discover, create, and share amazing recipes with our AI-powered platform. Turn your ingredients into
              culinary masterpieces with personalized recipe suggestions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>abhisekroy169@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+91 7029008311</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>Kolkata, West Bengal</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">© {currentYear} Abhisek Roy. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                    target="_blank"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
