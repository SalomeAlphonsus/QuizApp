"use client"; 
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "@/app/firebase";
import { db } from "@/app/firebase";
import { useRouter } from "next/navigation";

export default function AddQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Creates a temporary URL for preview
    }
  };

  const createQuiz = async (data) => {

    try {
        // Save quiz data to Firebase
        const collectionRef = collection(db, "quizzes")
        await addDoc(collectionRef, data);

        router.push("/dashboard/quiz");
        console.log("Quiz saved to Firebase.");
    } catch (error) {
        console.log("Error saving quiz:", error.message);
        /* setErrorMsg(error.message); */
    }
};



  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new quiz object
    const newQuiz = {
      userId: auth.currentUser.uid,
      title,
      description,
      image: image.name, // Using preview as a placeholder
    };

    createQuiz(newQuiz);
    console.log("New Quiz Added:", newQuiz, image.name, auth.currentUser.uid);

    // Redirect to quiz page
    /* window.location.href = "/dashboard/quiz"; */
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Add a New Quiz</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md mt-1 bg-white title text-gray-700 font-semibold"
              placeholder="Enter quiz"
              required
            />
          </div>

          <div>
            <label className="block">Description</label>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md mt-1 bg-white text-gray-700 font-semibold "
            placeholder="Enter Description"
              required
            >
              
            </textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1" />
          </div>

          {/* Preview Image */}
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-md" />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Add Quiz
          </button>
        </form>
      </div>
    </div>
  );
}