"use client";
import { sendMessage as submitForm } from "@/actions/actions";
import toast from "react-hot-toast";
import { Image } from "lucide-react";
import { useState } from "react";
import { SendMessage as Button } from "./Button";

const MessageForm = (userId) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 5) {
      toast.error('You can upload a maximum of 5 files.');
      return;
    }

    setSelectedFiles(files);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

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
        setSelectedFiles([]);
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
        <div className="mt-4">
          {/* Hidden file input */}
          <input
            type="file"
            onChange={handleFileChange}
            // style={{ display: 'none' }}
            className="w-full h-12 bg-gray-50 border border-black  px-5 rounded-lg hidden "
            id="fileInput"
            name="imageFile"
            multiple
          />
          {/* Display selected file names */}
        </div>
        <div className="mt-4 md:mt-10 lg:mt-4">
          <h1 className="md:mb-3 mb-2 text-[1.1rem] md:text-[1.2rem lg:text-[1rem]">Type your anonymous message <span className="text-red-500">*</span></h1>
          <textarea
            required
            className="w-full h-32 bg-gray-50 border border-black px-5 py-3 rounded-lg "
            name="content"
          />
        </div>
        {selectedFiles.length > 0 && (
            <div className="mt-2 px-2 py-2 rounded-lg border pb-4 mb-2">
              <h1 className="text-[1.2rem] mb-2">Selected Files:</h1>
              <ul className="">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="border text-wrap px-5 rounded-lg bg-gray-50 mb-2 py-1">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        <div>
            <input type="hidden" name="receiverId" value={userId.userId.org_message} />
        </div>
        <div className="flex items-center justify-end gap-[2%]">
          <div
            className="cursor-pointer"
            onClick={handleIconClick}
          >
            <span role="img" aria-label="Image Upload">
              <Image size="2rem" />
            </span>
          </div>
          <Button />
        </div>
      </form>
    </>
  );
};

export default MessageForm;
