"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: "primary" | "outline"
  className?: string
  onClick?: () => void
}

export default function Button({ children, href, variant = "primary", className = "", onClick }: ButtonProps) {
  const buttonClasses = `btn ${variant === "primary" ? "btn-primary" : "btn-outline"} ${className}`

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  )
}