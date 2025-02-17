'use client'
import {FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";

/* const quizData =[
    {id: 1, title: "Quiz 1", image:'/Image.png'},
    {id: 2, title: "Quiz 2", image:'/Image (1).png'},
    {id: 3, title: "Quiz 3", image:'/Mask Group.png'},
    {id: 4, title: "Quiz 4", image:'/Mask Group (1).png'},
    {id: 5, title: "Quiz 5", image:'/Mask Group (1).png'},
    {id: 6, title: "Quiz 6", image:'/Mask Group (1).png'}
]; */


export default function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const unsubcribe = onSnapshot (collection(db,"quizzes"), (snapshot) => {
          setQuizzes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        });
    
        console.log(quizzes, 'quiz added')
        return() => unsubcribe
      }, []);

      useEffect(() => {
        console.log(quizzes)
      }, [quizzes]);
    return(
        <div>
            <div>
            <nav className="flex flex-row justify-between px-14">
            <h1 className="text-3xl font-bold text-black mb-6 mt-3">All Quizzes</h1>
            <Link href="/dashboard/quiz/add"><button className="btn bg-transparent mt-3 mb-6 text-black hover:text-white">
                Add
            {/* <h1 className="text-black">Add</h1> */}
            <FaPlusCircle className="  object-cover cursor-pointer"/>
            </button>
            </Link>
            </nav>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 place-items-center px-5 lg:px-12 lg:mb-6">
                {quizzes.map((quiz) => (
                    <Link key={quiz.id} href={`/dashboard/quiz/${quiz.id}`}>
                        <div className="cursor-pointer">
                        <Image src={`/${quiz.image}`} alt={quiz.title} className="w-96 h-64 object-cover rounded-md" width={400} height={400}/>
                        <h3 className="text-black text-lg font-semibold mt-2">{quiz.title}</h3>
                        </div>
                    </Link>
                )
                
                )}
            </div>
        </div>
    )
}

