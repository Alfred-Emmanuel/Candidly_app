"use client";
import { sendMessage as submitForm } from "@/actions/actions";
import toast from "react-hot-toast";
import { useEffect } from "react";


const MessageForm = (userId) => {

  async function clientAction(formData) {
    try {
      const result = await submitForm(formData);
      console.log(result);

      if (result?.error) {
        toast.error(result.error);
        console.log(result)
        return;
      } else if (result?.success) {
        toast.success("Message sent successfully");
        document.getElementById("myForm").reset();
      }
    } catch (error) {
      if (error.message === "BLANK_FIELD")
        toast.error("Some fields are missing, please fill in all fields");
      else {
        toast.error(error.message);
        console.log(formData)
      }
    }
  }

  
  return (
    <>
      <form 
        className=" px-5 pt-10 md:px-20 lg:px-0 lg:w-[50%] md:pt-[3%]"
        id="myForm" 
        action={clientAction}
        // encType="multipart/form-data" 
        // method="post"
        >
        <div className="">
          <h1 className="md:mb-3 mb-2 text-[1.1rem] md:text-[1.2rem] lg:text-[1rem] ">Heading <span className="text-red-500">*</span></h1>
          <input
            type="text"
            required
            className="w-full h-12 bg-gray-50 border border-black  px-5 rounded-lg "
            name="header"
          />
        </div>
        <div className="">
          <input
            type="file"
            // required
            className="w-full h-12 bg-gray-50 border border-black  px-5 rounded-lg "
            name="imageFile"
          />
        </div>
        <div className="mt-4 md:mt-10 lg:mt-4">
          <h1 className="md:mb-3 mb-2 text-[1.1rem] md:text-[1.2rem lg:text-[1rem]">Type your anonymous message <span className="text-red-500">*</span></h1>
          <textarea
            required
            className="w-full h-32 bg-gray-50 border border-black px-5 py-3 rounded-lg "
            name="content"
          />
        </div>
        <div>
            <input type="hidden" name="receiverId" value={userId.userId.org_message} />
        </div>
        <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold">
          Send Message
        </button>
      </form>
    </>
  );
};

export default MessageForm;
