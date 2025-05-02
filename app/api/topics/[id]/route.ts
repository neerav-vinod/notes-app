import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params:{
        id:string;
    }    
}

export async function PUT(request:NextRequest,context:Params){
    const {id} = context.params;
    const body = await request.json();
    const {newTitle: title,newDescription: description} = body;
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title,description});
    return NextResponse.json({message:"Topic Updated"},{status:200})
}

export async function GET(request:NextRequest,context:Params){
    const {id} = context.params;
    connectMongoDB();
    const topic = await Topic.findOne({_id:id});
    return NextResponse.json({topic},{status:200})

}

