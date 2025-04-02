"use client"

import { useState } from "react"
import { Check, ChevronDown, Calendar, MapPin, Users } from "lucide-react"

export default function Tripfilters() {
  const [monthOpen, setMonthOpen] = useState(false)
  const [destinationOpen, setDestinationOpen] = useState(false)
  const [availabilityOpen, setAvailabilityOpen] = useState(false)

  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const destinations = ["Asia", "Europe", "Russia"]
  const availabilityOptions = ["Available", "Limited", "Sold Out"]

  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) => (prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]))
  }

  const toggleDestination = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination) ? prev.filter((d) => d !== destination) : [...prev, destination],
    )
  }

  const toggleAvailability = (availability: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(availability) ? prev.filter((a) => a !== availability) : [...prev, availability],
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#14183E] mb-6">Filter Trips</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Month Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setMonthOpen(!monthOpen)}
          >
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <span>{selectedMonths.length ? `${selectedMonths.length} selected` : "Month"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${monthOpen ? "rotate-180" : ""}`} />
          </button>

          {monthOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                {months.map((month) => (
                  <div
                    key={month}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => toggleMonth(month)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${selectedMonths.includes(month) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"}`}
                    >
                      {selectedMonths.includes(month) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{month}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Destination Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setDestinationOpen(!destinationOpen)}
          >
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>{selectedDestinations.length ? `${selectedDestinations.length} selected` : "Destination"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${destinationOpen ? "rotate-180" : ""}`} />
          </button>

          {destinationOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg">
              <div className="p-2">
                {destinations.map((destination) => (
                  <div
                    key={destination}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => toggleDestination(destination)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${selectedDestinations.includes(destination) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"}`}
                    >
                      {selectedDestinations.includes(destination) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{destination}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Availability Filter */}
        <div className="relative">
          <label className="flex items-center p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282] cursor-pointer">
            <div className="flex items-center flex-1">
              <Users size={18} className="mr-2" />
              <span>Available Only</span>
            </div>
            <input
              type="checkbox"
              checked={selectedAvailability.includes("Available")}
              onChange={() => {
                if (selectedAvailability.includes("Available")) {
                  setSelectedAvailability([])
                } else {
                  setSelectedAvailability(["Available"])
                }
              }}
              className="h-5 w-5 rounded border-[#c4c4c4] text-[#f26336] focus:ring-[#f26336]"
            />
          </label>
        </div>
      </div>

      {/* Applied Filters */}
      {(selectedMonths.length > 0 || selectedDestinations.length > 0 || selectedAvailability.length > 0) && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedMonths.map((month) => (
            <div
              key={month}
              className="bg-[#f26336]/10 text-[#f26336] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {month}
              <button className="ml-2" onClick={() => toggleMonth(month)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="#f26336"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          {selectedDestinations.map((destination) => (
            <div
              key={destination}
              className="bg-[#f1a501]/10 text-[#f1a501] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {destination}
              <button className="ml-2" onClick={() => toggleDestination(destination)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="#f1a501"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          {selectedAvailability.map((availability) => (
            <div
              key={availability}
              className="bg-[#8A79DF]/10 text-[#8A79DF] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {availability}
              <button className="ml-2" onClick={() => toggleAvailability(availability)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="#8A79DF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button
            className="text-[#5E6282] text-sm underline ml-2"
            onClick={() => {
              setSelectedMonths([])
              setSelectedDestinations([])
              setSelectedAvailability([])
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
