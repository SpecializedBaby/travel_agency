"use client"; // Required for using React hooks in Next.js

import { useState } from "react";
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: searchQuery }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Search results:", data);
          // Handle search results (e.g., redirect or display results)
        } else {
          console.error("Search failed");
        }
      } catch (error) {
        console.error("Error during search:", error);
      }
    }
  };

  return (
    <nav className="border-2 border-red-500 flexBetween max-container 
    padding-container relative z-30 py-5">
      {/* Logo */}
      <Link href="/">
        <Image src="/fierytrips.svg" alt="logo" width={74} height={29} />
      </Link>

      {/* Navigation Links (Hidden on Mobile) */}
      <ul
        className={`hidden h-full gap-12 lg:flex ${
          isMenuOpen ? "flex flex-col absolute top-20 right-0 bg-white p-4 shadow-lg" : ""
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link 
            href={link.href} 
            key={link.key} 
            className="regular-16 text-gray-50 cursor-pointer pb-1.5 transition-all 
hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      {/* Search Field */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="py-2 px-4 pr-10 rounded-full bg-gray-100 
focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <Image src="/search.svg" alt="search" width={20} height={20} />
        </button>
      </div>

      {/* Login Button (Hidden on Mobile) */}
      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
        />
      </div>

      {/* Hamburger Menu (Visible on Mobile) */}
      <div className="lg:hidden flex items-center">
      <Image
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block corsor-pointer lg:hidden"
        onClick={toggleMenu}
      />
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 right-0 bg-white p-4 shadow-lg rounded-lg">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link 
                href={link.href}
                key={link.key}
                className="regular-16 text-gray-50 cursor-pointer pb-1.5 transition-all hover:font-bold"
              >
                {link.label}
              </Link>
            ))}
            <Button
              type="button"
              title="Login"
              icon="user.svg"
              variant="btn_dark_green"
            />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar