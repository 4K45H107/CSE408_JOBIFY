import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../../lib/utils";
import { Applications } from "../../../../../../../lib/models";

export const POST = async (request) => {
    try{
        connetToDb();
        // const id = "65b538ecd0e12007bfa7fe73";
        //console.log("id",id);
        const data = await request.json();
        if(id == null){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        
        const application = await Applications.find({'user_id': data.user_id, "job_id": data.job_id});
        if(application.length > 0){
            return NextResponse.json({applied: true}, {status: 200});
        }else{
            return NextResponse.json({applied: false}, {status: 200});
        }
        
    }catch(error) {
        console.log('Error', error);
        return NextResponse.error(error, { status: 500});
    }
}