import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

function Footer() {
  return (
      <div className='bg-primaryColor text-white py-20 px-24 mt-20 '>
        <div className='flex gap-[15%]'>
          <div>
            <h1 className='md:mb-3 text-[1.1rem]'>Candidly</h1>
            <p className='text-[0.95rem]'>
              Spearheading workplace <br/> revolution
            </p>
          </div>
          <div className='flex justify-around w-[60%]'>
            <div>
              <h1 className='md:mb-3 text-[1.1rem]'>Your Account</h1>
              <ul className=''>
                <li className='md:mb-1 text-[0.9rem]'>
                  <Link href={`/sign_up`} className='hover:text-gray-400'>
                    Sign Up
                  </Link>
                </li>
                <li className='md:mb-1 text-[0.9rem]'>
                  <Link href={`/login`} className='hover:text-gray-400'>
                    Login
                  </Link>
                </li>
                <li className='md:mb-1 text-[0.9rem]'>
                  <Link href={`/#`} className='hover:text-gray-400'>
                    Help
                  </Link>
                </li>
            </ul>
          </div>
          <div>
            <h1 className='md:mb-3 text-[1.1rem]'>Company</h1>
            <ul className=''>
              <li className='md:mb-1 text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400'>
                  About
                </Link>
              </li>
              <li className='md:mb-1 text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400'>
                  Enquiries
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className='md:mb-3 text-[1.1rem]'>Legal</h1>
            <ul className=''>
              <li className='md:mb-1 text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400 cursor-not-allowed'>
                  Privacy Policy
                </Link>
              </li>
              <li className='md:mb-1 text-[0.9rem]'>
                <Link href={`/#`} className='hover:text-gray-400 cursor-not-allowed'>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='md:mt-12 flex justify-between'>
        <p>
          &copy; Candidly 2023. All rights reserved.
        </p>
        <div className='flex gap-5'>
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
      </div>
      </div>
  )
}

export default Footer