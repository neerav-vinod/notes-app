'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader } from "lucide-react"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useEmail } from "./Context"

export default function Navbar() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const {setEmail} = useEmail();

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session?.user?.email)
      localStorage.setItem("userEmail",session?.user?.email)
    }
  }, [session,setEmail])


  

  if (status === 'loading') {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />
  }

  const navigate = () =>{
    router.push('/addtopic')
  }

  const handleSignout = async() =>{
      await signOut({
        redirect:false
      });
      localStorage.clear();
      router.push('/')
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase()

  return (
    <div>
      <nav>
        {session && (
          <div className="flex justify-between items-center px-4 ">
            <div>Notes</div>
            <div><button className="bg-black text-white p-2 rounded-xl" onClick={navigate}>Add Note</button></div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none flex justify-between relative p-4 md:p-8">
                <div className="flex gap-4 items-center">
              <span className="mr-2">
                {session.user?.name}
              </span>
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition"
                  src={session.user?.image || undefined}
                />
                <AvatarFallback className="bg-sky-500 text-white">{avatarFallback}</AvatarFallback>
              </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="bottom" className="w-50">
              <DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        )}
      </nav>
    </div>
  )
}
