"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { app } from "@/app/firebase";

export default function Page() {
    const auth = getAuth(app);
    const userId = auth?.currentUser?.uid;
    const { id } = useParams();
    const router = useRouter();

    const [quizDetails, setQuizDetails] = useState({
        title: "",
        image: "",
        description: "",
        userId: "" // Ensure this exists to avoid undefined errors
    });

    const [isCreator, setIsCreator] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Fetch Quiz Details
    useEffect(() => {
        if (!id || !userId) return;

        const fetchQuizDetails = async () => {
            try {
                const docRef = doc(db, "quizzes", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const quizData = docSnap.data();
                    setQuizDetails(quizData);

                    // Set creator check
                    setIsCreator(quizData.userId === userId);

                    console.log("Quiz userId:", quizData.userId);
                    console.log("Current User ID:", userId);
                } else {
                    console.log("Quiz not found");
                }
            } catch (error) {
                console.error("Error fetching quiz details:", error);
            }
        };

        fetchQuizDetails();
    }, [id, userId]);

    // Fetch Quiz Questions
    useEffect(() => {
        if (!id) return;

        const fetchQuizQuestions = async () => {
            try {
                const q = query(collection(db, "questions"), 
                where("quizId", "==", id));
                const querySnapshot = await getDocs(q);
                const questionsArray = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        options: [data.option1, data.option2, data.option3, data.option4].filter(Boolean)
                    };
                });

                setQuestions(questionsArray);
                console.log("Fetched questions:", questionsArray);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuizQuestions();
    }, [id]);

    // Handle answer selection
    const handleAnswerChange = (questionId, selectedOption) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: selectedOption,
        }));
    };

    // Handle Next button
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateScore();
            setShowResults(true);
        }
    };
    const calculateScore = () =>{
        let totalScore = 0;
        questions.forEach((q) =>{
            if (userAnswers[q.id] === q.correctAnswer) {
                totalScore += 1;
            }
        })
        setScore(totalScore);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 capitalize">
                        {quizDetails.title}
                    </h1>
                    
                    {/* Show button only if user is the creator */}
                    {isCreator && (
                        <button
                            onClick={() => router.push(`/dashboard/quiz/${id}/question`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Add Question
                        </button>
                    )}
                </div>

                <img
                    src={`/${quizDetails.image}`}
                    alt={quizDetails.title}
                    className="mt-4 w-full h-48 object-cover rounded-lg shadow-md"
                />

                {quizDetails.description && (
                    <p className="text-gray-600 mt-4 capitalize text-xl font-semibold">
                        {quizDetails.description}
                    </p>
                )}

                <div className="mt-6 text-left">
                    <h2 className="text-xl font-semibold text-black">Questions</h2>

                    {!showResults ? (
                        <>
                            <div className="mt-4 p-4 rounded-lg">
                                <p className="font-semibold text-black">
                                    {questions[currentQuestionIndex]?.question}
                                </p>
                                <ul className="mt-2">
                                    {questions[currentQuestionIndex]?.options.map((option, i) => (
                                        <li key={i} className="mt-2">
                                            <button
                                                onClick={() =>
                                                    handleAnswerChange(questions[currentQuestionIndex].id, option)
                                                }
                                                className={`w-full text-left p-2 border rounded-lg ${
                                                    userAnswers[questions[currentQuestionIndex]?.id] === option
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white text-black"
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={handleNext}
                                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
                            >
                                {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
                            </button>
                        </>
                    ) : (
                        <div className="mt-6">
                            <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black">Results</h2>
                            <p className="text-xl font-bold text-green-600"> {score} / {questions.length}</p>
                            </div>
                            {questions.map((q) => (
                                <div
                                    key={q.id}
                                    className={`mt-4 p-4 rounded-lg border ${
                                        userAnswers[q.id] === q.correctAnswer
                                            ? "border-green-500"
                                            : "border-red-500"
                                    }`}
                                >
                                    <p className="font-semibold text-black">{q.question}</p>
                                    <p className="text-black">Your answer: {userAnswers[q.id]}</p>
                                    {userAnswers[q.id] !== q.correctAnswer && (
                                        <p className="text-red-500">Correct answer: {q.correctAnswer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}