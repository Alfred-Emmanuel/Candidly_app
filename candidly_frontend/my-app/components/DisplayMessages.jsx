import { ListFilter, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImageModal from "./ImageModal";
import formatTime from "@/utils/formatTime";
import truncateWords from "@/utils/truncateWords";
import { useState, useEffect } from "react";


function DisplayMessages({ messages, comparator }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [hoveredMessage, setHoveredMessage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
      setSelectedImage(image);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setSelectedImage(null);
      setModalIsOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
          setIsMobileView(window.innerWidth < 768);
        };
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const handleMouseEnter = (message) => {
      setHoveredMessage(message);
    };

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);

        if (message && !isMessageRead(message._id)) {
          markMessageAsRead(message._id);
        }
    };

    const markMessageAsRead = (messageId) => {
      // Set the read status and timestamp in local storage
      localStorage.setItem(`readStatus_${messageId}`, JSON.stringify({ read: true, timestamp: Date.now() }));
    };

    const isMessageRead = (messageId) => {
      // Check the read status in local storage and the timestamp to determine if the message is read
      const readStatus = localStorage.getItem(`readStatus_${messageId}`);
      if (readStatus) {
        const { read, timestamp } = JSON.parse(readStatus);
        const expirationTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        return read && Date.now() - timestamp < expirationTime;
      }
      return false;
    };
  
    const handleMouseLeave = () => {
      setHoveredMessage(null);
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
            <div className="relative mt-3 h-[72vh] md:h-[85%] scroll-container">
              <p className="text-textColor text-[0.7rem] mb-3">All messages</p>
              <div className="">
                {messages.length === 0 ? (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                    <h1 className="font-semibold text-center text-[1.2rem]">No messages available.</h1>
                  </div>
                ) : (
                  messages.sort(comparator).map((message) => (
                    <div
                      className={`border-b-2 flex justify-between mb-5 cursor-pointer hover:bg-[#F4F4F4] rounded-lg p-2 ${
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
                          <p className="text-[0.75rem] text-textColor">{truncateWords(message.content, 6)}</p>
                        </div>
                      </div>
                      <div className=" text-textColor text-[0.65rem] flex flex-col">{formatTime(message.timestamp)}
                      {isMessageRead(message._id) ? (
                        <span></span>
                      ) : (
                        <span className="text-white bg-primaryColor rounded-full w-[60%] flex justify-center items-center py-1">U</span>
                      )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`hidden md:block md:w-[62%] shadow-lg border rounded-lg pt-5 px-5`}>
            <div className={`block md:hidden`}>
                <MoveLeft />
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
                      {selectedMessage.images.length > 0 && (
                        <div className="">
                          {selectedMessage.images.map((image, index) => (
                            <Image 
                              key={index} 
                              src={image} 
                              alt={`Image ${index}`} 
                              width={500} 
                              height={500} 
                              className="my-5 rounded-lg border cursor-pointer hover:opacity-80"
                              onClick={() => openModal(image)}
                            />
                          ))}
                           {selectedImage && (
                              <ImageModal isOpen={modalIsOpen} onClose={closeModal} images={[selectedImage]} />
                            )}
                        </div>
                      )}
                  </div>
                </div>
            ) : (
                <p className="hidden md:block">No message selected</p>
            )}
            </div>
        </div>
        <div className={`block md:hidden h-[80vh] md:w-[62%] shadow-lg border rounded-lg py-5 px-5 ${isMobileView && selectedMessage ? '' : 'hidden'}`}>
            <div className={`mb-3`}>
                <MoveLeft onClick={() => {
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
                        <h1 className="text-[1.1rem] mb-2 mt-2 text-wrap md:mt-0 md:mb-0 font-semibold capitalize">{selectedMessage.header}</h1>
                    </div>
                </div>
                <div className="md:mt-3">
                    <p className="text-textColor leading-8">{selectedMessage.content}</p>
                    {selectedMessage.images.length > 0 && (
                        <div className="">
                          {selectedMessage.images.map((image, index) => (
                            <Image 
                              key={index} 
                              src={image} 
                              alt={`Image ${index}`} 
                              width={500} 
                              height={500} 
                              className="h-[50vh] md:h-fit-content my-5 rounded-lg border cursor-pointer hover:opacity-80"
                              onClick={() => openModal(image)}
                            />
                          ))}
                           {selectedImage && (
                              <ImageModal isOpen={modalIsOpen} onClose={closeModal} images={[selectedImage]} />
                            )}
                        </div>
                      )}

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