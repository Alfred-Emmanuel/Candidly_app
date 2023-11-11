"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MessageCircle, BookText, ListFilter } from "lucide-react";
import formatTime from "@/utils/formatTime";

function page() {
  const { data: session } = useSession();
  let messages = [];
  const comparator = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

  if (session) {
    console.log(session.user.user.messages);
    messages = session.user.user.messages
    // console.log(session.messagesCount);
  }

  // const Table = () => {
  //   return (
  //     <div className="overflow-y-auto mb-20 max-h-[20%]">
  //       <table className="min-w-full overflow-y-auto border border-black">
  //         <thead className="text-left font-normal">
  //           <tr>
  //             <th className="py-2 px-4 border">Name</th>
  //             <th className="py-2 px-4 border">Title</th>
  //             <th className="py-2 px-4 border">Content</th>
  //             <th className="py-2 px-4 border">Date received</th>
  //           </tr>
  //         </thead>
  //         <tbody className="text-textColor">
  //           {messages.map((message) => (
  //             <tr key={message._id}>
  //               <td className="py-2 px-4 border">Anonymous</td>
  //               <td className="py-2 px-4 border w-[20%] max-w-[20%] whitespace-nowrap overflow-hidden">
  //                 <div className="text-ellipsis">{message.header}</div>
  //               </td>
  //               <td className="py-2 px-4 border">{message.content}</td>
  //               <td className="py-2 px-4 border">{formatTime(message.timestamp).toLocaleString()}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  // const Table = () => {
  //   if (session) {
  //     const messages = session.user.user.messages;
  
  //     // Custom comparator function to sort messages by timestamp in descending order
      // const comparator = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);
      
  //     return (
  //       <div className="overflow-y-auto">
  //         <table className="min-w-full bg-white border border-gray-300">
  //           <thead className="text-left font-normal">
  //             <tr>
  //               <th className="py-2 px-4 border">Name</th>
  //               <th className="py-2 px-4 border">Title</th>
  //               <th className="py-2 px-4 border">Content</th>
  //               <th className="py-2 px-4 border">Date submitted</th>
  //             </tr>
  //           </thead>
  //           <tbody className="text-textColor">
              // {messages.sort(comparator).map((message) => (
              //   <tr key={message._id}>
              //     <td className="py-2 px-4 border">Anonymous</td>
              //     <td className="py-2 px-4 border w-[20%] max-w-[20%] ">{message.header}</td>
              //     <td className="py-2 px-4 border">{message.content}</td>
              //     <td className="py-2 px-4 border">{formatTime(message.timestamp)}</td>
              //   </tr>
              // ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     );
  //   }
  
  //   return null;
  // };
    
  
  return (
    <section className="md:px-16">
      <Link
        href="/dashboard"
        className="text-blue-500 hover:text-blue-600"
      >
        Back
      </Link>
      <div className="flex justify-between h-[70vh] border mt-5">
        <div className="flex gap-[4%] md:w-[30%]">
          <div className="shadow-lg border rounded-lg w-[15%] flex items-center px-3">
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
            <div className="mt-3">
              <p className="text-textColor text-[0.7rem] mb-3">All messages</p>
              <div>
                {messages.sort(comparator).map((message) => (
                  // <tr key={message._id}>
                  //   <td className="py-2 px-4 border">Anonymous</td>
                  //   <td className="py-2 px-4 border w-[20%] max-w-[20%] ">{message.header}</td>
                  //   <td className="py-2 px-4 border">{message.content}</td>
                  //   <td className="py-2 px-4 border">{formatTime(message.timestamp)}</td>
                  // </tr>
                  <div className="flex justify-between border" key={message._id}>
                    <div className="flex gap-[5%] border w-[70%]">
                      <Image src="/anonymous.png" width={40} height={40} />
                      <div>
                        <h1 className="font-semibold text-[0.9rem] mb-1">{message.header}</h1>
                        <p className="text-[0.8rem]">{message.content}</p>
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
        <div className="md:w-[70%] shadow-lg border rounded-lg"></div>
      </div>
      {/* <h1 className="md:text-2xl md:mb-10 md:mt-5 font-semibold "> Here are your responses </h1>
      <div>
        <div className="flex w-[30%] gap-[5%] md:mb-10">
          <h1>Responses</h1>
          <h1>Insights</h1>
          <h1>Analytics</h1>
        </div>
      </div> */}
    </section>
  
  );
}

export default page;
