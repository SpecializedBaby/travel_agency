import Image from "next/image"
import { Play } from "lucide-react"
import Button from "./Button"

export default function Hero() {
  return (
    <div className="relative pt-24">
      {/* Left purple blur effect */}
      <div className="absolute left-0 top-0 -z-15 w-full h-full overflow-hidden">
        <svg
          width="241"
          height="647"
          viewBox="0 0 241 647"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-full absolute -left-20 top-0"
        >
          <g opacity="0.8" filter="url(#filter0_f_2780_762)">
            <ellipse
              cx="233.472"
              cy="248.432"
              rx="233.472"
              ry="248.432"
              transform="matrix(-1 0 0 1 90.9443 0)"
              fill="#D5AEE4"
              fillOpacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_2780_762"
              x="-526"
              y="-150"
              width="766.944"
              height="796.864"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_2780_762" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Main background shape */}
      <div className="absolute top-0 right-0 -z-15 w-full h-full overflow-hidden hidden lg:block">
        <svg
          width="693"
          height="741"
          viewBox="0 0 693 741"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-full absolute top-0 right-0"
        >
          <path
            d="M22.3069 239C-18.0931 170.2 5.4736 30.3333 22.3069 -31L701.807 -132L766.307 139.5L727.807 740.5C649.14 741.5 473.707 734 401.307 696C310.807 648.5 351.807 572 276.807 532C201.807 492 244.807 386.5 218.807 346.5C192.807 306.5 72.8069 325 22.3069 239Z"
            fill="#FFF1DA"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-[#f26336] font-bold tracking-wide">BEST DESTINATIONS AROUND THE WORLD</h2>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#181e4b] leading-tight">
              Travel,{" "}
              <span className="relative inline-block">
                enjoy
                {/* Custom underline from Figma */}
                <img 
                src="/underline.svg" 
                className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[520px] scale-150 ml-5" 
                alt="Decore">
                </img>
              </span>{" "}
              <br className="hidden md:inline" />
              and live a new <br className="hidden md:inline" />
              and full life
            </h1>

            <p className="text-[#5e6282] max-w-md mx-auto lg:mx-0">
              Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed
              listening. Park gate sell they west hard for the.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-6">
              <Button variant="primary">Find out more</Button>

              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-full bg-[#df6951] flex items-center justify-center text-white hover:bg-[#df6951]/90 transition-colors shadow-lg shadow-[#df6951]/30">
                  <Play size={18} />
                </button>
                <span className="text-[#686d77] font-medium">Play Demo</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/hero_image.png"
              alt="Traveler with backpack"
              width={600}
              height={600}
              className="w-full h-auto"
            />

            <div className="absolute top-1/4 left-0 -translate-x-1/2">
              <Image src="/plane.svg" alt="Airplane decoration" width={80} height={80} />
            </div>

            <div className="absolute bottom-1/4 right-0 translate-x-1/3">
              <Image src="/plane.svg" alt="Airplane decoration" width={80} height={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

