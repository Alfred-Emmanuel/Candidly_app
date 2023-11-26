"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
// import {Login} from "./Button";
import { LoginButton as Button } from "./Button";

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async formData => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const signInData = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    // console.log(signInData)

    if (signInData?.error) {
      toast.error(signInData.error);
      return;
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form action={handleLogin}>
      <div className=" mt-5">
        <h1 className="md:mb-3">Organization email</h1>
        <input
          type="email"
          required
          className="w-full h-12 bg-gray-100 px-5 rounded-lg "
          name="email"
        />
      </div>
      <div className="mt-5">
        <h1 className="md:mb-3">Password</h1>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full h-12 bg-gray-100 px-5 rounded-lg"
            name="password"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <Eye />
            ) : (
              <EyeOff />
            )}
          </span>
        </div>
      </div>
      {/* <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold">
        Log In
      </button> */}
      <Button />
    </form>
  );
};
