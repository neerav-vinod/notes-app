import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {title,description,Useremail} = await request.json();
    await connectMongoDB();
    await Topic.create({title,description,userEmail:Useremail})
    return NextResponse.json({message:"Topic created"},{status:201});
}

export async function GET(request:NextRequest){
    
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics})
}



export async function DELETE(request : NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message:"Topic Deleted"},{status:200});
}

