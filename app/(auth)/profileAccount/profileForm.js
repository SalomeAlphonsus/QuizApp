'use client'

import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        country: '',
        age: '',
    })

    const searchParams = useSearchParams()
      const accountType = searchParams.get('accountType')
      const workType = searchParams.get('workType')
      console.log(accountType, workType);

      const [errorMsg, setErrorMsg] = useState('');
        
          const handleSubmitBtn = () =>{
            if (formData.fullName,formData.dateOfBirth,formData.phoneNumber,formData.country,formData.age =='') {
              setErrorMsg('Please fill in the necessary information') 
            } else{
              router.push(`/signUp?accountType=${accountType}&workType=${workType}&fullName=${formData.fullName}&dateOfBirth=${formData.dateOfBirth}&phoneNumber=${formData.phoneNumber}&country=${formData.country}&age=${formData.age}`)
            }
          }
        
          const closeAlert = () =>{
            setErrorMsg('')
          }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data', formData)
        setFormData({
            fullName: '',
            dateOfBirth: '',
            phoneNumber: '',
            country: '',
            age: '',
        })
    }

    return (
        <div className="flex items-center justify-center px-5">{errorMsg !== '' &&
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

            <div className="max-w-xl p-6 bg-white shadow-md rounded-lg ">
                <div className="flex space-x-9">
                    <FaArrowLeft className="w-6 h-6 text-black" />
                    <progress className="progress progress-primary w-56 mt-2" value="70" max="100"></progress>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-center mb-2 mt-1 text-black">Create an Account</h2>
                <p className="text-gray-800 text-center text-sm">Please complete your profile</p>
                <p className="text-gray-800 text-center max-w-sm text-sm mb-4">Don't worry, your data will remain private and only you can see it</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">
                            Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 border-b rounded-lg bg-white text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-b rounded-lg text-black bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border-b rounded-lg bg-white text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Enter your country"
                            className="w-full px-3 py-2 border-b rounded-lg bg-white text-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter your age"
                            className="w-full px-3 py-2 border-b rounded-lg bg-white text-black"
                            required
                        />
                    </div>
                    <button
                    onClick={handleSubmitBtn}
                        type="submit"
                        className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600"
                    >
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
}


export default ProfileForm;