'use client'
import { db } from "../../firebase";
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

const SignUpForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rememberMe: false,
    });

    const searchParams = useSearchParams();
    const accountType = searchParams.get('accountType');
    const workType = searchParams.get('workType');
    const fullName = searchParams.get('fullName');
    const dateOfBirth = searchParams.get('dateOfBirth');
    const phoneNumber = searchParams.get('phoneNumber');
    const country = searchParams.get('country');
    const age = searchParams.get('age');

    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUpUser();
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const signUpUser = async () => {
        const auth = getAuth();
        const { email, password } = formData;
    
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setErrorMsg("This email is already in use. Please use a different email.");
                return;   
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            await addDoc(collection(db, "users"), {
                accountType,
                workType,
                fullName,
                dateOfBirth,
                phoneNumber,
                country,
                age,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                createdAt: new Date(),
            });

            console.log("User details saved to Firebase.");
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    const closeAlert = () => setErrorMsg('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-lg rounded-lg p-6 md:p-8">

                {errorMsg && (
                    <div role="alert" className="alert alert-info absolute top-5 right-5 max-w-xs">
                        <span className="text-sm">{errorMsg}</span>
                        <button onClick={closeAlert} className="ml-2 text-gray-500">×</button>
                    </div>
                )}

                <div className="flex space-x-4 items-center mb-6 justify-center">
                    <FaArrowLeft className="w-5 h-5 text-gray-600" />
                    <progress className="progress progress-primary w-40 md:w-56" value="100" max="100"></progress>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h2>
                <p className="text-sm md:text-md text-center text-gray-600 mb-4">
                    Please enter your username, email address and password. If you forgot it, then you have to do forgot password
                </p>

                <form className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full mt-1 px-4 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-md text-black bg-white focus:outline-none focus:ring focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full text-black mt-1 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-purple-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="h-4 w-4 text-purple-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-600">Remember me</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="w-full bg-purple-500 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-600 transition-all"
                    >
                        Sign Up
                    </button>
                </form>

                {/* OR Separator */}
                <div className="flex items-center my-4">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <span className="px-3 text-sm text-gray-500">OR</span>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                {/* Social Login */}
                <button className="w-full flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 transition-all">
                    <FcGoogle className="text-2xl mr-3" />
                    Sign up with Google
                </button>

                {/* Footer */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?
                    <a href="/login" className="text-purple-500 font-medium hover:underline"> Sign in</a>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;