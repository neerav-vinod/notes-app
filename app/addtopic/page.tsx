'use client';

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTopic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const Useremail = localStorage.getItem('userEmail');
  
  

  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");

    if (!title || !description) {
      alert("Title and description required");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ title, description, Useremail }),
      });

      if (res.ok) {
        console.log("Successfully created");
        router.push('/notes'); // redirect after success
      } else {
        throw new Error('Failed to create a topic');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SessionProvider><Navbar/></SessionProvider>
      
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Description"
      />
      <button type="submit" className="bg-green-600 px-6 py-3 w-fit text-white font-bold">
        Add Topic
      </button>
    </form>
    </div>
  );
}
