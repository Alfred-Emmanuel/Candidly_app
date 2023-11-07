import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

function Footer() {
  return (
      <div className='bg-primaryColor text-white py-10 px-5 md:pt-20 md:px-16 lg:px-24 mt-20 '>
        <div className='md:flex md:gap-[5%] lg:gap-[15%]'>
          <div className='mb-10 md:mb-0'>
            <h1 className='mb-2 md:mb-3 text-[1.3rem] font-semibold'>Candidly</h1>
            <p className='text-[1rem] w-[60%] tracking-wider md:tracking-normal md:text-[0.95rem] md:w-[80%] '>
              Spearheading workplace revolution
            </p>
          </div>
          <div className='md:flex justify-around w-[60%]'>
            <div className='mb-10 md:mb-0'>
              <h1 className=' text-[1.2rem] mb-2 md:mb-3 md:text-[1.1rem]'>Your Account</h1>
              <ul className=''>
                <li className='text-[1rem] mb-1 md:text-[0.9rem]'>
                  <Link href={`/sign_up`} className='hover:text-gray-400'>
                    Sign Up
                  </Link>
                </li>
                <li className='text-[1rem] mb-1 md:text-[0.9rem]'>
                  <Link href={`/login`} className='hover:text-gray-400'>
                    Login
                  </Link>
                </li>
                <li className='text-[1rem] mb-1 md:text-[0.9rem]'>
                  <Link href={`/#`} className='hover:text-gray-400'>
                    Help
                  </Link>
                </li>
            </ul>
          </div>
          <div className='mb-10 md:mb-0'>
            <h1 className=' text-[1.2rem] mb-2 md:mb-3 md:text-[1.1rem]'>Company</h1>
            <ul className=''>
              <li className='text-[1rem] mb-1 md:text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400'>
                  About
                </Link>
              </li>
              <li className='text-[1rem] mb-1 md:text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400'>
                  Enquiries
                </Link>
              </li>
            </ul>
          </div>
          <div className='mb-10 md:mb-0'>
            <h1 className=' text-[1.2rem] mb-2 md:mb-3 md:text-[1.1rem]'>Legal</h1>
            <ul className=''>
              <li className='text-[1rem] mb-1 md:text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400 cursor-not-allowed'>
                  Privacy Policy
                </Link>
              </li>
                <li className='text-[1rem] mb-1 md:text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400 cursor-not-allowed'>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='md:mt-12 md:flex justify-between'>
        <div className='flex gap-5 order-2 mb-5 md:mb-0'>
          <div className='border p-1 rounded-full'>
            <Facebook />
          </div>
          <div className='border p-1 rounded-full'>
            <Instagram />
          </div>
          <div className='border p-1 rounded-full'>
            <Twitter />
          </div>
        </div>
        <p className='text-center md:text-left'>
          &copy; Candidly 2023. All rights reserved.
        </p>
      </div>
      </div>
  )
}

export default Footer