import { ArrowBigRight } from "lucide-react";
import Image from 'next/image';

function GetStarted() {
  return (
    <section className="pt-10 px-5 md:px-28">
      <h1 className="text-2xl font-serif">
        GET STARTED <br />{" "}
        <span className="text-primaryColor text-3xl">TODAY</span>
      </h1>
      <div className="mt-10 md:flex gap-10 px-10 md:px-5">
        <div className="bg-[#1D5F6F] md:w-[22%] rounded-lg text-white pt-5 pb-2 px-5 md:px-0 mb-10 md:mb-0 relative">
          <ArrowBigRight className="absolute bottom-0 left-1" />
          <div className="mx-auto md:w-[50%] mb-5">
            <p>I lead a team at a corporate organization</p>
          </div>
          <Image
            src={`/two-women.png`}
            width={150}
            height={50}
            alt="#"
            className="mx-auto"
          />
        </div>
        <div className="bg-[#1D5F6F] md:w-[22%] rounded-lg text-white pt-5 pb-2 px-5 md:px-0 mb-10 md:mb-0 relative">
          <ArrowBigRight className="absolute bottom-0 left-1" />
          <div className="mx-auto md:w-[50%] mb-5">
            <p>I lead a team at a corporate organization</p>
          </div>
          <Image
            src={`/two-women.png`}
            width={150}
            height={50}
            alt="#"
            className="mx-auto"
          />
        </div>
        <div className="bg-[#1D5F6F] md:w-[22%] rounded-lg text-white pt-5 pb-2 px-5 md:px-0 mb-10 md:mb-0 relative">
          <ArrowBigRight className="absolute bottom-0 left-1" />
          <div className="mx-auto md:w-[50%] mb-5">
            <p>I lead a team at a corporate organization</p>
          </div>
          <Image
            src={`/two-women.png`}
            width={150}
            height={50}
            alt="#"
            className="mx-auto"
          />
        </div>
        <div className="bg-[#1D5F6F] md:w-[22%] rounded-lg text-white pt-5 pb-2 px-5 md:px-0 mb-10 md:mb-0 relative">
          <ArrowBigRight className="absolute bottom-0 left-1" />
          <div className="mx-auto md:w-[50%] mb-5">
            <p>I lead a team at a corporate organization</p>
          </div>
          <Image
            src={`/two-women.png`}
            width={150}
            height={50}
            alt="#"
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default GetStarted