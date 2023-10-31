"use client";
import { useState } from "react";
import { submitNewPasswordForm as submitForm } from "@/actions/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NewPasswordForm = ({ token }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const router = useRouter();
//   console.log(token.reset[0]);

  async function clientAction(formData) {
    try {
      const result = await submitForm(formData);
    //   console.log(result);

      if (result?.error) {
        toast.error(result.error);
        return;
      } else if (result?.message) {
        console.log(result);
        toast.success(result.message);
        // setIsModalOpen(true);
        document.getElementById("myForm").reset();
      }
    } catch (error) {
      if (error.message === "PASSWORD_MISMATCH") {
        toast.error("Passwords do not match. Please try again.");
      } else if (error.message === "BLANK_FIELD")
        toast.error("Some fields are missing, please fill in all fields");
      else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <form action={clientAction} id="myForm">
      {/* <div className=" mt-5">
        <h1 className="md:mb-3">Organization email</h1>
        <input
          type="email"
          required
          className="w-full h-12 bg-gray-100 px-5 rounded-lg "
          name="email"
        />
      </div> */}
      <div className="mt-7">
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
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </div>
      </div>
      <div className=" mt-7">
        <h1 className="md:mb-3">Confirm Password</h1>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full h-12 bg-gray-100 px-5 rounded-lg "
            name="confirmPassword"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </div>
      </div>
      <div>
        <input type="hidden" name="token" value={token.reset[0]} />
      </div>
      <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold">
        Submit Email
      </button>
    </form>
  );
};
