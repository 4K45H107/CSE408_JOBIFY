import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../lib/utils";
import {Jobs} from "../../../../../../lib/models";
import { Employers } from "../../../../../../lib/models";

export const PATCH= async (request, {params}) => {
    try {
        connetToDb();
        console.log("inside employee add jobs route");
        console.log(params.job_id);
        const data = await request.json();
        console.log(data);
        const updatedJobData = await Jobs.findOneAndUpdate({_id:params.job_id},data,{new:true}); 
        if(!updatedJobData){
            return NextResponse.json({message:"job not found"},{status:404});
        }
            else{
            
            return NextResponse.json(updatedJobData,{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}