import {useState} from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { StepBack } from "lucide-react";
import { signOut } from 'next-auth/react';

function DashboardNavbar({name}) {
    const router = useRouter();
    const [showDetails, setShowDetails] = useState(false);

    const UserDetails = () => {
        const handleLogout = async () => {
            await signOut();
            router.push('/login');
          };

        return (
          <div className='absolute top-14  left-0 bg-white p-4 border rounded shadow'>
            <div className='flex gap-[2%] items-center text-red-500'>
                {/* <StepBack /> */}
                <span
                    className='cursor-pointer' 
                    onClick={handleLogout}
                >
                    Logout
                </span>
            </div>
          </div>
        );
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <nav
          className="fixed w-full flex items-center justify-between pl-5 pr-10 md:px-16 h-16 md:h-20 border backdrop-blur-lg md:border-b"
        >
            <Link href="/" className="text-3xl font-bold md:mr-[15%] text-[#241F1F]">
                Candid<span className="text-primaryColor">ly</span>
            </Link>
            <div className='relative w-[15%] h-[70%] md:w-[4%] md:h-[65%]'>
                <div 
                    className='cursor-pointer rounded-full bg-gray-50 border w-full h-full flex items-center justify-center'
                    onClick={toggleDetails}
                >
                    <h1 className='md:text-[1.35rem]'>
                        {name[0]}
                    </h1>
                </div>
                {showDetails && <UserDetails />}
            </div>

        </nav>
      );
}

export default DashboardNavbar
