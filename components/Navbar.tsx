/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => router.push('/')}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Player's Nexus
          </span>
        </a>
        <div className="flex md:order-2">
          {session && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          )}
          {/* Other controls can be added here */}
        </div>
        <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <span
              onClick={() => router.push('/')}
              className="cursor-pointer block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white"
              aria-current="page"
            >
              Games
            </span>
          </li>
          <li>
            <span
              onClick={() => router.push('/news')}
              className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
              News
            </span>
          </li>
          <li>
            <span
              onClick={() => router.push('/friends')}
              className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
              Friends
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;