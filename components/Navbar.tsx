"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { NAV_LINKS } from "@/constants"
import Button from "./Button"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  let closeTimeout: NodeJS.Timeout | null = null

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLangDropdownToggle = () => {
    setLangDropdownOpen(!langDropdownOpen)
    if (closeTimeout) clearTimeout(closeTimeout)
  }

  const handleLangDropdownEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout)
    setLangDropdownOpen(true)
  }

  const handleLangDropdownLeave = () => {
    closeTimeout = setTimeout(() => setLangDropdownOpen(false), 300)
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 py-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and brand name */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/fierytrips.svg"
            alt="FieryTrips Logo"
            width={50}
            height={50}
            className="text-[#f26336]"
          />
          <span className="text-2xl font-bold text-[#212832]">FieryTrips</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className="text-[#212832] hover:text-[#f26336]">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Desktop Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 pl-3 pr-10 py-2 border border-[#c4c4c4] rounded-md text-[#212832] focus:outline-none focus:ring-2 focus:ring-[#f26336] focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#212832]" size={18} />
          </div>

          <Link href="#" className="text-[#212832] hover:text-[#f26336]">
            Sign In
          </Link>
          <Button href="#" variant="outline">
            Sign up
          </Button>
          <div
            ref={langDropdownRef}
            className="relative"
            onMouseEnter={handleLangDropdownEnter}
            onMouseLeave={handleLangDropdownLeave}
          >
            <button
              className="flex items-center gap-1 text-[#212832] hover:text-[#f26336]"
              onClick={handleLangDropdownToggle}
            >
              <span className="font-medium">EN</span>
              <ChevronDown size={16} />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
                  English
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
                  Español
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
                  Français
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tablet and Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <div
            ref={langDropdownRef}
            className="relative"
            onMouseEnter={handleLangDropdownEnter}
            onMouseLeave={handleLangDropdownLeave}
          >
            <button
              className="flex items-center gap-1 text-[#212832] hover:text-[#f26336]"
              onClick={handleLangDropdownToggle}
            >
              <span className="font-medium">EN</span>
              <ChevronDown size={16} />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
                  English
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
                  Español
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
                  Français
                </Link>
              </div>
            )}
          </div>
          <button
            className="text-[#212832] hover:text-[#f26336] p-2"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={24} />
          </button>
          <button
            className="text-[#212832] hover:text-[#f26336] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 border border-[#212832] rounded-md text-[#212832] focus:outline-none focus:ring-2 focus:ring-[#f26336] focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#212832]" size={20} />
            </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 lg:hidden z-10">
            <nav className="flex flex-col gap-4 mb-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-[#212832] hover:text-[#f26336] py-2 border-b border-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Link href="#" className="text-[#212832] hover:text-[#f26336] font-medium">
                Sign In
              </Link>
              <Button href="#" variant="outline" className="w-full">
                Sign up
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}