import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import User from '@/models/user'
import connectMongoDB from '@/libs/mongodb';

export async function POST(request:Request){
    const {name,email,password, confirmPassword} = await request.json();

    // const isValidEmail = (email:string) =>{
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    //     return emailRegex.test(email);
    // }

    if (!name|| !email || !password || !confirmPassword){
        return NextResponse.json({message:"All Fields are required"}, {status:400})
    }

    

    if (confirmPassword !== password){
        return NextResponse.json({message:"Password do not match"},{status:400})
    }

    if(password.length < 6){
        return NextResponse.json({message:"Password must be at least 6 characters long"},{status:400})
    }

    try {
        await connectMongoDB();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400})
        }
     
    const hashedPassword = await bcrypt.hash(password,10);
    
    const newUser = new User({
        email,
        name,
        password:hashedPassword
    })

    await newUser.save();
    return NextResponse.json({message:"User Created"},{status:201})
    
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}