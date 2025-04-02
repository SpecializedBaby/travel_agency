import CountryCard from "@/components/CountryCard"

export default function Countries() {
  // Sample countries data
  const countries = [
    {
      id: "italy",
      name: "Italy",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 24,
    },
    {
      id: "japan",
      name: "Japan",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 18,
    },
    {
      id: "france",
      name: "France",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 32,
    },
    {
      id: "thailand",
      name: "Thailand",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 15,
    },
    {
      id: "spain",
      name: "Spain",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 27,
    },
    {
      id: "greece",
      name: "Greece",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 21,
    },
    {
      id: "australia",
      name: "Australia",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 12,
    },
    {
      id: "brazil",
      name: "Brazil",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 9,
    },
    {
      id: "egypt",
      name: "Egypt",
      image: "/placeholder.svg?height=400&width=600",
      tripCount: 14,
    },
  ]

  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20">
      <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#14183E] mb-4">Explore Countries</h1>
            <p className="text-[#5E6282] max-w-2xl mx-auto">
              Discover amazing destinations around the world and find the perfect trip for your next adventure.
            </p>
          </div>

          {/* All Countries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
              <CountryCard
                key={country.id}
                id={country.id}
                name={country.name}
                image={country.image}
                tripCount={country.tripCount}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
