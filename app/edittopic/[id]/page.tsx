import EditTopicForms from "@/components/EditTopicForm";

const getTopicById = async (id:string) =>{
    try{
        const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
            cache:"no-store"
        });

        if(!res.ok){
            throw new Error('Failed to fetch topic');
        }

        return res.json();
    }
    catch(error){
        console.log(error);
        
    }
}

type pageProps ={
    params:{
        id:string;
    };  
};

export default async function EditTopic({params}:pageProps){
    const {id} = params
    const data = await getTopicById(id);
    const {title,description} = data.topic;
    return(
        <EditTopicForms id={id} title={title} description={description}/>
    )
}