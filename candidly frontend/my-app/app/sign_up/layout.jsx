import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/SignUp_navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candidly Sign Up",
  description: "Register for a new account on Candidly.",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="">
      <Navbar />
      <section className="">
        <main className="">{children}</main>
      </section>
    </div>
  );
}
