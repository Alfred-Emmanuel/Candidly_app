"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0 && currentScrollY > prevScrollY);
      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    document.body.style.overflow = isMobileNavOpen ? "auto" : "hidden"; // Toggle body scrolling
  };

  const closeMobileNav = () => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
      document.body.style.overflow = "auto"; // Enable body scrolling
    }
  };

  return (
    
    <nav
      className={`lg:h-24 bg-dark-mode-background-color md:bg-transparent lg:flex lg:items-center lg:justify-center fixed z-40 md:backdrop-blur-lg w-full -top-1 border-b transition-transform duration-300 transform ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className=" hidden lg:flex items-center lg:mx-[7%] lg:w-full">
        <Link href="/" className="text-3xl font-bold md:mr-[15%] text-[#241F1F]">
          Candid<span className="text-primaryColor">ly</span>
        </Link>
        <div className="lg:flex justify-around items-center lg:w-[80%] lg:mr-[2%]">
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex w-[35%] text-[1.1rem] text-textColor justify-around items-center">
            <li>
              <Link href="/#features" className="hovered-link">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hovered-link">
                About Us
              </Link>
            </li>
            {/* <li>
              <Link href="#faqs" className="hovered-link">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hovered-link">
                Contact
              </Link>
            </li> */}
          </ul>
          <div className="flex items-center justify-between w-[20%]">
            <Link
              href={`${status === "authenticated" ? "/dashboard" : "/login"}`}
              className={`text-textColor text-[1.1rem] font-bold ${status === "authenticated" ? "bg-primaryColor text-white w-28 h-10 flex items-center justify-center rounded-full" : ""}`}
            >
              {status === "authenticated" ? "Dashboard" : "Login"}
            </Link>
            <Link
              href="/sign_up"
              className={`bg-primaryColor text-white w-24 h-10 flex items-center justify-center rounded-full font-bold ${status === "authenticated" ? "hidden" : ""}`}
            >
              Sign Up
            </Link>
          </div>
          {/* <div>
            <Link
              href={`/dashboard/${status === "authenticated" ? "home" : ""}`}
            >
              {status === "authenticated" ? "Dashboard" : "Login"}
            </Link>
          </div> */}
        </div>
      </div>

      <div className="lg:hidden flex px-5 justify-between h-16 items-center backdrop-blur-lg">
        <Link href="/" className="text-2xl font-bold">
          Candid<span className="text-primaryColor">ly</span>
        </Link>

        <div className="lg:hidden">
          <button
            onClick={toggleMobileNav}
            className="block text-3xl text-primaryColor"
          >
            {isMobileNavOpen ? (
             <X />
            ) : (
              <Menu />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div
          className={`lg:hidden h-screen bg-gray-500 text-white overflow-y-hidden relative z-50 py-4 px-8 w-full`}
        >
          <ul className=" md:mb-14">
            <li className="mb-4 md:text-[1.3rem]">
              <Link href="/#about" onClick={closeMobileNav}>
                About
              </Link>
            </li>
            <li className="mb-4 md:text-[1.3rem]">
              <Link href="/#features" onClick={closeMobileNav}>
                Features
              </Link>
            </li>
            {/* <li className="mb-4 md:text-[1.3rem]">
              <Link href="#faqs" onClick={closeMobileNav}>
                FAQs
              </Link>
            </li>
            <li className="mb-4 md:text-[1.3rem]">
              <Link href="/contact" onClick={closeMobileNav}>
                Contact
              </Link>
            </li> */}
            <li className="mb-10 mt-6">
              <Link
                href={`${status === "authenticated" ? "/dashboard" : "/login"}`}
                className="lg:hidden  bg-primaryColor px-5 py-3 md:px-12 md:py-4 rounded-full "
              >
                {status === "authenticated" ? "Dashboard" : "Login"}
              </Link>
            </li>
            <li className=" ">
              <Link
                href="/sign_up"
                className={`lg:hidden bg-primaryColor px-5 py-3 md:px-12 md:py-4 rounded-full ${status === "authenticated" ? "hidden" : ""}`}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
