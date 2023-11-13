import { MessageCircle, BookText, ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { revalidatePath } from "next/cache";
import formatTime from "@/utils/formatTime";
import truncateWords from "@/utils/truncateWords";
import { useState } from "react";

function DisplayMessages({ messages, comparator }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [hoveredMessage, setHoveredMessage] = useState(null);

    const handleMouseEnter = (message) => {
      setHoveredMessage(message);
    };
  
    const handleMouseLeave = () => {
      setHoveredMessage(null);
    };

  return (
    <div className="flex justify-between h-[86vh] w-full">
        <div className="flex gap-[4%] md:w-[33%]">
          <div className="shadow-lg border rounded-lg w-full md:pt-3 md:px-5" >
            <h1 className="text-primaryColor text-[1.2rem] font-semibold">Messages</h1>
            <div className="flex justify-center items-center gap-[5%] rounded-full bg-[#F4F4F4] mt-1 w-[30%]">
              <ListFilter className="w-[9%]" />
              <p className=" text-[0.6rem]">Filter</p>
            </div>
            <div className="mt-3 scroll-container">
              <p className="text-textColor text-[0.7rem] mb-3">All messages</p>
              <div className="">
                {messages.sort(comparator).map((message) => (
                <div 
                    className={`flex justify-between mb-5 cursor-pointer hover:bg-[#F4F4F4] rounded-lg p-2 ${
                    selectedMessage && selectedMessage._id === message._id ? 'bg-[#F4F4F4]' : ''
                    }`}
                    key={message._id}  
                    onClick={() => {
                    setSelectedMessage(message);
                    // setIsModalOpen(true);
                    }}
                    onMouseEnter={() => handleMouseEnter(message)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex gap-[5%] w-[70%]">
                      <Image src="/anonymous.png" width={40} height={40} />
                      <div>
                        <h1 className="font-semibold text-[0.9rem] mb-1">Anonymous</h1>
                        <p className="text-[0.75rem] text-textColor">
                          {truncateWords(message.content, 5)}
                        </p>
                      </div>
                    </div>
                    <div className=" text-textColor text-[0.65rem]">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[62%] shadow-lg border rounded-lg md:pt-5 md:px-5">
            <div className="flex items-center gap-[2%]">
                <Image src="/anonymous.png" width={50} height={50} />
                <h1 className="text-[1.25rem] font-semibold">Anonymous</h1>
            </div>
            <div className="bg-gray-50 h-[440px] md:mt-3 md:mb-2 rounded-lg md:px-5 md:py-5 scroll-container">
            {selectedMessage ? (
                <div className="">
                <div className="md:py-3 border-b-2 flex items-baseline">
                    <div>
                        <h1 className="text-[1.1rem] font-semibold capitalize">{selectedMessage.header}</h1>
                    </div>
                    {/* <div>
                        <p>{formatTime(selectedMessage.timestamp)}</p>
                    </div> */}
                </div>
                {/* Other details about the selected message */}
                <div className="md:mt-3">
                    <p className="text-textColor leading-8">{selectedMessage.content}</p>
                </div>
                </div>
            ) : (
                <p>No message selected</p>
            )}
            </div>
        </div>
      </div>
  )
}

export default DisplayMessages