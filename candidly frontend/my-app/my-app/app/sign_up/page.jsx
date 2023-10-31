// "use server"

import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";

const page = () => {
  return (
    <div className="md:flex items-center md:pt-[3%] md:pb-[3%]">
      <div className="md:w-[35%] border border-t-[#000080] border-t-8 rounded-lg max-h-[90%] mx-auto md:py-5 md:px-5 shadow-md">
        <h1 className="text-[1.35rem] font-semibold md:mb-10">
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
