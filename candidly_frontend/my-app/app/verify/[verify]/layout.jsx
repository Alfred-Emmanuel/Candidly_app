import "../../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candidly verify",
  description: "Verify your account on Candidly.",
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
