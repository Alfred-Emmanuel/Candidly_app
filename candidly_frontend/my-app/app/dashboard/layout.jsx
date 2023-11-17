import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/SignUp_navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candidly Sign Up",
  description: "Register for a new account on Candidly.",
};

export default function Layout({ children }) {
  return (
    <div className="">
      <Navbar />
      <Provider>
        {children}
      </Provider>
      {/* <Footer /> */}
    </div>
  );
}
