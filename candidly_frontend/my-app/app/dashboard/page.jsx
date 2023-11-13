// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { MessageCircle, BookText, ListFilter } from "lucide-react";
// import DisplayMessages from "@/components/DisplayMessages";
// import { useState } from "react";


// function page() {
//   const { data: session } = useSession();
//   const [isMessageClicked, setIsMessageClicked] = useState(false);
//   let messages = [];
//   const comparator = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

//   if (session) {
//     console.log(session.user);
//     // console.log(session.user.user.messages);
//     messages = session.user.user.messages
//   }
  
//   return (
//     <section className="md:px-16 mb-10">
//       <Link
//         href="/dashboard"
//         className="text-blue-500 hover:text-blue-600"
//       >
//         Back
//       </Link>
//       <div className="flex gap-[2%] md:mt-10">
//         <div className="shadow-lg border rounded-lg w-[5%] flex md:pt-20 justify-center px-3">
//           <div className="h-[480px]">
//             <Link href="#" className="m" onClick={() => setIsMessageClicked(true)}>
//               <MessageCircle />
//             </Link> <br />
//             <Link href="/dashboard">
//               <BookText />
//             </Link>
//           </div>
//         </div>
//         {isMessageClicked && (
//           <DisplayMessages messages={messages} comparator={comparator} />
//         )}
//       </div>
//     </section>
//   );
// }

// export default page;

"use client"
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MessageCircle, BookText, ListFilter } from "lucide-react";
import DisplayMessages from "@/components/DisplayMessages";
import { useState } from "react";

function Page() {
  const { data: session } = useSession();
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  let messages = [];
  const comparator = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

  if (session) {
    console.log(session.user);
    messages = session.user.user.messages;
  }

  return (
    <section className="md:px-16 mb-10">
      <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
        Back
      </Link>
      <div className="flex gap-[2%] md:mt-10">
        <div className="shadow-lg border rounded-lg w-[5%] flex md:pt-20 justify-center px-3">
          <div className="h-[480px]">
            <Link href="#" className="m" onClick={() => setIsMessageClicked(true)}>
              <MessageCircle />
            </Link>{" "}
            <br />
            <Link href="/dashboard">
              <BookText />
            </Link>
          </div>
        </div>
        {isMessageClicked && (
          <DisplayMessages messages={messages} comparator={comparator} />
        )}
      </div>
    </section>
  );
}

export default Page;
