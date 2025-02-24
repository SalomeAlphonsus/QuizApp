"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";

export default function FindFriends() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersArray);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-black mb-6">Find Friends</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
                        <FaUserCircle className="text-gray-600 w-12 h-12 mb-2"/>
                        <div>
                            <h2 className="text-lg font-semibold text-black">{user.fullName}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}