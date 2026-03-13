import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t mt-12 py-6 px-4 text-center text-gray-500 text-sm">
      <p>© {currentYear} Ecoyaan. All rights reserved.</p>
      <p className="text-xs mt-1">Sustainability made easy</p>
    </footer>
  )
}
