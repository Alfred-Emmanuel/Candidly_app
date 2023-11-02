// import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/SignUp_navbar";
import Footer from "@/components/Footer";
// import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Send message",
//   description: "Register for a new account on Candidly.",
};

export default function Layout({ children }) {
  return (
    <div className="">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
