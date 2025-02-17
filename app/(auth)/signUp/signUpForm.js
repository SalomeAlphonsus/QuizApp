'use client'
import { db } from "../../firebase";
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";


const SignUpForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rememberMe: false,
    });

    const searchParams = useSearchParams()
    const accountType = searchParams.get('accountType')
    const workType = searchParams.get('workType')
    const fullName = searchParams.get('fullName')
    const dateOfBirth = searchParams.get('dateOfBirth')
    const phoneNumber = searchParams.get('phoneNumber')
    const country = searchParams.get('country')
    const age = searchParams.get('age')

    const [errorMsg, setErrorMsg] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUpUser();
            console.log("User signed up successfully")
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    /* const signUpUser = () => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });

    }
 */
    const signUpUser = async () => {
        const auth = getAuth();
        const { email, password } = formData;
    
        try {
            //Check if the email is already registered
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setErrorMsg("This email is already in use. Please use a different email.");
                return;   
            }

            //If email is not registered, proceed with signUp
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            console.log("User created successfully:", user);
    
            // Save user data to Firebase
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
                password:formData.password,
                createdAt: new Date(),
            });
    
            console.log("User details saved to Firebase.");
        } catch (error) {
            console.log("Error during sign up:", error.message);
            setErrorMsg(error.message);
        }
    };
    
    const closeAlert = () => {
        setErrorMsg('')
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center ">
            <div className="flex items-center justify-center ">{errorMsg !== '' &&
                <div role="alert" className="alert alert-info absolute top-5 right-5 max-w-xs">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 shrink-0 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm">{errorMsg}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-6 w-6 shrink-0 stroke-current" onClick={closeAlert}><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </div>
            }
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <div className="flex space-x-9 justify-center items-center mb-4 mr-10">
                        <FaArrowLeft className="w-6 h-6 text-black" />
                        <progress className="progress progress-primary w-56 mt-2" value="100" max="100"></progress>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Create an Account
                    </h2>
                    <p className="max-w-sm text-md text-center text-gray-800 mb-4">Please enter your username, email address and password. If you forget it, then you have to do forgot password.</p>
                    <form>
                        {/* Username */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full mt-1 px-4 py-2 border rounded-md bg-white text-black"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 border rounded-md text-black bg-white"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
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
                        <div className="flex items-center mb-4 mt-2">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 text-purple-500 border-gray-300 rounded focus:ring-purple-400"
                            />
                            <label className="ml-2 block text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="w-full bg-purple-500 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-600"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* OR Separator */}
                    <div className="flex items-center my-6">
                        <div className="border-t border-gray-300 flex-grow"></div>
                        <span className="px-3 text-sm text-gray-500">OR</span>
                        <div className="border-t border-gray-300 flex-grow"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-4">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-200"
                        >
                            <FcGoogle className="text-2xl mr-3" />
                            Sign up with Google
                        </button>

                    </div>

                    {/* Footer */}
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?
                        <a href="/login" className="text-purple-500 font-medium hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
