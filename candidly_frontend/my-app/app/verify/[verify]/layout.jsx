import "../../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candidly verify",
  description: "Verify your account on Candidly.",
};

export default function Layout({ children }) {
  return (
    <div className="">
      <Provider>
      <Navbar />
      <section className="">
        <main className="">{children}</main>
      </section>
      </Provider>
    </div>
  );
}
