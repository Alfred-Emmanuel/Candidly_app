import React from "react";
import Image from "next/image";

const VerifyMail = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-blur bg-opacity-80">
      <div className=" py-24 px-10 lg:py-0 lg:px-0">
        <div className="relative text-white z-50 bg-transparent bg-opacity-20 border-primary-color border-2 p-5 lg:px-8 lg:py-2 rounded-lg text-center">
          <h2 className="text-xl lg:text-2xl mt-3 mb-3 font-semibold">
            You have successfully registered.
          </h2>
          <p className="md:w-[60%] md:mx-auto">
            Check your mailbox including the spam folder on how to verify your account.
          </p>
          <button
            className="bg-[#000080] md:w-[50%] h-12 rounded-lg mt-8"
            onClick={closeModal}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
