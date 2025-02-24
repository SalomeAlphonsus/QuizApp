'use client'
import { FaPlusCircle, FaSearch, FaBell, FaBars } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";

export default function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "quizzes"), (snapshot) => {
            setQuizzes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const signOutFunc = () => {
        signOut(auth).then(() => {
            console.log('User logged out');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="flex items-center px-8 py-4 justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <img src="/Vector.png" />
                    <span className="text-black font-bold text-lg">Quizzo</span>
                </div>

                {/* Desktop Icons & Add Button */}
                <div className="hidden md:flex items-center gap-6">
                    <FaSearch className="text-black w-5 h-5 cursor-pointer" />
                    <FaBell className="text-black w-5 h-5 cursor-pointer" />
                    
                    <Link href="/dashboard/quiz/add">
                        <button className="btn bg-transparent text-black hover:text-white flex items-center">
                            <FaPlusCircle className="mr-2" /> Add
                        </button>
                    </Link>

                    {/* Log Out Dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="m-1">
                            <FaBars className="text-black w-5 h-5 cursor-pointer" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a onClick={signOutFunc}>Log Out</a></li>
                        </ul>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <FaBars 
                        className="text-black w-6 h-6 cursor-pointer" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    />
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 right-4 bg-white shadow-lg p-4 rounded-lg flex flex-col items-start space-y-3 md:hidden">
                    <button className="text-black flex items-center">
                        <FaSearch className="mr-2" /> Search
                    </button>
                    <button className="text-black flex items-center">
                        <FaBell className="mr-2" /> Notifications
                    </button>
                    <Link href="/dashboard/quiz/add">
                        <button className="btn bg-blue-500 text-white px-4 py-2 rounded-lg w-full flex items-center">
                            <FaPlusCircle className="mr-2" /> Add Quiz
                        </button>
                    </Link>
                    <button onClick={signOutFunc} className="text-red-500 w-full text-left">
                        Log Out
                    </button>
                </div>
            )}

            {/* Page Title */}
            <h1 className="text-3xl font-bold text-black mb-6 mt-3 text-center">All Quizzes</h1>

            {/* Quiz Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 place-items-center px-5 lg:px-12 lg:mb-6">
                {quizzes.map((quiz) => (
                    <Link key={quiz.id} href={`/dashboard/quiz/${quiz.id}`}>
                        <div className="cursor-pointer">
                            <Image src={`/${quiz.image}`} alt={quiz.title} className="w-96 h-64 object-cover rounded-md" width={400} height={400} />
                            <h3 className="text-black text-lg font-semibold mt-2">{quiz.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}