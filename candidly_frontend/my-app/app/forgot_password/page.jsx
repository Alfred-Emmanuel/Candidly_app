import Link from "next/link";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

const page = () => {
  return (
    <div className="flex items-center justify-center border h-screen md:pt-[3%] md:pb-[3%] ">
      <div className=" md:w-[30%] border border-t-[#000080] border-t-8 rounded-lg max-h-[90%] mx-auto py-5 px-5 shadow-md">
        <h1 className=" md:text-[1.35rem] font-semibold md:mb-10">Reset Your Password Below</h1>
        <div>
          <ResetPasswordForm />
          <div className="text-center mt-5">
            <h1>
              Not a member?{" "}
              <span className="text-[#000080]">
                <Link href="/sign_up">Sign Up</Link>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
