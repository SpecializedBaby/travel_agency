import Services from "@/components/Services";
import BookTrip from "@/components/BookTrip";
import Testimonials from "@/components/Testimonials";
import Destinations from "@/components/Destinations";
import Hero from "@/components/Hero";
import PartnerLogos from "@/components/PartnerLogos";
import Subscribe from "@/components/Subscribe";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Destinations />
      <BookTrip />
      <Testimonials />
      <PartnerLogos />
      <Subscribe />
    </>
  );
}
