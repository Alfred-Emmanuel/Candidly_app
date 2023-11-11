// "use server"

import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";

const page = () => {
  return (
    <div className="flex justify-center items-center md:h-screen lg:mt-[5%] lg:mb-[5%] lg:h-fit-content md:pt-[3%] pb-[3%]">
      <div className="md:w-[60%] lg:w-[35%] border border-t-[#000080] border-t-8 rounded-lg py-5 px-5 shadow-md">
        <h1 className="text-[1.1rem] md:text-[1.35rem] font-semibold md:mb-10 mb-5 pt-5 md:pt-0 ">
          Welcome to Candidly
        </h1>
        <div>
          <RegistrationForm />
          <div className="text-center mt-5">
            <h1>
              Already a member?{" "}
              <span className="text-[#000080]">
                <Link href="/login">Log in</Link>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
