"use client";
import { useState } from "react";
import { db } from "@/app/firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { auth } from "@/app/firebase";

export default function Page() {
    const { id } = useParams(); // Get the quiz ID
    const [questionData, setQuestionData] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: ""
    });
    const handleChange = (e) => {

        setQuestionData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { question, option1, option2, option3, option4, correctAnswer } = questionData;
        if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {

            alert("Please fill in all fields");
            return;
        }

        try {
            const data ={
                userId: auth.currentUser.uid,
                quizId: id,
                question,
                option1,
                option2,
                option3,
                option4,
                correctAnswer,

                createdAt: new Date()
            }
            
            await
                addDoc(collection(db, "questions"),  data);
            console.log("Question added successfully!");
            alert("Question added!");

            // Clear the form fields
            setQuestionData({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correctAnswer: ""
            })
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Add Question</h1>
            <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label className="block text-gray-700 font-semibold mb-2">Question</label>
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={questionData.question}
                    name='question'
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3 bg-white text-black"
                />

                <label className="block text-gray-700 font-semibold mb-2">Options</label>
                <input type="text" value={questionData.option1} name="option1" onChange={handleChange} placeholder="Option 1" className="w-full border p-2 rounded mb-2 bg-white text-black" />
                <input type="text" value={questionData.option2} name="option2" onChange={handleChange} placeholder="Option 2" className="w-full border p-2 rounded mb-2 bg-white text-black" />
                <input type="text" value={questionData.option3} name="option3" onChange={handleChange} placeholder="Option 3" className="w-full border p-2 rounded mb-2 bg-white text-black" />
                <input type="text" value={questionData.option4} name="option4" onChange={handleChange} placeholder="Option 4" className="w-full border p-2 rounded mb-2 bg-white text-black" />

                <label className="block text-gray-700 font-semibold mb-2">Correct Answer</label>
                <input
                    type="text"
                    name="correctAnswer"
                    placeholder="Enter the correct answer"
                    value={questionData.correctAnswer}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-4 bg-white text-black"
                />

                <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Add Question
                </button>
            </form>
        </div>
    );
}