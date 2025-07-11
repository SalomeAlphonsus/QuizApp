'use client'
import { Suspense } from "react";

import WorkPlaceForm from "./workPlaceForm";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
           <WorkPlaceForm/>
        </Suspense>
            
        
    )
}