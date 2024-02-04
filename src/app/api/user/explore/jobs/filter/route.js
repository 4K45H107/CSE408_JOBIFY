import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../../lib/utils";
import { User } from "../../../../../../../lib/models";
import { Jobs } from "../../../../../../../lib/models";
import company from "@/app/company/[companyID]/page";


export const POST = async (request) => {
    try {
        connetToDb();
        
        // Extract the ID from the request parameters
        console.log("inside login route");
        const data = await request.json();
        console.log(data);
        const location = data.location.toLowerCase();
        const type = data.type.toLowerCase();
        const salary = data.salary;
        const company = data.company.toLowerCase();

        // const locations = "India";
        // const city = "dhaka";
        if(location === "" && type === "" && salary === "" && company === ""){
            console.log("no filters");
            return NextResponse.json({message: "no filters"},{status:404});
        }        

        const jobs = await Jobs.find({'location.city': location} || {'title': type} || {
            $and: [
                {'salary.minimum': {$lte: salary}},
                {'salary.maximum': {$gte: salary}}
            ]
        }|| {'company': company})
        .sort({'salary.maximum': -1});
        if(jobs.length===0){
            console.log("no jobs");
            return NextResponse.json({message: "no jobs for you"},{status:404});
        }
        else{
            console.log("jobs:",jobs);
            //console.log("jobs company", jobs[0].company);
            return NextResponse.json(jobs,{status: 200});
        }
        // console.log(job_preferences);
        // Return a response if needed
        // return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}

