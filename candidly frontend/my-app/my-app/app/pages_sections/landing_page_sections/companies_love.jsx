import Image from "next/image";

function CompaniesLove() {
  return (
    <section className="md:mt-10 md:mb-32 px-28">
      <h1 className="font-serif md:mb-5 text-2xl">
        COMPANIES LOVE <br />
        <span className="text-primaryColor text-3xl ">CANDIDLY</span>
      </h1>
      <div className="flex gap-10 px-5">
        <div className="md:w-[27%] shadow-lg px-4 py-5">
          <p className="text-[1.1rem] font-semibold md:mb-4">
            "A game changer for office culture"
          </p>
          <p className="text-textColor text-[0.9rem] md:mb-6 leading-6 md:pr-5">
            As an HR manager, I decided to implement the Candidly Review Hub to
            encourage open communication within our organization. The platform
            has been effective in allowing employees to express themselves
            honestly
          </p>
          <div className="flex justify-between items-baseline ">
            <div className="flex gap-3 ">
              <Image
                src="/two-women.png"
                width={40}
                height={0}
                alt="#"
                className="rounded-full h-10 "
              />
              <div>
                <p className="font-semibold">Lola Aina</p>
                <p className="text-textColor text-[0.9rem]">
                  Head of HR, Coachely{" "}
                </p>
              </div>
            </div>
            <p className="text-textColor text-[0.9rem]">Coachely</p>
          </div>
        </div>
        <div className="md:w-[27%] shadow-lg px-4 py-5">
          <p className="text-[1.1rem] font-semibold md:mb-4">
            "The office revolution we needed"
          </p>
          <p className="text-textColor text-[0.9rem] md:mb-6 leading-6 md:pr-5">
            Our company has witnessed a remarkable positive shift in workplace
            dynamics since implementing this platform. It empowers our employees
            to share their thoughts anonymously, fostering open communication.
          </p>
          <div className="flex justify-between items-baseline ">
            <div className="flex gap-3 ">
              <Image
                src="/two-women.png"
                width={40}
                height={0}
                alt="#"
                className="rounded-full h-10 "
              />
              <div>
                <p className="font-semibold">Alfred Max</p>
                <p className="text-textColor text-[0.9rem]">
                  Product Designer, Lannce{" "}
                </p>
              </div>
            </div>
            <p className="text-textColor text-[0.9rem]">Lannce</p>
          </div>
        </div>
        <div className="md:w-[27%] shadow-lg px-4 py-5">
          <p className="text-[1.1rem] font-semibold md:mb-4">
            "Office Transformation"
          </p>
          <p className="text-textColor text-[0.9rem] md:mb-6 leading-6 md:pr-5">
            This platform has been a game-changer in our office culture. As an
            employee, I feel heard, and the management's proactive response to
            our anonymous feedback has already led to noticeable changes
          </p>
          <div className="flex justify-between items-baseline ">
            <div className="flex gap-3 ">
              <Image
                src="/two-women.png"
                width={40}
                height={0}
                alt="#"
                className="rounded-full h-10 "
              />
              <div>
                <p className="font-semibold">Tolu Pratt</p>
                <p className="text-textColor text-[0.9rem]">
                  Teacher, Cave Inc{" "}
                </p>
              </div>
            </div>
            <p className="text-textColor text-[0.9rem]">Cave Inc</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompaniesLove