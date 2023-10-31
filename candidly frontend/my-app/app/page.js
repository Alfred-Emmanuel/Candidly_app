import Navbar from "@/components/Navbar";
import Hero from "./pages_sections/landing_page_sections/hero";
import Image from "next/image";
import Link from "next/link";
import HowItWorks from "./pages_sections/landing_page_sections/how_it_works";
import WorkplaceRevolution from "./pages_sections/landing_page_sections/workplace_revolution";
import CompaniesLove from "./pages_sections/landing_page_sections/companies_love";
import GetStarted from "./pages_sections/landing_page_sections/get_started";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="md:mt-[5.75rem] mt-[3.8rem] mb-10">
        <Hero />
        <HowItWorks />
        <WorkplaceRevolution />
        <CompaniesLove />
        <GetStarted />
      </main>
    </>
  );
}
