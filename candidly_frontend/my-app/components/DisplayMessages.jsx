import { MessageCircle, BookText, ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import formatTime from "@/utils/formatTime";
import truncateWords from "@/utils/truncateWords";

function DisplayMessages({ messages, comparator }) {
  return (
    <div className="flex justify-between h-[86vh] mt-5">
        <div className="flex gap-[4%] md:w-[40%]">
          <div className="shadow-lg border rounded-lg w-[15%] flex md:pt-20 justify-center px-3">
            <div className="">
              <Link href="/dashboard" className="m">
                <MessageCircle />
              </Link> <br />
              <Link href="/dashboard">
                <BookText />
              </Link>
            </div>
          </div>
          <div className="shadow-lg border rounded-lg w-[70%] md:pt-3 md:px-5" >
            <h1 className="text-primaryColor text-[1.2rem] font-semibold">Messages</h1>
            <div className="flex justify-center items-center gap-[5%] rounded-full bg-[#F4F4F4] mt-1 w-[30%]">
              <ListFilter className="w-[9%]" />
              <p className=" text-[0.6rem]">Filter</p>
            </div>
            <div className="mt-3 scroll-container">
              <p className="text-textColor text-[0.7rem] mb-3">All messages</p>
              <div className="">
                {messages.sort(comparator).map((message) => (
                  <div className="flex justify-between mb-5" key={message._id}>
                    <div className="flex gap-[5%] w-[70%]">
                      <Image src="/anonymous.png" width={40} height={40} />
                      <div>
                        <h1 className="font-semibold text-[0.9rem] mb-1">Anonymous</h1>
                        <p className="text-[0.75rem] text-textColor">
                          {truncateWords(message.content, 5)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-textColor text-[0.65rem]">{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[60%] shadow-lg border rounded-lg"></div>
      </div>
  )
}

export default DisplayMessages