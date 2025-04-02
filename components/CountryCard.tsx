import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

interface CountryCardProps {
  id: string
  name: string
  image: string
  tripCount: number
}

export default function CountryCard({ id, name, image, tripCount }: CountryCardProps) {
  return (
    <Link href={`/countries/${id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-60">
          <Image src={image || "/placeholder.svg"} alt={`${name} landscape`} fill className="object-cover" />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>
                {tripCount} {tripCount === 1 ? "trip" : "trips"} available
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
