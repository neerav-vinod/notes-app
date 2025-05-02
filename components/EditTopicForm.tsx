'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

type PageProps={
    id:string;
    title:string,
    description:string;
}

export default function EditTopicForms({id,title,description}:PageProps){
    const [newTitle,setNewTitle] = useState(title);
    const [newDescription,setNewDescription] = useState(description);

    const route = useRouter();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({newTitle,newDescription})
            });
            if(!res.ok){
                throw new Error("Failedto update topic")
            }
            route.push('/')
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
            onChange={(e)=>setNewTitle(e.target.value)}
            value={newTitle}
            type="text"
            className="border border-slate-500 px-8 py-2"
            placeholder="Topic Title"
            />
            <input 
            onChange={(e)=>setNewDescription(e.target.value)}
            value={newDescription}
            type="text"
            className="border border-slate-500 px-8 py-2"
            placeholder="Topic Description"
            />
            <button className="bg-green-600 px-6 py-3 w-fit text-white font-bold">Update Topic</button>
        </form>
    )
}