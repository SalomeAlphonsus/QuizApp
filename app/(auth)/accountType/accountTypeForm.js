'use client'

import { FaUser, FaChalkboardTeacher, FaGraduationCap, FaBriefcase, FaArrowLeft } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccountTypeForm = () => {
  const router = useRouter()
  const accountTypes = [
    { id: 1, label: "Personal", color: "bg-app-blue", icon: <FaUser className="w-6 h-6 text-white" /> },
    { id: 2, label: "Teacher", color: "bg-app-orange", icon: <FaChalkboardTeacher className="w-6 h-6 text-white" /> },
    { id: 3, label: "Student", color: "bg-app-green", icon: <FaGraduationCap className="w-6 h-6 text-white" /> },
    { id: 4, label: "Professional", color: "bg-app-red", icon: <FaBriefcase className="w-6 h-6 text-white" /> },
  ];

  const [accountType, setAccountType] = useState('')
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () =>{
    if (accountType =='') {
      setErrorMsg('select an account type') 
    } else{
      router.push(`/workPlace?accountType=${accountType}`)
    }
  }

  const closeAlert = () =>{
    setErrorMsg('')
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {errorMsg !== '' &&
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

      <div className="flex space-x-9">
        <FaArrowLeft className="w-6 h-6 text-black" />
        <progress className="progress progress-primary w-56 mt-2" value="10" max="100"></progress>
      </div>
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-black">
        What type of account do you like to create?
      </h1>
      <p className="text-gray-600 text-center mb-6">
        You can always change it later if you're not sure.
      </p>

      {/* Account Type Buttons */}
      <div className="w-full max-w-md space-y-4">
        {accountTypes.map((type) => (
          <button
            key={type.id}
            className={`flex items-center p-4 ${accountType === type.label ? "bg-blue-500" : "bg-white"} rounded-lg shadow-md hover:bg-gray-100 w-full`}
            onClick={() => setAccountType(type.label)}
          >
            {/* Icon with Colored Background */}
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-lg shrink-0 ${type.color}`}
            >
              {type.icon}
            </div>
            {/* Text Label */}
            <span className="ml-4 text-lg font-medium text-gray-700">
              {type.label}
            </span>
          </button>
        ))}
      </div>


      {/* Skip Button */}
      <button onClick={handleSubmit} className="mt-6 w-80 bg-app-light-gray py-2 text-purple-600 text-lg rounded-full shadow-lg text-center">
        Next
      </button>
    </div>
  );
};

export default AccountTypeForm;