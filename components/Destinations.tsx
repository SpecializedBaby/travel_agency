import React from 'react'
import Image from "next/image"

interface DestinationCardProps {
  image: string
  title: string
  price: string
  duration: string
}

const DestinationCard = ({ image, title, price, duration }: DestinationCardProps) => {
  return (
    <div className="rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-72">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-[#5E6282]">{title}</h3>
          <span className="text-lg font-medium text-[#5E6282]">{price}</span>
        </div>
        <div className="flex items-center gap-2 text-[#5E6282]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="#5E6282"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 4.20001V9.00001L12.2 10.6"
              stroke="#5E6282"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  )
}

const Destinations = () => {
  const destinations = [
    {
      image: "/placeholder.svg?height=400&width=300",
      title: "Rome, Italy",
      price: "$5,42k",
      duration: "10 Days Trip",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      title: "London, UK",
      price: "$4.2k",
      duration: "12 Days Trip",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      title: "Paris, France",
      price: "$15k",
      duration: "26 Days Trip",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      title: "New York, USA",
      price: "$4.5k",
      duration: "8 Days Trip",
    },
  ]

  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#5E6282] uppercase tracking-widest">TOP SELLING</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#14183E] mt-4">Top Destinations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              image={destination.image}
              title={destination.title}
              price={destination.price}
              duration={destination.duration}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destinations