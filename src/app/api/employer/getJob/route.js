import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Jobs } from "../../../../../lib/models";

export const GET = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("jobId");
        console.log(id)
        let job;
        if(id==null){ 
            console.log("Job Id not found............");  
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }else{
            job = await Jobs.findById(id);
        }
        

        // Find the user by ID

        // Check if the user exists
        return NextResponse.json(job, { status: 200 });

        
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}