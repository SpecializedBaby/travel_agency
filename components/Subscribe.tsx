import { Send } from "lucide-react"
import Image from "next/image"

export default function Subscribe() {
  return (
    <section className="py-20 relative">
      <div className="container">
        <div className="relative bg-[#DFD7F9] rounded-[120px_20px_20px_20px] bg-opacity-20 py-16 px-8 md:px-16">
          {/* Decorative elements */}
          <div className="absolute w-full h-full top-0 left-0 -z-10 overflow-hidden">
            {/* Right decorative image (unchanged) */}
            <div className="absolute w-[264px] h-[352px] -top-10 -right-10">
              <Image
                src="/RightDecore.png"
                alt="Decorative background"
                width={264}
                height={352}
                className="object-cover"
              />
            </div>

            {/* Left decorative image (unchanged) */}
            <div className="absolute w-[380px] h-[260px] top-20 left-5">
              <Image
                src="/LeftDecore.png"
                alt="Decorative background"
                width={380}
                height={260}
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Paper airplane icon - moved to top left corner */}
          <div className="absolute top-0 -right-10 z-10 transform -translate-y-1/2 -translate-x-1/4">
              <Image
                src="Subscribe/PaperSender.png"
                alt="Paper Sender icon"
                width={70}
                height={70}
                className="object-contain"
              />
          </div>

          {/* Decorative element in bottom right corner - positioned closer to frame */}
          <div className="absolute bottom-0 -right-[60px] -z-10 w-[200px] h-[200px] transform translate-x-[30%] translate-y-[30%] pointer-events-none">
            <Image
              src="/Subscribe/Decorate.png"
              alt="Decorative element"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5E6282] mb-12">
              Subscribe to get information, latest news and other interesting offers about Jadoo
            </h2>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#39425D]">
                  <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 6L9.65 10.65C9.85 10.85 10.15 10.85 10.35 10.65L16 6"
                      stroke="#39425D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect x="1" y="1" width="19" height="16" rx="4" stroke="#39425D" strokeWidth="2" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full py-4 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6246e5] border-0 h-[68px]"
                />
              </div>
              <button className="w-full md:w-auto bg-[#ff7152] hover:bg-[#ff7152]/90 text-white font-medium py-4 px-8 rounded-lg transition-colors h-[68px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}