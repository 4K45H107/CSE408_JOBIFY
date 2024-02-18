import { NextResponse } from "next/server";
import { Employers, Jobs } from "../../../../../../lib/models";
import { connetToDb } from "../../../../../../lib/utils";

export const POST= async (request) => {
    try {
        connetToDb();
        console.log("inside add jobs route");
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        if(id === null){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const data = await request.json();
        //console.log(employerData);
        const jobD =  data;
        //console.log(jobData);
        
        const employer = await Employers.findById(id);
        if(!employer){
            return NextResponse.json({message:"employer not found"},{status:404});
        }else{
            jobD.provider=employer._id;
            jobD.company=employer.company.name;
            const job= await Jobs.create(jobD);
            return NextResponse.json(job,{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"error message"},{status:500});   
    }

}