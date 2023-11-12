"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import DisplayMessages from "@/components/DisplayMessages";


function page() {
  const { data: session } = useSession();
  let messages = [];
  const comparator = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

  if (session) {
    console.log(session.user.user.messages);
    messages = session.user.user.messages
  }
  
  return (
    <section className="md:px-16 mb-10">
      <Link
        href="/dashboard"
        className="text-blue-500 hover:text-blue-600"
      >
        Back
      </Link>
      <DisplayMessages messages={messages} comparator={comparator} />
    </section>
  
  );
}

export default page;
