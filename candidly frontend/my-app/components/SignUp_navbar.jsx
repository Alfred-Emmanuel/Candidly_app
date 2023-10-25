import Link from 'next/link'
import { ChevronLeftCircle } from "lucide-react";

const SignUp_navbar = () => {
  return (
    <nav className="md:flex items-center md:pl-16 md:h-20 md:border md:border-b">
        <Link href="/" className="flex gap-2">
          <span>
            <ChevronLeftCircle />
          </span>
          <span>Back to Home</span>
        </Link>
    </nav>
  );
}

export default SignUp_navbar