import Image from "next/image";

function HowItWorks() {
  return (
    <section className="md:mt-28 px-5 md:px-0" id="features">
      <div className="md:px-28">
        <h1 className="text-2xl font-serif">
          HOW IT <br />{" "}
          <span className="text-primaryColor text-3xl">WORKS</span>
        </h1>
        <div className="mt-1">
          <Image src="/Group 42.png" width={1050} height={100} className="hidden md:block" />
        </div>
        <div className="md:-mt-1 md:flex gap-3">
        <div className="border my-5 md:my-0  w-[90%] mx-auto md:mx-0 bg-gray-50 rounded-tr-[5rem] rounded-bl-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/hat.png"
              width={30}
              height={30}
              alt="hat"
              className="mx-auto mb-2"
            />
            <h1 className="text-[1.05rem] md:text-[1rem] font-semibold mb-4">Submit anonymous feedback</h1>
            <p className="text-justify text-[0.95rem] md:text-left md:text-[0.9rem] text-textColor">
              Our secure and confidential platform allows employees/customers to
              submit feedback, fostering a culture of transparency and openness
              in your workplace{" "}
            </p>
          </div>
          <div className="border my-5 md:my-0  w-[90%] mx-auto md:mx-0 bg-gray-50 rounded-tl-[5rem] rounded-br-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/graph.png"
              width={30}
              height={30}
              alt="graph"
              className="mx-auto mb-2"
            />
            <h1 className="text-[1.05rem] md:text-[1rem] font-semibold mb-4">
              Review Collection and Analysis
            </h1>
            <p className="text-justify text-[0.95rem] md:text-left md:text-[0.9rem] text-textColor">
              Anonymous reviews are collected, analyzed, and presented to HR,
              promoting continuous improvement and transparency within the
              organization.{" "}
            </p>
          </div>
          <div className="border my-5 md:my-0  w-[90%] mx-auto md:mx-0 bg-gray-50 rounded-tr-[5rem] rounded-bl-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/insight.png"
              width={30}
              height={30}
              alt="insight"
              className="mx-auto mb-2"
            />
            <h1 className="text-[1.05rem] md:text-[1rem] font-semibold mb-4">Empowerment and Improvement</h1>
            <p className="text-justify text-[0.95rem] md:text-left md:text-[0.9rem] text-textColor">
              By giving a voice to your employees, we empower your team to
              effect positive change. We offer actionable feedback to support
              continuous workplace improvement.{" "}
            </p>
          </div>
          <div className="border my-5 md:my-0  w-[90%] mx-auto md:mx-0 bg-gray-50 rounded-tl-[5rem] rounded-br-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/screen.png"
              width={30}
              height={30}
              alt="screen"
              className="mx-auto mb-2"
            />
            <h1 className="text-[1.05rem] md:text-[1rem] font-semibold mb-4">User-Friendly Interface</h1>
            <p className="text-justify text-[0.95rem] md:text-left md:text-[0.9rem] text-textColor">
              The website features an intuitive and professional design, making
              it easy for employees to navigate and share their insights{" "}
            </p>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks