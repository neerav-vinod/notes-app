'use client'
import { useEmail } from "@/components/Context";
import Navbar from "@/components/Navbar";
import RemoveBtn from "@/components/RemoveBtn";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";



export default function Notes () {

    type arrayData = {
        _id:string;
        description:string,
        userEmail:string,
        title:string
    }


   const [dataarray,setDataArray] = useState();
   
   const router = useRouter();

   const {email,setEmail} = useEmail();


    const fetchapi = async() =>{
        
        const res = await fetch(`/api/topics/`,{
            method:"GET" 
        })
        const data = await res.json();
        console.log(data);
        console.log(email);
        setDataArray(data.topics);    
    }

    useEffect(()=>{
        fetchapi();
    },[])
    return(
        <div>
            <SessionProvider>
                <Navbar/>
            </SessionProvider>  
        
        {dataarray?.map((t:arrayData)=>(
                <div  key={t._id} className="p-4 border border-slate-300 flex my-3 justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">{t.title}</h2>
                        <div>{t.description}</div>
                    </div>
        
                    <div className="flex gap-2 ">
                        {/* <RemoveBtn id={t._id}/>
                        <Link href={`edittopic/${t._id}`}> <HiPencilAlt size={24}/> </Link> */}
                    </div>
                </div>
                ))}

        </div>
    )
}