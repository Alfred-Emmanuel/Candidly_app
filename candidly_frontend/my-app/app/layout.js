import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candidly",
  description: "Welcome to candidly, the best way to get feedback from your team.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-left" />
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  );
}
