'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cart', label: 'Cart' },
    { href: '/wishlist', label: 'WishList' }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">
          
          {/* Logo Section */}
          <Link href="/" className="group text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent hover:from-green-700 hover:to-green-600 transition-all">
              Ecoyaan
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-400 group-hover:text-gray-500 transition">
              Sustainability made easy
            </p>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                    }
                  `}>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-green-500 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}