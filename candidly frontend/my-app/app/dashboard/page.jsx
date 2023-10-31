"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

function page() {
  const { data: session } = useSession();

  console.log(session);
  return <div>page</div>;
}

export default page;
