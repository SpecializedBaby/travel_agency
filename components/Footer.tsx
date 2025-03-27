import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Desktop layout - 5 columns */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8 lg:mb-16">
          {/* Brand Column */}
          <div>
            <h2 className="footer-brand">FieryTrips</h2>
            <p className="footer-text max-w-xs">Book your trip in minute, get full Control for much longer.</p>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="footer-title">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Mobile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="footer-title">Contact</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="footer-link">
                  Help/FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>

          {/* More Column */}
          <div>
            <h3 className="footer-title">More</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="footer-link">
                  Airlinefees
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Airline
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Low fare tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & App Column */}
          <div>
            <div className="space-y-4">
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link href="#" aria-label="Facebook">
                  <Image
                    src="\fotter\FB.png"
                    alt="Facebook"
                    width={41}
                    height={41}
                    className="w-auto h-auto"
                  />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Image
                    src="\fotter\Inst.png"
                    alt="Facebook"
                    width={45}
                    height={45}
                    className="w-auto h-auto"
                  />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Image
                    src="\fotter\X.png"
                    alt="Facebook"
                    width={41}
                    height={41}
                    className="w-auto h-auto"
                  />
                </Link>
              </div>

              <h3 className="footer-title">Discover our app</h3>
              {/* App Store Buttons */}
              <div className="flex flex-row space-x-3">
                <Link href="#" className="block w-32">
                  <Image
                    src="\fotter\Google_Play.png"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <Link href="#" className="block w-32">
                  <Image
                    src="\fotter\Play_Store.png"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile and Tablet layout - stacked rows */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Row 1: Brand */}
          <div className="text-center mb-12">
            <h2 className="footer-brand">FieryTrips</h2>
            <p className="footer-text max-w-xs mx-auto">Book your trip in minute, get full Control for much longer.</p>
          </div>

          {/* Row 2: Link columns */}
          <div className="grid grid-cols-3 gap-8 mb-12 w-full max-w-2xl">
            {/* Company Column */}
            <div className="text-center">
              <h3 className="footer-title">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="footer-link">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Mobile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="text-center">
              <h3 className="footer-title">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="footer-link">
                    Help/FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Affiliates
                  </Link>
                </li>
              </ul>
            </div>

            {/* More Column */}
            <div className="text-center">
              <h3 className="footer-title">More</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="footer-link">
                    Airlinefees
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Airline
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Low fare tips
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 3: Social and App */}
          <div className="text-center mb-12">
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mb-6">
              <Link href="#" aria-label="Facebook">
                <div className="footer-social-icon bg-white">
                  <Facebook size={20} className="text-[#080809]" />
                </div>
              </Link>
              <Link href="#" aria-label="Instagram">
                <div className="footer-social-icon bg-gradient-to-r from-[#f15a2b] to-[#2196f3]">
                  <Instagram size={20} className="text-white" />
                </div>
              </Link>
              <Link href="#" aria-label="Twitter">
                <div className="footer-social-icon bg-white">
                  <Twitter size={20} className="text-[#080809]" />
                </div>
              </Link>
            </div>

            <h3 className="footer-title mb-4">Discover our app</h3>
            <div className="flex flex-row justify-center gap-4">
              <Link href="#" className="block">
                <Image
                  src="\fotter\Google_Play.png"
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="#" className="block">
                <Image
                  src="\fotter\Play_Store.png"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright - always centered */}
        <div className="footer-copyright">
          <p className="footer-text">Copyright 2025. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer