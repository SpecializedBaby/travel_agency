import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Globe, Award, Calendar } from 'lucide-react'

interface AuthorCardProps {
  id: string
  name: string
  image: string
  profession: string
  description: string
  rating: number
  tripCount: number
}

export default function AuthorCard({ 
  id, 
  name, 
  image, 
  profession, 
  description, 
  rating, 
  tripCount 
}: AuthorCardProps) {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="fill-[#FFC107] text-[#FFC107]" size={16} />
      )
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-[#E5E5E5]" size={16} />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="fill-[#FFC107] text-[#FFC107]" size={16} />
          </div>
        </div>
      )
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="text-[#E5E5E5]" size={16} />
      )
    }
    
    return stars
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative h-64">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
          <h3 className="text-xl font-bold text-[#14183E]">{name}</h3>
          <p className="text-[#14183E] font-light">{profession}</p>
          </div>

          <div className="flex items-center">
            <span className="font-bold text-[#14183E] mr-1">{rating.toFixed(1)}</span>
            <div className="flex">
              {renderStars()}
            </div>
          </div>
        </div>

        <p className="text-[#5E6282] text-sm mb-4 line-clamp-3">{description}</p>

        <div className="space-y-3 mb-4 flex-grow">
          <div className="flex items-center text-[#5E6282] text-sm">
            <MapPin size={16} className="mr-2 text-[#f26336]" />
            <span>
              Leads {tripCount} {tripCount === 1 ? "trip" : "trips"} across multiple continents
            </span>
          </div>
          
        
          <Link
            href={`/authors/${id}/`}
            className="block w-full bg-[#f1a501] text-white text-center py-3 rounded-lg hover:bg-[#f1a501]/90 transition-colors font-medium"
          >
            View Trips
          </Link>
        </div>
      </div>
    </div>
  )
}
