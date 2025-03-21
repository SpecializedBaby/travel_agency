import React from 'react'
import Image from "next/image"

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  highlighted?: boolean
}

const ServiceCard = ({ icon, title, description, highlighted = false }: ServiceCardProps) => {
  return (
    <div
      className={`relative p-8 rounded-3xl transition-all duration-300 ${highlighted ? "bg-white shadow-xl" : "hover:shadow-lg"}`}
    >
      {highlighted && (
        <div className="absolute -bottom-6 -left-5 w-[117px] h-[100px] bg-[#DF6951] rounded-[30px_0px_10px_0px] -z-10">
          {/* This is the red rectangle decoration behind the "Best Flights" card */}
        </div>
      )}
      {/* Card Content */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FFF1DA] rounded-lg"></div>
          <Image src={icon} alt={title} width={80} height={80} className="relative z-10" />
        </div>
        <h3 className="text-xl font-bold text-[#1E1D4C] mb-3">{title}</h3>
        <p className="text-[#5E6282] max-w-xs">{description}</p>
      </div>
    </div>
  )
}

const Services = () => {
  const services = [
    {
      icon: "/services/weather_logo.png",
      title: "Calculated Weather",
      description: "Built Wicket longer admire do barton vanity itself do in it.",
      highlighted: false,
    },
    {
      icon: "/services/plane_logo.png",
      title: "Best Flights",
      description: "Engrossed listening. Park gate sell they west hard for the.",
      highlighted: true,
    },
    {
      icon: "/services/microfone_logo.png",
      title: "Local Events",
      description: "Barton vanity itself do in it. Preferd to men it engrossed listening.",
      highlighted: false,
    },
    {
      icon: "/services/set_logo.png",
      title: "Customization",
      description: "We deliver outsourced aviation services for military customers!",
      highlighted: false,
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* New decorative element in the upper right corner */}
      <div className="absolute top-20 right-0 w-[152px] h-[166px] -z-5 hidden md:block">
        <Image
          src="/services/decore.png"
          alt="Decorative element"
          width={152}
          height={166}
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#5E6282] uppercase tracking-widest">CATEGORY</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#14183E] mt-4">We Offer Best Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              highlighted={service.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services