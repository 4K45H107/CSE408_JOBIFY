import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import {User} from "../../../../../lib/models";

export const POST= async (request) => {
    try {
        connetToDb();
        console.log("inside login route");
        const data = await request.json();
        console.log(data);
        
        const user = await User.findOne({username:data.username});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404});
        }else if(user.password !== data.password){
            return NextResponse.json({message:"Incorrect password"},{status:401});
        }else{
            return NextResponse.json(user,{status:200});
            
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}