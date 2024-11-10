'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeSwitch } from './ThemeSwitch'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'weather-news', href: '/dashboard/weather-news' },
    { name: 'kanban', href: '/dashboard/kanban' },
    { name: 'analytics', href: '/dashboard/analytics' },
  ]

  return (
    <nav className="bg-background/95 dark:bg-gray-900 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              MasterJi
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'text-primary' // active item color
                    : 'text-muted-foreground hover:opacity-80'
                } transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Switch & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Theme Switch */}
            <div className="hidden md:block">
              <ThemeSwitch />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:opacity-90 hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-accent focus:ring-white md:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-gray-300 hover:opacity-80'
                } transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-accent flex justify-center">
            <ThemeSwitch />
          </div>
        </div>
      )}
    </nav>
  )
}
