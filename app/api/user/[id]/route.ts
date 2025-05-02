import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params:{
        id:string;
    }    
}

export async function GET(request:NextRequest,context:Params){
    const {id} = context.params;
    connectMongoDB();
    const topic = await Topic.find({userEmail:id});
    return NextResponse.json({topic},{status:200})

}