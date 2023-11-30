"use client"
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import CopyToClipboard from "react-copy-to-clipboard";
import Navbar from "@/components/DashboardNavbar";
import toast from "react-hot-toast";
import { MessageCircle, BookText, Copy } from "lucide-react";
import DisplayMessages from "@/components/DisplayMessages";
import Insights from "@/components/Insights";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getMessages } from "@/actions/actions";
import { useRouter } from "next/navigation";

// const socket = io("http://localhost:3000");

function Page() {
  const { data: session, status } = useSession();
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  const [isInsightClicked, setIsInsightClicked] = useState(false);
  const [isDefaultRendered, setIsDefaultRendered] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  let token = "";
  let link = "";
  let name = "";

  const comparator = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

  function back() {
    setIsDefaultRendered(true);
    setIsMessageClicked(false);
    setIsInsightClicked(false);
  }

  if (status === 'unauthenticated') {
    router.push("/login");
    toast.error("You need to login first");
  }

  if (session) {
    token = session.user.authToken
    link = session.user.user.user.orgLink
    name = session.user.user.user.name
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const data = await getMessages(token);
          // console.log(data)
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [session]);

  const handleCopy = () => {
    toast.success("Text copied to clipboard");
  };

  return (
    <>
    <Navbar name={name}/>
    <section className="pt-24 px-5 md:px-16 mb-10">
      <Link href="/dashboard" className="text-blue-500 hover:text-blue-600" onClick={() => {back()}}>
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
              <div className=" flex flex-col text-center items-center justify-center w-full md:w-[95%] border shadow-lg rounded-lg bg-white h-[75vh] scroll-container">
                <div className="px-3 md:px-0">
                  <h1 className="text-[1.3rem] md:text-[1.35rem] font-semibold">Welcome Back</h1>
                  <p className="text-[0.9rem] md:text-[1rem]">Share the link below to start receiving messages</p>
                </div>
                <CopyToClipboard text={link} onCopy={handleCopy}>
                  <div
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    className="border mt-3 rounded-lg px-3 py-2 bg-gray-100 gap-[2%] w-[90%] md:w-[50%] text-center"
                  >
                    <span className="text-center w-[85%]" style={{ overflowWrap: 'break-word' }}>{link}</span>
                    <Copy style={{ marginLeft: '5px' }} />
                  </div>
                </CopyToClipboard>
              </div>
            )}
            {isMessageClicked && (
              <DisplayMessages messages={messages} comparator={comparator} />
            )}
            {isInsightClicked && <Insights messages={messages}/>}
          </>
        )}
      </div>
    </section>
    </>
  );
}

export default Page;
