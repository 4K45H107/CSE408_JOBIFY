import { NextResponse } from "next/server";
import { connetToDb } from "@/app/lib/utils";
import {Jobs} from "@/app/lib/models";
import { Employers } from "../../../../../lib/models";

export const POST= async (request) => {
    try {
        connetToDb();
        console.log("inside  route");
        console.log(userdata);
        const data = await request.json();
        const employerData= data.employer;
        const jobData =  data.job;
        
        const employer = await Employers.findOne({username:employerData.username});
        if(!employer){
            return NextResponse.json({message:"employer not found"},{status:404});
        }else{
            jobData.provider=employer._id;
            jobData.company=employer.company.name;
            const job= await Jobs.create(jobData);
            return NextResponse.json(job,{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}