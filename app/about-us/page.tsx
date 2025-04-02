import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import { MapPin, Award, Clock, Car, MessageCircle, PhoneCall } from "lucide-react"
import Testimonials from "@/components/Testimonials"
import Subscribe from "@/components/Subscribe"

export default function AboutUsPage() {
  const teamPhotos = [
    {
      id: "team-1",
      image: "/placeholder.svg?height=600&width=800",
      caption: "Our team exploring the mountains of Patagonia",
    },
    {
      id: "team-2",
      image: "/placeholder.svg?height=600&width=800",
      caption: "FieryTrips guides at our annual retreat in Bali",
    },
    {
      id: "team-3",
      image: "/placeholder.svg?height=600&width=800",
      caption: "Planning new adventures at our headquarters",
    },
  ]

  const valueProps = [
    {
      icon: <MapPin className="text-[#f26336]" size={24} />,
      title: "Unique Places",
      description: "We take you to destinations off the beaten path that most tourists never see.",
    },
    {
      icon: <Award className="text-[#f26336]" size={24} />,
      title: "Exclusive Experiences",
      description: "Enjoy one-of-a-kind activities and encounters that create lasting memories.",
    },
    {
      icon: <Clock className="text-[#f26336]" size={24} />,
      title: "Personalized Routes",
      description: "Every itinerary is crafted to match your interests and travel style.",
    },
    {
      icon: <Car className="text-[#f26336]" size={24} />,
      title: "Transfer Included",
      description: "Seamless transportation throughout your journey is always part of the package.",
    },
    {
      icon: <MessageCircle className="text-[#f26336]" size={24} />,
      title: "Recommendations",
      description: "Get insider tips on local cuisine, hidden gems, and cultural experiences.",
    },
    {
      icon: <PhoneCall className="text-[#f26336]" size={24} />,
      title: "24-hour Support",
      description: "Our team is always available to assist you throughout your adventure.",
    },
  ]

  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative h-[500px] mb-20">
          <Image
            src="/placeholder.svg?height=500&width=1920"
            alt="FieryTrips team on an adventure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
                <p className="text-xl">
                  A journey of passion, adventure, and friendship that spans continents and brings people together.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Who We Are Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#14183E] mb-4">What is FieryTrips?</h2>
              <div className="w-20 h-1 bg-[#f26336] mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#5E6282] text-lg mb-6">
                  We are a company of young enthusiasts who are in love with the road, we organize tours for like-minded
                  people who share our passion for authentic travel experiences.
                </p>
                <p className="text-[#5E6282] text-lg mb-6">
                  We try to become not just an accompanying person for everyone, but also a friend, so the main
                  principle is an individual approach, and no large groups (maximum 10 participants).
                </p>
                <p className="text-[#5E6282] text-lg mb-6">
                  On each trip you have an experienced guide who cares about your comfort and helps you get the most out
                  of your experience. If you love non-package travel and don't want to spend all the money in the world
                  on it, you are welcome!
                </p>
                <p className="text-[#5E6282] text-lg mb-6">
                  Founded by Daria Parkhomenko and joined by Dmytro, our small but passionate team combines travel
                  expertise with technical innovation to create unforgettable journeys for our growing community of
                  travelers.
                </p>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Daria and Dmytro, FieryTrips founders"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Our History Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#14183E] mb-4">Our History</h2>
              <div className="w-20 h-1 bg-[#f26336] mx-auto mb-8"></div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#f1a501]/20"></div>

              {/* Timeline items */}
              <div className="space-y-24 relative">
                {/* 2023 - The Beginning */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                    <h3 className="text-2xl font-bold text-[#14183E] mb-2">2023 - The Beginning</h3>
                    <p className="text-[#5E6282]">
                      FieryTrips was founded by Daria Parkhomenko, who started the company with a passion for authentic
                      travel experiences. In just one year, Daria successfully organized and led 40 tours, building a
                      reputation for personalized adventures and creating a community of like-minded travelers.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-12 relative">
                    <div className="absolute left-0 md:left-[-25px] top-0 md:top-1/2 transform md:-translate-y-1/2 md:translate-x-[-50%] w-12 h-12 rounded-full bg-[#f1a501] flex items-center justify-center z-10">
                      <span className="text-white font-bold">2023</span>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg ml-16 md:ml-0">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="Daria leading a tour"
                        width={500}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* 2024 - Growing Together */}
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="md:w-1/2 md:pl-12 md:text-left mb-8 md:mb-0">
                    <h3 className="text-2xl font-bold text-[#14183E] mb-2">2024 - Growing Together</h3>
                    <p className="text-[#5E6282]">
                      A pivotal year for FieryTrips as Daria met Dmytro, a talented developer who shared her vision for
                      transformative travel experiences. Together, they began expanding the company, with Dmytro
                      developing the website and joining Daria in leading tours, combining their complementary skills to
                      enhance the FieryTrips experience.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pr-12 relative">
                    <div className="absolute right-0 md:right-[-25px] top-0 md:top-1/2 transform md:-translate-y-1/2 md:translate-x-[50%] w-12 h-12 rounded-full bg-[#f1a501] flex items-center justify-center z-10">
                      <span className="text-white font-bold">2024</span>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg mr-16 md:mr-0">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="Daria and Dmytro working together"
                        width={500}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* 2025 - Digital Expansion */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                    <h3 className="text-2xl font-bold text-[#14183E] mb-2">2025 - Digital Expansion</h3>
                    <p className="text-[#5E6282]">
                      Our roadmap for 2025 focuses on technological advancement with the development of a cross-platform
                      website featuring a comprehensive admin panel. This innovation will allow travel authors from
                      around the world to join our platform, create and manage their own tours, and connect with
                      travelers seeking authentic experiences.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-12 relative">
                    <div className="absolute left-0 md:left-[-25px] top-0 md:top-1/2 transform md:-translate-y-1/2 md:translate-x-[-50%] w-12 h-12 rounded-full bg-[#f1a501] flex items-center justify-center z-10">
                      <span className="text-white font-bold">2025</span>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg ml-16 md:ml-0">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="Digital platform concept"
                        width={500}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* 2026 - Mobile Innovation */}
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="md:w-1/2 md:pl-12 md:text-left mb-8 md:mb-0">
                    <h3 className="text-2xl font-bold text-[#14183E] mb-2">2026 - Mobile Innovation</h3>
                    <p className="text-[#5E6282]">
                      Taking FieryTrips to the next level, we plan to launch mobile applications, beginning with iOS and
                      followed by Android. These apps will provide travelers with on-the-go access to our services,
                      real-time updates during trips, offline maps, and enhanced communication with guides and fellow
                      travelers.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pr-12 relative">
                    <div className="absolute right-0 md:right-[-25px] top-0 md:top-1/2 transform md:-translate-y-1/2 md:translate-x-[50%] w-12 h-12 rounded-full bg-[#f1a501] flex items-center justify-center z-10">
                      <span className="text-white font-bold">2026</span>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg mr-16 md:mr-0">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="Mobile app concept"
                        width={500}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* 2027 - Web3 Integration */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                    <h3 className="text-2xl font-bold text-[#14183E] mb-2">2027 - Web3 Integration</h3>
                    <p className="text-[#5E6282]">
                      Looking to the future, we envision FieryTrips at the forefront of travel innovation with Web3.0
                      integration. Our plans include implementing smart contracts for secure and transparent bookings,
                      expanding our network of professional travel authors through blockchain-verified credentials, and
                      creating a decentralized community of global explorers.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-12 relative">
                    <div className="absolute left-0 md:left-[-25px] top-0 md:top-1/2 transform md:-translate-y-1/2 md:translate-x-[-50%] w-12 h-12 rounded-full bg-[#f26336] flex items-center justify-center z-10">
                      <span className="text-white font-bold">2027</span>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg ml-16 md:ml-0">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="Web3 travel concept"
                        width={500}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Photos Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#14183E] mb-4">Our Team Adventures</h2>
              <div className="w-20 h-1 bg-[#f26336] mx-auto mb-8"></div>
              <p className="text-[#5E6282] max-w-2xl mx-auto">
                We don't just organize trips - we live for adventure ourselves. Here are some moments from our team
                journeys around the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamPhotos.map((photo) => (
                <div key={photo.id} className="group relative overflow-hidden rounded-2xl shadow-lg">
                  <div className="aspect-w-4 aspect-h-3 h-80 relative">
                    <Image
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-medium">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Value Propositions */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#14183E] mb-4">What Makes Us Different</h2>
              <div className="w-20 h-1 bg-[#f26336] mx-auto mb-8"></div>
              <p className="text-[#5E6282] max-w-2xl mx-auto">
                At FieryTrips, we believe travel should be transformative, authentic, and hassle-free. Here's what you
                can expect when you journey with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valueProps.map((prop, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-[#f26336]/10 rounded-full flex items-center justify-center mb-4">
                    {prop.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#14183E] mb-2">{prop.title}</h3>
                  <p className="text-[#5E6282]">{prop.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Testimonials />
      <Subscribe />
    </div>
  )
}
