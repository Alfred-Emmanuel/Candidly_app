"use client"
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MessageCircle, BookText, ListFilter } from "lucide-react";
import DisplayMessages from "@/components/DisplayMessages";
import Insights from "@/components/Insights";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getMessages } from "@/actions/actions";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Socket connected!");
});


function Page() {
  const { data: session, update } = useSession();
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  const [isInsightClicked, setIsInsightClicked] = useState(false);
  const [isDefaultRendered, setIsDefaultRendered] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [messages, setMessages] = useState([]);
  let token = "";

  const comparator = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

  if (session) {
    token = session.user.authToken
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const data = await getMessages(token);
          console.log(data)
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <section className="pt-24 px-5 md:px-16 mb-10">
      <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
        Back
      </Link>
      <div className="md:flex gap-[2%] md:mt-5">
        <div className="shadow-lg rounded-lg md:w-[5%] md:flex md:pt-5 justify-center px-3">
          <div className="md:h-[460px] flex gap-[3%] md:block mt-5 md:mt-0 mb-5 md:mb-0 py-1 md:py-0">
            <div
              className={`cursor-pointer hover:bg-[#F4F4F4] rounded-lg p-2 mb-2 ${
                selectedIcon === "MessageCircle" ? "bg-[#F4F4F4]" : ""
              }`}
              onClick={() => {
                setSelectedIcon("MessageCircle");
                setIsMessageClicked(true);
                setIsInsightClicked(false);
                setIsDefaultRendered(false);
              }}
            >
              <MessageCircle className="" />
            </div>{" "}
            {/* <br /> */}
            <div
              className={`cursor-pointer hover:bg-[#F4F4F4] rounded-lg p-2 ${
                selectedIcon === "BookText" ? "bg-[#F4F4F4]" : ""
              }`}
              onClick={() => {
                setSelectedIcon("BookText");
                setIsInsightClicked(true);
                setIsMessageClicked(false);
                setIsDefaultRendered(false);
              }}
            >
              <BookText />
            </div>
          </div>
        </div>
        {(isDefaultRendered || isMessageClicked || isInsightClicked) && (
          <>
            {isDefaultRendered && (
              <div className=" flex items-center justify-center w-full md:w-[95%] border shadow-lg rounded-lg bg-white scroll-container">
                <div>
                  <h1 className="text-[1.3rem] md:text-[1.35rem]">Welcome Back</h1>
                  {/* <p className="text-[0.2rem]">{token}</p> */}
                </div>
              </div>
            )}
            {isMessageClicked && (
              <DisplayMessages messages={messages} comparator={comparator} />
            )}
            {isInsightClicked && <Insights messages={messages}/>} {/* Render Insights component */}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
