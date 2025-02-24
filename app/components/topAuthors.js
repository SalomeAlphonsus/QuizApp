'use client'

import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Ensure the correct import path
import { collection, getDocs } from 'firebase/firestore';
import Card from './card';
import Link from 'next/link';

const TopAuthors = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const userList = querySnapshot.docs.slice(0, 4).map((doc, index) => ({
                    id: doc.id,
                    name: doc.data().fullName, // Updated from 'name' to 'fullName'
                    image: `/Ellipse (${index + 1}).png`, // Keeping images from Public folder
                }));
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="relative lg:bottom-32 bottom-0">
            <div className="flex justify-between items-center mb-6 px-10">
                <h2 className="text-2xl font-bold text-black">Top Authors</h2>
                <Link href="/dashboard/findFriends" className="text-primary text-sm hover:underline">
                    View all →
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {users.map((user) => (
                    <Card key={user.id} image={user.image} name={user.name} />
                ))}
            </div>
        </div>
    );
};

export default TopAuthors;