import Image from "next/image";

function HowItWorks() {
  return (
    <section className="md:mt-28">
      <div className="md:px-28">
        <h1 className="text-2xl">
          HOW IT <br />{" "}
          <span className="text-primaryColor text-3xl">WORKS</span>
        </h1>
        <div className="mt-1">
          <Image src="/Group 42.png" width={1200} height={100} />
        </div>
        <div className="-mt-1 flex gap-[1%]">
          <div className="border bg-gray-50 rounded-tr-[5rem] rounded-bl-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/hat.png"
              width={30}
              height={30}
              alt="hat"
              className="mx-auto mb-2"
            />
            <h1 className="font-semibold mb-4">Submit anonymous feedback</h1>
            <p className="text-left text-[0.9rem] text-textColor">
              Our secure and confidential platform allows employees/customers to
              submit feedback, fostering a culture of transparency and openness
              in your workplace{" "}
            </p>
          </div>
          <div className="border bg-gray-50 rounded-tl-[5rem] rounded-br-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/graph.png"
              width={30}
              height={30}
              alt="graph"
              className="mx-auto mb-2"
            />
            <h1 className="font-semibold mb-4">
              Review Collection and Analysis
            </h1>
            <p className="text-left text-[0.9rem] text-textColor">
              Anonymous reviews are collected, analyzed, and presented to HR,
              promoting continuous improvement and transparency within the
              organization.{" "}
            </p>
          </div>
          <div className="border bg-gray-50 rounded-tr-[5rem] rounded-bl-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/insight.png"
              width={30}
              height={30}
              alt="insight"
              className="mx-auto mb-2"
            />
            <h1 className="font-semibold mb-4">Empowerment and Improvement</h1>
            <p className="text-left text-[0.9rem] text-textColor">
              By giving a voice to your employees, we empower your team to
              effect positive change. We offer actionable feedback to support
              continuous workplace improvement.{" "}
            </p>
          </div>
          <div className="border bg-gray-50 rounded-tl-[5rem] rounded-br-[5rem] px-6 w-[24%] py-10 text-center ">
            <Image
              src="/screen.png"
              width={30}
              height={30}
              alt="screen"
              className="mx-auto mb-2"
            />
            <h1 className="font-semibold mb-4">User-Friendly Interface</h1>
            <p className="text-left text-[0.9rem] text-textColor">
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