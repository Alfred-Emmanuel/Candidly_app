import { ListFilter, FileOutput } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { revalidatePath } from "next/cache";
import formatTime from "@/utils/formatTime";
import truncateWords from "@/utils/truncateWords";
import { useState, useEffect } from "react";


function DisplayMessages({ messages, comparator }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [hoveredMessage, setHoveredMessage] = useState(null);

    useEffect(() => {
        // Check the screen width and set isMobileView accordingly
        const handleResize = () => {
          setIsMobileView(window.innerWidth < 768); // Adjust the breakpoint as needed
        };
    
        // Initial check on component mount
        handleResize();
    
        // Attach the event listener for screen size changes
        window.addEventListener("resize", handleResize);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const handleMouseEnter = (message) => {
      setHoveredMessage(message);
    };

    // setIsMobileView(true);
    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        // setIsMobileView(true);
      };
  
    const handleMouseLeave = () => {
      setHoveredMessage(null);
    //   setIsMobileView(false);
    };

  return (
    <div className="md:flex justify-between md:h-[86vh] w-full">
        <div className={`md:flex gap-[4%] md:w-[33%] mb-5 md:mb-0 ${isMobileView && selectedMessage ? 'hidden' : ''}`}>
          <div className="shadow-lg border rounded-lg pt-3 px-4 w-full md:pt-3 md:px-5" >
            <h1 className="text-primaryColor text-[1.2rem] font-semibold">Messages</h1>
            <div className="flex justify-center items-center gap-[5%] rounded-full bg-[#F4F4F4] mt-1 w-[30%]">
              <ListFilter className="w-[9%]" />
              <p className=" text-[0.6rem]">Filter</p>
            </div>
            <div className="mt-3 h-[72vh] md:h-[85%] scroll-container">
              <p className="text-textColor text-[0.7rem] mb-3">All messages</p>
              <div className="">
                {messages.sort(comparator).map((message) => (
                <div 
                    className={`flex justify-between mb-5 cursor-pointer hover:bg-[#F4F4F4] rounded-lg p-2 ${
                    selectedMessage && selectedMessage._id === message._id ? 'bg-[#F4F4F4]' : ''
                    }`}
                    key={message._id}  
                    onClick={() => {
                    handleSelectMessage(message);
                    // setIsModalOpen(true);
                    }}
                    onMouseEnter={() => handleMouseEnter(message)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex gap-[5%] w-[70%]">
                        <div className="w-[20%]">
                        <Image src="/anonymous.png" width={40} height={40} alt="anon" />
                      </div>
                      <div className="w-[70%]">
                        <h1 className="font-semibold text-[0.9rem] mb-1">Anonymous</h1>
                        <p className="text-[0.75rem] text-textColor">
                          {truncateWords(message.content, 6)}
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
        <div className={`hidden md:block md:w-[62%] shadow-lg border rounded-lg pt-5 px-5`}>
            <div className={`block md:hidden`}>
                <FileOutput />
            </div>
            <div className="flex items-center gap-[4%] md:gap-[2%]">
                <Image src="/anonymous.png" width={50} height={50} alt="anon" />
                <h1 className="text-[1.25rem] font-semibold">Anonymous</h1>
            </div>
            <div className="bg-gray-50 h-[85%] mt-4 md:mt-3 md:mb-2 rounded-lg px-5 py-5 scroll-container">
            {selectedMessage ? (    
                <div className="">
                <div className="md:py-3 border-b-2 flex items-baseline">
                    <div>
                        <h1 className="text-[1.1rem] mb-1 md:mt-0 md:mb-0 font-semibold capitalize">{selectedMessage.header}</h1>
                    </div>
                </div>
                <div className="md:mt-3">
                    <p className="text-textColor leading-8">{selectedMessage.content}</p>
                </div>
                </div>
            ) : (
                <p className="hidden md:block">No message selected</p>
            )}
            </div>
        </div>
        <div className={`block md:hidden h-[80vh] md:w-[62%] shadow-lg border rounded-lg py-5 px-5 ${isMobileView && selectedMessage ? '' : 'hidden'}`}>
            <div className={`mb-3`}>
                <FileOutput onClick={() => {
                    handleSelectMessage(null);
                }}/>
            </div>
            <div className="flex items-center gap-[4%] md:gap-[2%]">
                <Image src="/anonymous.png" width={50} height={50} alt="anon" />
                <h1 className="text-[1.25rem] font-semibold">Anonymous</h1>
            </div>
            <div className="bg-gray-50 h-[85%] mt-4 md:mt-3 md:mb-2 rounded-lg px-3 py-2 scroll-container-mobile">
            {selectedMessage ? (    
                <div className="">
                <div className="border-b-2 flex items-baseline">
                    <div>
                        <h1 className="text-[1.1rem] mb-1 md:mt-0 md:mb-0 font-semibold capitalize">{selectedMessage.header}</h1>
                    </div>
                </div>
                <div className="md:mt-3">
                    <p className="text-textColor leading-8">{selectedMessage.content}</p>
                </div>
                </div>
            ) : (
                <p className="hidden md:block">No message selected</p>
            )}
            </div>
        </div>
      </div>
  )
}

export default DisplayMessages