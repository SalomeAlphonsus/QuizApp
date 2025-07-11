'use client'
import { FaSearch, FaBell, FaUser, FaBars} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Link from "next/link";

const FindFriends = () => {
  const signOutFunc = () =>{
    signOut(auth).then(() => {
      console.log('User logged out');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  }
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center  md:px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src="Type=Logo Default, Component=Logo.svg" />
          <span className="text-black font-bold text-lg">Quizzo</span>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
        
          <FaSearch className="text-black w-5 h-5 cursor-pointer" />
          <FaBell className="text-black w-5 h-5 cursor-pointer" />
       

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className=" m-1"><FaBars className="text-white w-5 h-5 cursor-pointer" color="black"/></div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a onClick={signOutFunc}>Log Out</a></li>
          </ul>
        </div>
        </div>

      </nav>

      {/* Header Section */}
      <header className="w-full max-w-lg bg-gradient-to-r from-[#6949FF] to-[#876DFF] p-6 md:p-10 rounded-xl shadow-lg relative mt-10 lg:left-9 left-0">
        <div className="flex justify-between">
          {/* Left Side: Text and Button */}
          <div>
            <p className="text-lg text-white font-semibold mb-4">
              Play quiz together with <br /> your friends now!
            </p>
            <Link href="/dashboard/findFriends">
            <button className="bg-white text-purple-600 px-4 py-2 rounded-full mt-4">
              Find Friends
            </button>
            </Link>
          </div>

          {/* Right Side: Scattered Icons */}
          <div className="relative w-40 h-32">
            <FaUser
              className="absolute top-0 left-2 w-8 h-8 bg-gray-300 rounded-full border-2 border-white"
              color="black"
            />
            <FaUser
              className="absolute top-4 left-10 w-8 h-8 bg-purple-400 rounded-full border-2 border-white"
              color="black"
            />
            <FaUser
              className="absolute top-2 left-20 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"
              color="black"
            />
            <FaUser
              className="absolute top-8 left-6 w-8 h-8 bg-green-400 rounded-full border-2 border-white"
              color="black"
            />
            <FaUser
              className="absolute top-12 left-14 w-8 h-8 bg-blue-400 rounded-full border-2 border-white"
              color="black"
            />
            <FaUser
              className="absolute top-16 left-2 w-8 h-8 bg-pink-400 rounded-full border-2 border-white"
              color="black"
            />
            <FaUser
              className="absolute top-10 left-24 w-8 h-8 bg-red-400 rounded-full border-2 border-white"
              color="black"
            />
            <FaUser
              className="absolute top-18 left-18 w-8 h-8 bg-indigo-400 rounded-full border-2 border-white"
              color="black"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default FindFriends;