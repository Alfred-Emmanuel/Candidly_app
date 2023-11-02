import Link from "next/link";
import { ChevronLeftCircle } from "lucide-react";

const SignUp_navbar = () => {
  return (
    <nav
      className="fixed w-full flex items-center pl-5 md:pl-16 h-16 md:h-20 border backdrop-blur-lg md:border-b"
    >
      <Link href="/" className="flex gap-2">
        <span>
          <ChevronLeftCircle />
        </span>
        <span>Back to Home</span>
      </Link>
    </nav>
  );
};

export default SignUp_navbar;
