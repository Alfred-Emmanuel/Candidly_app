"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

function page() {
  const { data: session } = useSession();

  console.log(session);
  return (
  <div className=""><h1>Welcime</h1></div>
  
  );
}

export default page;
