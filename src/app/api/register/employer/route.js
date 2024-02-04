import { NextResponse } from "next/server";
//  import { User } from "../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";
import { Employers } from "../../../../../lib/models";


export const POST= async (request) => {
    try {
        const data = await request.json();
        console.log(data);
        console.log("inside register route");
        connetToDb();
        const temp = await Employers.findOne({username:data.username});
        const temp2 = await Employers.findOne({email:data.email});
        if(temp || temp2){
            return NextResponse.json({mesage:"email or username error"},{satus:401});
        }
        else {
            const employer = await Employers.create(data);
            return NextResponse.json(employer,{status:200});
        }
        
        //return NextResponse.json(user,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}