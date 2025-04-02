import Testimonials from "@/components/Testimonials"
import Subscribe from "@/components/Subscribe"

import Tripfilters from "@/components/TripFilters";
import TripCard from "@/components/TripCard"

export default function Tours () {
  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20">
      <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#14183E] mb-4">Authors' Trips</h1>
            <p className="text-[#5E6282] max-w-2xl mx-auto">
              Discover unique travel experiences curated by our expert authors. Join them on their next adventure.
            </p>
          </div>

          <Tripfilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* We'll assume these would be populated from API data */}
            <TripCard
              id="trip1"
              image="/placeholder.svg?height=300&width=400"
              title="Exploring Ancient Temples"
              destination="Asia"
              dates={[
                { from: "2025-06-10", to: "2025-06-24" },
                { from: "2025-07-15", to: "2025-07-29" },
              ]}
              status="Available"
              price={1250}
              author="John Smith"
            />

            <TripCard
              id="trip2"
              image="/placeholder.svg?height=300&width=400"
              title="Northern Lights Adventure"
              destination="Europe"
              dates={[{ from: "2025-09-05", to: "2025-09-15" }]}
              status="Limited"
              price={1800}
              author="Emma Johnson"
            />

            <TripCard
              id="trip3"
              image="/placeholder.svg?height=300&width=400"
              title="Trans-Siberian Railway"
              destination="Russia"
              dates={[{ from: "2025-08-01", to: "2025-08-14" }]}
              status="Sold Out"
              price={2100}
              author="Alex Petrov"
            />

            <TripCard
              id="trip4"
              image="/placeholder.svg?height=300&width=400"
              title="Mediterranean Cruise"
              destination="Europe"
              dates={[
                { from: "2025-07-10", to: "2025-07-24" },
                { from: "2025-08-15", to: "2025-08-29" },
              ]}
              status="Available"
              price={1650}
              author="Sarah Williams"
            />

            <TripCard
              id="trip5"
              image="/placeholder.svg?height=300&width=400"
              title="Cherry Blossom Tour"
              destination="Asia"
              dates={[{ from: "2026-03-20", to: "2026-04-05" }]}
              status="Available"
              price={2200}
              author="David Chen"
            />

            <TripCard
              id="trip6"
              image="/placeholder.svg?height=300&width=400"
              title="Volga River Cruise"
              destination="Russia"
              dates={[{ from: "2025-06-15", to: "2025-06-30" }]}
              status="Limited"
              price={1950}
              author="Natalia Ivanova"
            />
          </div>
        </div>
      </main>
      <Testimonials />
      <Subscribe />
    </div>
  );
}
