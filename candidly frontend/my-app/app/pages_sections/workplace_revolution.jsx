import Image from "next/image";
import Link from "next/link";
function WorkplaceRevolution() {
  return (
    <section className="mt-10 pt-16 pb-20 px-28 bg-[#F1F1FF]">
      <h1 className="text-2xl font-serif">
        WE ARE INITIATING A WORKPLACE <br />
        <span className="text-primaryColor text-3xl">REVOLUTION</span>
      </h1>
      <div className="flex mt-10 gap-10 ">
        <div className="md:w-[50%]">
          <Image
            src="/people.png"
            width={550}
            height={550}
            alt="people talking"
          />
        </div>
        <div className="md:w-[40%] md:my-auto">
          <h1 className="text-[1.3rem] font-semibold">
            We are on a mission to Fostering Workplace Transparency. Join us!
          </h1>
          <p className="text-[1 rem] text-textColor md:w-[80%] md:mt-5 md:mb-3">
            Candidly's mission is to empower employees and organizations to
            create healthier, more productive workplaces through open, anonymous
            feedback. We believe in the transformative power of candid
            communication, driving positive change, and building trust among all
            members of the workforce
          </p>
          <Link href="#" className="text-primaryColor text-[0.9rem]">
            Learn more about our mission{" "}
            <span className="md:ml-4">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WorkplaceRevolution;
