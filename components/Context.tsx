'use client'

import { useContext, useState,createContext } from "react"

type EmailContextType = {
    email: string | null;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  };
  
  // Create context with default values
  const EmailContext = createContext<EmailContextType | undefined>(undefined);
  

export const EmailProvider = ({children}:{children:React.ReactNode}) => {
    const [email,setEmail] = useState<string|null>(null);
return(
    <EmailContext.Provider value={{email,setEmail}}>
        {children}
    </EmailContext.Provider>
)
}

export const useEmail = () =>{
    const context = useContext(EmailContext);
    if(!context){
        throw new Error("useEmail must be used within a EmailProvider")
    }
    return context;
}