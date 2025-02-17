'use client'
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "@/app/firebase";
import { useRouter } from "next/navigation";


const LoginForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        let newValue; //Declare a variable to hold the new value for the field
        if (type === "checkbox") {
            //if the input is a checkbox, use 'checked' value
            newValue = checked;
        } else {
            //if it's not a checkbox, use the 'value'
            newValue = value;
        }

        //keep existing values
        setFormData({
            ...formData, [id]: newValue, //update the changed field
        })
    }


    const handleLogin = async () => {
        const auth = getAuth(app);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log("User signed in:", user);
            setSuccessMessage("Successfully signed in!");
            setErrorMessage(""); // Clear any previous error messages
    
            // Clear input fields after successful login
            setFormData({
                email: "",
                password: "",
                rememberMe: false,
            });
    
            // Hide the success message after 1 1/2 seconds
            setTimeout(() => {
                setSuccessMessage("");
                router.push('/dashboard')
            }, 1500);

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                setErrorMessage("Incorrect email or password.");
            } /* else {
                setErrorMessage("An error occurred. Please try again.");
            } */
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        handleLogin();
    };




    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 ">
            <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Welcome Back</h2>
                <p className="text-center text-gray-600 text-sm mt-2">Login to your account</p>
                {successMessage && (
                    <div className="mt-4 text-green-600 text-center font-medium">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-4 text-red-600 text-center font-medium">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm bg-white"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm bg-white"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? (
                                        <AiOutlineEye size={20} />
                                    ) : (
                                        <AiOutlineEyeInvisible size={20} />
                                    )}
                                </button>
                            </div>
                        </label>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label type="rememberMe" className="ml-2 text-sm text-gray-900">Remember me</label>
                    </div>
                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link href="/forgotPassword" className="text-sm text-purple-600 hover:underline">Forgot Password?</Link>
                    </div>
                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700"
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;



