import Navbar from "@/components/Navbar";
import Hero from "./pages_sections/landing_page_sections/hero";
import Image from "next/image";
import HowItWorks from "./pages_sections/landing_page_sections/how_it_works";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="md:mt-[5.75rem] mt-[3.8rem] mb-10">
        <Hero />
        <HowItWorks />
      </main>
    </>
  );
}
