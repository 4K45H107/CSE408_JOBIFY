import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import {Jobs} from "../../../../../lib/models";
import { Employers } from "../../../../../lib/models";

export const GET= async (request) => {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        connetToDb();
        console.log("inside employee add jobs route");
    
        const jobsData =  await Jobs.find({provider:id});
        
        //console.log(jobsData);
        if(jobsData.length===0 ){
            return NextResponse.json({message:"There is no jobs that you added"},{status:404});
        }else{
            
            return NextResponse.json(jobsData,{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}

