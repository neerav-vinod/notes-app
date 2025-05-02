'use client'

import { Button } from "@/components/ui/button"
import {Card,CardHeader,CardDescription,CardContent,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input" 
import { Separator } from "@/components/ui/separator"
import { TriangleAlert } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"

export default function SigIn(){
    const [email,setEmail] = useState<string>('')
    const[password,setPassowrd] =useState<string>('')
    const [pending,setPending] = useState(false)
    const [error,setError] = useState('')

    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setPending(true);
        const res = await signIn("credentials",{
            redirect:false,
            email,
            password
        })

        if(res?.ok){
          router.push('/notes')
        }
        else if(res?.status === 401 ){
            setError('Invalid Credentials');
            setPending(false)
        } else {
            setError('Something went wrong');
        }
    }

    
    const handleProvider = (
        even: React.MouseEvent<HTMLButtonElement>,
        value:"github"
    )=>{
        event?.preventDefault();
        signIn(value,{callbackUrl:'/notes'})
    }

    return(
        <div className="h-full flex items-center justify-center" >
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
                <CardHeader >
                    <CardTitle className="text-center">
                        Sign in
                    </CardTitle>
                    <CardDescription className="text-sm text-center text-accent-foreground" >
                        Use email or service, to login
                    </CardDescription>
                </CardHeader>
                {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2  text-sm text-destructive ">
                        <TriangleAlert/>
                        <p>{error}</p>
                    </div>
                )}
                <CardContent className="px-2 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-3">    
                   
                    <Input
                        type="email"
                        disabled={pending}
                        placeholder="Email Address"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        disabled={pending}
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassowrd(e.target.value)}
                        required
                    />
                    <Button className="w-full" disabled={pending}>
                        Continue
                    </Button>
                </form>    
                <Separator/>
                <div className="flex my-2 justify-evenly mx-auto items-center">
                    <Button 
                    disabled={false}
                    onClick={(e)=>handleProvider(e,"github")}
                    variant = "outline"
                    size ="lg"
                    className="bg-slate-300 hover:bg-slate-400 hover:scale-110 "

                    >
                       <FaGithub className="size-8 left-2.5 top-2.5" />
                       Git Hub
                    </Button>
                </div>
                <p className="text-center text-sm mt-2 text-muted-foreground">
                    Already have an account?
                    <Link className="text-sky-700 ml-4 hover:underline cursor:pointer" href="signup">Sign up</Link>
                </p>
                </CardContent>
            </Card>
        </div>
    )
}