"use client";
import { useState } from "react";
import { submitResetPasswordMail as submitForm } from "@/actions/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const ResetPasswordForm = () => {
  const router = useRouter();

  async function clientAction(formData) {
    try {
      const result = await submitForm(formData);
      console.log(result);

      if (result?.error) {
        toast.error(result.error);
        return;
      } else if (result?.message) {
        console.log(result.message);
        toast.success(result.message);
        // setIsModalOpen(true);
        document.getElementById("myForm").reset();
      }
      // toast.success(result.error)
    } catch (error) {
      if (error.message === "BLANK_FIELD")
        toast.error("Some fields are missing, please fill in all fields");
      else {
        toast.error(error.message);
      }
    }
  }

  return (
    <form action={clientAction} id="myForm">
      <div className=" mt-5">
        <h1 className="md:mb-3">Organization email</h1>
        <input
          type="email"
          required
          className="w-full h-12 bg-gray-100 px-5 rounded-lg "
          name="email"
        />
      </div>
      <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold">
        Submit Email
      </button>
    </form>
  );
};
