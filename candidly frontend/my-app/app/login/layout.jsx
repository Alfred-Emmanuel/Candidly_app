import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/SignUp_navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candidly login",
  description: "Log into your Candidly acount",
};

export default function Layout({ children }) {
  return (
    <div className="">
      <Navbar />
      <section className="">
        <main className="">{children}</main>
      </section>
    </div>
  );
}
