import React from 'react'
import Image from "next/image"
import { Map, Building2, Send, Heart } from "lucide-react"

interface BookingStepProps {
  icon: React.ReactNode
  title: string
  description: string
  iconBgColor: string
}

function BookingStep({ icon, title, description, iconBgColor }: BookingStepProps) {
  return (
    <div className="flex items-start mb-8">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${iconBgColor}`}>{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-[#14183E]">{title}</h3>
        <p className="text-[#5E6282]">{description}</p>
      </div>
    </div>
  )
}

const BookTrip = () => {
  const bookingSteps = [
    {
      icon: <Map className="text-white" size={24} />,
      title: "Choose Destination",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
      iconBgColor: "bg-[#F0BB1F]",
    },
    {
      icon: <Building2 className="text-white" size={24} />,
      title: "Make Payment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
      iconBgColor: "bg-[#F15A2B]",
    },
    {
      icon: <Send className="text-white" size={24} />,
      title: "Reach Airport on Selected Date",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
      iconBgColor: "bg-[#006380]",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#5E6282] font-medium">Easy and Fast</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#14183E] mt-4 mb-16">
              Book Your Next Trip
              <br />
              In 3 Easy Steps
            </h2>

            <div>
              {bookingSteps.map((step, index) => (
                <BookingStep
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  iconBgColor={step.iconBgColor}
                />
              ))}
            </div>
          </div>

          {/* Right section - Trip cards */}
          <div className="relative flex flex-col items-center w-full md:w-[485px] mx-auto">
            {/* Blue blur effect */}
            <div className="absolute w-[354px] h-[367px] top-0 left-[66px] bg-[#59b1e6] rounded-[177px/183.5px] blur-[75px] opacity-40" />

            <div className="relative h-[400px] w-full md:w-[485px]">
              {/* Main trip card */}
              <div className="absolute w-full md:w-[370px] h-[400px] top-0 left-0 rounded-[26px] bg-white shadow-xl mx-[25px] my-[20px]">
                <div className="p-0">
                  <div className="w-[calc(100%-50px)] h-[161px] mt-5 mx-auto overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=161&width=321"
                      alt="Trip to Greece"
                      width={321}
                      height={161}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="px-[25px] pt-[20px]">
                    <h3 className="font-medium text-black text-lg leading-[26px]">Trip To Greece</h3>

                    <div className="flex items-center mt-[14px]">
                      <span className="font-medium text-[#84829A] text-base leading-[22px]">14-29 June</span>
                      <div className="w-px h-4 mx-3 bg-gray-300" />
                      <span className="font-medium text-[#84829A] text-base leading-[22px]">by Robbin joseph</span>
                    </div>

                    <div className="flex gap-3 mt-[20px]">
                      <div className="w-9 h-9 bg-[#F5F5F5] rounded-[18px] flex items-center justify-center">
                        <Map size={14} className="text-[#84829A]" />
                      </div>

                      <div className="w-9 h-9 bg-[#F5F5F5] rounded-[18px] flex items-center justify-center">
                        <Building2 size={14} className="text-[#84829A]" />
                      </div>

                      <div className="w-9 h-9 bg-[#F5F5F5] rounded-[18px] flex items-center justify-center">
                        <Send size={14} className="text-[#84829A]" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-[18px]">
                      <div className="flex items-center">
                        <Building2 size={16} className="text-[#84829A]" />
                        <span className="ml-3 font-medium text-[#84829A] text-base leading-[22px]">
                          24 people going
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                        <Heart size={18} className="text-[#4152CA]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating trip card */}
              <div className="absolute w-[263px] h-[129px] top-[219px] left-[50%] md:left-[222px] transform -translate-x-1/2 md:translate-x-0 rounded-[18px] bg-white shadow-xl">
                <div className="p-4 relative">
                  <div className="flex items-start">
                    <div className="w-[50px] h-[50px] rounded-full shadow-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=50&width=50"
                        alt="Rome trip"
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="ml-4">
                      <span className="text-[#84829A] font-medium text-sm tracking-[-0.49px]">Ongoing</span>
                      <h4 className="font-medium text-black text-lg tracking-[-0.27px] mt-1">Trip to rome</h4>
                      <div className="mt-3 text-sm">
                        <span className="font-medium text-[#8a79df] tracking-[-0.11px]">40%</span>
                        <span className="font-medium text-[#080808]"> completed</span>
                      </div>

                      <div className="mt-3 w-[156px] bg-gray-200 rounded-full h-1.5">
                        <div className="bg-[#8A79DF] h-1.5 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookTrip