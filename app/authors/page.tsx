
import AuthorCard from "@/components/AuthorCard"

export default function AuthorsPage() {
  // Sample authors data - would come from an API in a real application
  const authors = [
    {
      id: "john-smith",
      name: "John Smith",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Travel Photographer",
      description:
        "Award-winning photographer specializing in landscape and cultural photography. Has traveled to over 50 countries documenting diverse cultures and natural wonders.",
      rating: 4.9,
      tripCount: 12,
    },
    {
      id: "emma-johnson",
      name: "Emma Johnson",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Adventure Guide",
      description:
        "Former mountain climber turned adventure guide with expertise in extreme environments. Leads expeditions to some of the world's most challenging destinations.",
      rating: 4.8,
      tripCount: 8,
    },
    {
      id: "david-chen",
      name: "David Chen",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Culinary Explorer",
      description:
        "Culinary expert who explores the world through its food. Specializes in food-focused tours that highlight local cuisines, cooking techniques, and food traditions.",
      rating: 4.7,
      tripCount: 15,
    },
    {
      id: "sophia-rodriguez",
      name: "Sophia Rodriguez",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Cultural Anthropologist",
      description:
        "Anthropologist with a focus on indigenous cultures. Creates immersive travel experiences that provide authentic cultural exchanges and learning opportunities.",
      rating: 4.9,
      tripCount: 10,
    },
    {
      id: "michael-patel",
      name: "Michael Patel",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Wildlife Expert",
      description:
        "Zoologist and wildlife conservationist who leads safari and nature expeditions. Specializes in responsible wildlife tourism and conservation education.",
      rating: 4.8,
      tripCount: 9,
    },
    {
      id: "olivia-kim",
      name: "Olivia Kim",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Historical Guide",
      description:
        "Historian specializing in ancient civilizations. Creates tours that bring history to life through storytelling and visits to archaeological sites and historical landmarks.",
      rating: 4.6,
      tripCount: 11,
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Marine Biologist",
      description:
        "Marine biologist focused on ocean conservation. Leads diving and snorkeling expeditions that explore marine ecosystems while promoting ocean preservation.",
      rating: 4.7,
      tripCount: 7,
    },
    {
      id: "natalia-ivanova",
      name: "Natalia Ivanova",
      image: "/placeholder.svg?height=400&width=400",
      profession: "Expedition Leader",
      description:
        "Experienced expedition leader specializing in remote destinations. Has led groups through the Arctic, Antarctica, and other challenging environments.",
      rating: 4.9,
      tripCount: 14,
    },
  ]

  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#14183E] mb-4">Meet Our Authors</h1>
            <p className="text-[#5E6282] max-w-2xl mx-auto">
              Discover the passionate experts who create and lead our unique travel experiences around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {authors.map((author) => (
              <AuthorCard
                key={author.id}
                id={author.id}
                name={author.name}
                image={author.image}
                profession={author.profession}
                description={author.description}
                rating={author.rating}
                tripCount={author.tripCount}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
