"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react"

interface TripDate {
  from: string
  to: string
}

interface TripCardProps {
  id: string
  image: string
  title: string
  destination: string
  dates: TripDate[]
  status: "Available" | "Limited" | "Sold Out"
  price: number
  author: string
}

export default function TripCard({id, image, title, destination, dates, status, price, author}: TripCardProps) {
  const [expanded, setExpanded] = useState(false)

  // Format date display to display as "02 April - 10 April 2025"
  const formatDateRange = (from: string, to: string) => {
    const fromDate = new Date(from)
    const toDate = new Date(to)

    const fromDay = fromDate.getDate()
    const fromMonth = fromDate.toLocaleString("default", { month: "short" })
    const fromYear = fromDate.getFullYear()

    const toDay = toDate.getDate()
    const toMonth = toDate.toLocaleString("default", { month: "short" })
    const toYear = toDate.getFullYear()

    if (fromYear === toYear && fromMonth === toMonth) {
      return `${fromDay} - ${toDay} ${fromMonth} ${fromYear}`
    } else if (fromYear === toYear) {
      return `${fromDay} ${fromMonth} - ${toDay} ${toMonth} ${fromYear}`
    } else {
      return `${fromDay} ${fromMonth} ${fromYear} - ${toDay} ${toMonth} ${toYear}`
    }
  }

  // Get Status color
  const getStatusColor = () => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-600"
      case "Limited":
        return "bg-amber-100 text-amber-600"
      case "Sold Out":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className={`absolute top-4 right-4 ${getStatusColor()} px-3 py-1 rounded-full text-xs font-medium`}>
          {status}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#14183E] mb-2">{title}</h3>

        <div className="flex items-center text-[#5E6282] mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{destination}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-[#5E6282]">
              <Calendar size={16} className="mr-1" />
              <span>Travel dates:</span>
            </div>

            {dates.length > 1 && (
              <button className="text-[#f26336] text-sm flex items-center" onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    <span>Show all ({dates.length})</span>
                    <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </button>
            )}
          </div>

          <div className="space-y-2">
            {dates.slice(0, expanded ? dates.length : 1).map((date, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md text-sm">
                {formatDateRange(date.from, date.to)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[#5E6282]">By {author}</div>
            <div className="text-xl font-bold text-[#14183E]">€{price}</div>
          </div>

          <Link
            href={`/authors-trips/${id}`}
            className="bg-[#f1a501] text-white px-4 py-2 rounded-lg hover:bg-[#f1a501]/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
