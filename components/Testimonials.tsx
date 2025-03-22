"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  location: string
  quote: string
  avatar: string
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Mike taylor",
      location: "Lahore, Pakistan",
      quote:
        "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
      avatar: "/person-1.png",
    },
    {
      id: 2,
      name: "Chris Thomas",
      location: "CEO of Red Button",
      quote:
        "Jadoo is the best travel agency I've ever worked with. They truly understand what makes a trip special and memorable.",
      avatar: "/person-2.png",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      location: "New York, USA",
      quote:
        "My family and I had an incredible experience with our tour guide. The destinations were breathtaking and the service was impeccable.",
      avatar: "/person-3.png",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }

  const getNextIndex = () => {
    return (currentIndex + 1) % testimonials.length
  }

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Title and pagination */}
          <div className="space-y-8">
            <div>
              <h3 className="section-subtitle mb-2">TESTIMONIALS</h3>
              <h2 className="section-title leading-tight">
                What People Say <br />
                About Us.
              </h2>
            </div>

            {/* Pagination dots */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`pagination-dot ${
                    index === currentIndex ? "pagination-dot-active" : "pagination-dot-inactive"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Testimonials */}
          <div className="relative h-[400px] md:h-[350px]">
            {/* Main testimonial */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={testimonials[currentIndex].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="absolute top-0 left-0 right-0 z-10"
              >
                <div className="relative pt-12">
                  {/* Avatar */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="testimonial-avatar">
                      <Image
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        width={70}
                        height={70}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Testimonial card */}
                  <div className="testimonial-card">
                    <p className="card-text text-center mb-6">"{testimonials[currentIndex].quote}"</p>
                    <div className="text-center">
                      <h4 className="text-[#14183E] font-bold text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="card-text">{testimonials[currentIndex].location}</p>
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 flex flex-col space-y-2">
                    <button
                      onClick={prevTestimonial}
                      className="testimonial-nav-button"
                      aria-label="Previous testimonial"
                    >
                      <ChevronUp size={20} />
                    </button>
                    <button onClick={nextTestimonial} className="testimonial-nav-button" aria-label="Next testimonial">
                      <ChevronDown size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Secondary testimonial (inactive) */}
            <div className="absolute top-[220px] left-0 right-0 opacity-50 z-0">
              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonials[getNextIndex()].avatar || "/placeholder.svg"}
                      alt={testimonials[getNextIndex()].name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#14183E] font-bold">{testimonials[getNextIndex()].name}</h4>
                    <p className="card-text text-sm">{testimonials[getNextIndex()].location}</p>
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

export default Testimonials