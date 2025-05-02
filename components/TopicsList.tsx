import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "./RemoveBtn";


const getTopics = async () =>{
    try {
        const res = await fetch(`http://localhost:3000/api/user`,{
            cache:"no-store"
        });

        if(!res.ok){
            throw new Error("Failed to fetch data");
        }

        return res.json();

    } catch (error) {
        console.log("Error loading topics:",error);
        return {topic:[]}
    }
}

export default async function TopicsList(){

    const {topics} = await getTopics();

    type Topic = {
       _id:string;
       title:string;
       description:string; 
    }

    return(
        <>
        {topics.map((t:Topic)=>(
        <div  key={t._id} className="p-4 border border-slate-300 flex my-3 justify-between gap-5 items-start">
            <div>
                <h2 className="font-bold text-2xl">{t.title}</h2>
                <div>{t.description}</div>
            </div>

            <div className="flex gap-2 ">
                <RemoveBtn id={t._id}/>
                <Link href={`edittopic/${t._id}`}> <HiPencilAlt size={24}/> </Link>
            </div>
        </div>
        ))}
        </>
    )
}