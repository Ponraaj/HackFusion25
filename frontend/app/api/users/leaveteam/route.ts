import { NextRequest, NextResponse } from "next/server";

export const POST = async(req : NextRequest) =>{
    try{

    } catch(e){
        console.log(e);
        return NextResponse.json({error:e},{status:200})
    }
}