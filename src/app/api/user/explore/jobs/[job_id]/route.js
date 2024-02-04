import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../../lib/utils";
import {Jobs} from "../../../../../../../lib/models";
import { CiLight } from "react-icons/ci";

export const GET= async (request, {params}) => {
    try {
        connetToDb();
        console.log("inside user jobs route");
        console.log(params.job_id);
        const jobData = await Jobs.findById({_id:params.job_id}); 
        //console.log(jobData);
        if(!jobData){
            return NextResponse.json({message:"job not found"},{status:404});
        }else{
            
            return NextResponse.json(jobData,{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}