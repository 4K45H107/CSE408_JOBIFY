import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import {Employer} from "../../../../../lib/models";

export const POST= async (request) => {
    try {
        connetToDb();
        console.log("inside login route");
        const data = await request.json();
        console.log(data);
        
        const employer = await Employer.findOne({username:data.username});
        if(!employer){
            return NextResponse.json({message:"User not found"},{status:404});
        }else if(employer.password !== data.password){
            return NextResponse.json({message:"Incorrect password"},{status:401});
        }else{
            return NextResponse.json(user,{status:200});
            
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}