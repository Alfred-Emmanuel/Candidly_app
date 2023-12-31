import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <section id="hero-section" className="pt-24 md:pt-0 px-5 md:px-0">
      <div className="md:flex md:px-32 gap-[5%] justify-between md:h-[80vh]">
        <div className="md:w-[40%] md:pt-[10%] ">
          <h1 className="text-[#241F1F] text-[1.6rem] md:text-4xl q1 font-sans font-semibold  ">
            Empower Employees: <br /> Elevate the workplace- <br />{" "}
            <span className="text-primaryColor font-serif">Anonymously</span>
          </h1>
          <p className="text-textColor w-[65%] mt-3 lg:text-[1.1rem] md:mt-5">
            Secure way for employees to share their honest work experiences,
            insights, and feedback without revealing their identities
          </p>
          <Link
            className="bg-primaryColor md:mt-10 mt-5 mb-10 md:mb-0 text-white w-24 h-12 md:w-32 md:h-10 flex items-center justify-center rounded-full font-bold "
            href="/sign_up"
          >
            Sign up
          </Link>
        </div>
        <div className="hidden relative md:w-[55%] md:mt-10 md:flex items-center gap-[5%]">
          <div className="absolute -top-4 left-[20%] flex gap-1 items-center rounded-full bg-white px-2 py-2 md:w-[35%] shadow-md">
            <div className="rounded-circle bg-primaryColor text-white rounded-full px-2 flex items-center justify-center ">
              {/* <HelpCircle /> */}
              <p>?</p>
            </div>
            <p className="text-[0.7rem] font-bold">
              Struggling with speaking up at work?
            </p>
          </div>
          <div className="absolute bg-white bottom-0  -left-[30%] rounded-lg py-4 shadow-md w-[35%]">
            <div className="flex justify-between items-center border-b-2 border-textColor px-4 pb-2">
              <p className="font-semibold">MANAGER REPORT</p>
              <div className="rounded-circle bg-primaryColor text-white rounded-full px-2 flex items-center justify-center ">
                <p className="">A</p>
              </div>
            </div>
            <div className="px-4 pt-2">
              <p className="font-semibold">INDIFFERENT</p>
              <p className="text-[0.84rem] text-textColor md:mt-1">
                Recommended improvements to enhance team productivity and
                satisfaction...
              </p>
              <div className="flex justify-between w-full mt-3">
                <button className="w-[40%] h-8 rounded-full bg-gray-100 shadow-md">
                  Save
                </button>
                <button className="w-[40%] h-8 rounded-full bg-primaryColor text-white shadow-md">
                  Post
                </button>
              </div>
            </div>
          </div>
          <div>
            <Image src="/two-women.png" width={280} height={300} />
          </div>
          <div>
            <Image
              src="/white-and-muslim-woman.png"
              width={165}
              height={165}
              className="mb-5"
            />
            <Image src="/women-talking.png" width={165} height={165} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
