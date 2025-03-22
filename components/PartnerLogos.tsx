import Image from "next/image"



const PartnerLogos = () => {
  const partners = [
    {
      name: "Axon Airlines",
      logo: "/placeholder.svg?height=60&width=150",
    },
    {
      name: "Jetstar",
      logo: "/placeholder.svg?height=60&width=150",
    },
    {
      name: "Expedia",
      logo: "/placeholder.svg?height=60&width=150",
    },
    {
      name: "Qantas",
      logo: "/placeholder.svg?height=60&width=150",
    },
    {
      name: "Alitalia",
      logo: "/placeholder.svg?height=60&width=150",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-[#5E6282] uppercase tracking-widest mb-2">PARTNERS</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-[#14183E]">Trusted by Leading Travel Brands</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-[120px] md:w-[150px] h-[60px] relative grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerLogos