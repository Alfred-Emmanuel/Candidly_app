import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

const page = () => {
  return (
    <div className="md:flex items-center justify-center h-screen md:pt-[3%] md:pb-[3%] ">
      <div className="md:w-[30%] border border-t-[#000080] border-t-8 rounded-lg mx-auto md:py-5 md:px-5 shadow-md">
        <h1 className="text-[1.35rem] font-semibold md:mb-10">Welcome Back</h1>
        <div>
          <LoginForm />
          <div className="text-center mt-5">
            <h1 className="md:mb-3">
              <Link href="/forgot_password" className="text-primaryColor">
                Forgot Password?
              </Link>
            </h1>
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
