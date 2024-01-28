import { NextResponse } from "next/server";
 import { User } from "../../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";


export const POST= async (request) => {
    try {
        const data = await request.json();
        console.log(data);
        console.log("inside register route");
        connetToDb();
        const temp= await User.findOne({username:data.username});
        const temp1 = await User.findOne({email:data.email});
        if(temp || temp1){
            return NextResponse.json({message:"email or username error"},{status:401});    
            
        }else{
            const user = await User.create(data);
            return NextResponse.json(user,{status:200});    
            
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}

