'use client';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
    const router = useRouter()

     useEffect(() =>{
        //const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // ...
                console.log(user)
            } else {
                console.log(user)
                router.push('/login')
            }
        });
     },[])
    return (
        <div>
            {children}
        </div>
    );
}
