import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import {Jobs} from "../../../../../lib/models";
import { Employers } from "../../../../../lib/models";

export const POST= async (request) => {
    try {
        connetToDb();
        console.log("inside employee add jobs route");
        const data = await request.json();
    
        const employer = await Employers.findOne({username:data.username});
        const jobsData =  await Jobs.find({provider:employer._id});
        
        console.log(jobsData);
        if(jobsData.length==0 ){
            return NextResponse.json({message:"There is no jobs that you added"},{status:404});
        }else{
            
            return NextResponse.json(jobsData,{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}