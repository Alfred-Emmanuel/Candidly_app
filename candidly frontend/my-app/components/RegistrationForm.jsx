"use client";
import { submitRegistrationForm as submitForm } from "@/actions/actions";
import VerifyMail from "@/components/VerifyMail";
import toast from "react-hot-toast";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegistrationForm = () => {
  const [formResult, setFormResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  async function clientAction(formData) {
    try {
      const result = await submitForm(formData);
      setFormResult(result);
    //   console.log(result);

      if (result?.error) {
        toast.error(result.error);
        return;
      } else if (result?.success) {
        // toast.success("Successfully registered!");
        setIsModalOpen(true);
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
    <>
      <form className="md:px-[4%] md:pt-[3%]" id="myForm" action={clientAction}>
        <div className="">
          <h1 className="md:mb-5">Organization name</h1>
          <input
            type="text"
            required
            className="w-full h-12 bg-gray-100 px-5 rounded-lg "
            name="name"
          />
        </div>
        <div className=" mt-7">
          <h1 className="md:mb-5">Organization email</h1>
          <input
            type="email"
            required
            className="w-full h-12 bg-gray-100 px-5 rounded-lg "
            name="email"
          />
        </div>
        <div className="mt-7">
          <h1 className="md:mb-5">Password</h1>
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
          <h1 className="md:mb-5">Confirm Password</h1>
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
        <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold">
          Sign Up
        </button>
      </form>
      {formResult && formResult.success && (
        <VerifyMail isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </>
  );
};

export default RegistrationForm;
