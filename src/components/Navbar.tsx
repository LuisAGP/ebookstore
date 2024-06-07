"use client"

import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

interface Props{
  filled: boolean
}

const Navbar = ({ filled }: Props) => {

  const { user, error, isLoading } = useUser();
  const [dropdown, setDropdown] = useState(false);

  return (
    <nav className={`w-full px-5 py-2 flex justify-between items-center h-24 ${filled && "bg-black"}`}>
      <Link href="/store" className='flex items-center gap-5'>
        <Image
          src="/assets/images/logo.jpg"
          height={70}
          width={70}
          alt="Logo IA-Stories"
        />
        <h1 className='text-white font-mono text-2xl font-bold m-0'>Stories</h1>
      </Link>


      {/* Descktop navbar */}
      <div className='hidden sm:flex gap-3'>

        {/* <Link href="/store" className='text-sm font-semibold text-center px-3 py-2 rounded-full border-2 border-gray-200 text-black bg-gray-200 hover:bg-green-500 hover:border-green-500 hover:text-gray-200'>
          Visit store
        </Link> */}

        {
          user ? (
            <>
              <Link
                href="/api/auth/logout"
                className='text-sm font-semibold flex justify-center items-center px-3 py-2 rounded-full border-2 border-gray-200 text-gray-200 bg-black hover:bg-gray-200 hover:text-black'
              >Logout</Link>
              <Link href="/profile">
                <Image
                  src={`${user.picture}`}
                  width={45}
                  height={45}
                  className='rounded-full'
                  alt='Profile picture'
                />
              </Link>
            </>
          ) : (
            <Link
              href="/api/auth/login"
              className='text-sm font-semibold text-center px-3 py-2 rounded-full border-2 border-gray-200 text-gray-200 bg-black hover:bg-gray-200 hover:text-black'
            >
              Login
            </Link>
          )
        }
      </div>

      {/* Mobile navbar */}
      <div className="sm:hidden relative text-white">
        <button
          type='button'
          onClick={() => setDropdown((prev) => !prev)}
        >
          {
            user ? (
              <Image
                src={`${user.picture}`}
                width={45}
                height={45}
                className='rounded-full'
                alt='Profile picture'
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )
          }
        </button>

        <div className={`absolute bg-gray-100 right-0 top-6 py-3 w-32 flex flex-col gap-3 rounded-xl ${ !dropdown && "hidden" }`}>
          {
            user ? (
                <>
                  <Link
                    href = "/api/auth/logout"
                    className='w-full px-2 py-1 text-black hover:bg-black hover:text-gray-200'
                  >
                    Logout
                  </Link>
                  <Link 
                    href="/profile"
                    className='w-full px-2 py-1 text-black hover:bg-black hover:text-gray-200'
                  >
                    Profile
                  </Link>
                </>
            ) : (
              <Link
                href="/api/auth/login"
                className='w-full px-2 py-1 text-black hover:bg-black hover:text-gray-200'
              >
                Login
              </Link>
            ) 
          }
    </div>
      </div >

    </nav >
  )
}

export default Navbar;
