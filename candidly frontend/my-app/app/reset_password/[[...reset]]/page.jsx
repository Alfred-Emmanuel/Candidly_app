import Link from "next/link";
import { NewPasswordForm } from "@/components/NewPasswordForm";

const page = ({params}) => {
  return (
    <div className="md:flex items-center justify-center border h-screen md:pt-[3%] md:pb-[3%] ">
      <div className="md:w-[30%] border border-t-[#000080] border-t-8 rounded-lg max-h-[90%] mx-auto md:py-5 md:px-5 shadow-md">
        <h1 className="text-[1.35rem] font-semibold md:mb-10">
          Reset Your Password Below
        </h1>
        <div>
          <NewPasswordForm token={params} />
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
