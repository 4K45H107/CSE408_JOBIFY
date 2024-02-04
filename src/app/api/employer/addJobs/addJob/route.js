import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../lib/utils";
import {Jobs} from "../../../../../../lib/models";
import { Employers } from "../../../../../../lib/models";

export const POST= async (request) => {
    try {
        connetToDb();
        console.log("inside  route");
        const data = await request.json();
        const employerData= data.employer;
        //console.log(employerData);
        const jobData =  data;
        //console.log(jobData);
        
    caseInsensitivity = function(obj) {

            Object.keys(obj).forEach(k => {

            if(typeof obj[k] == 'string') {

                obj[k] = obj[k].toLowerCase();
            }
        else if(typeof obj[k] == 'object') {

            caseInsensitivity(obj[k]);
        }
        else {

        }
    });
    return obj;
}
        const jobD=caseInsensitivity(jobData);        
        console.log(jobD);
        const employer = await Employers.findOne({username:employerData.username});
        if(!employer){
            return NextResponse.json({message:"employer not found"},{status:404});
        }else{
            jobD.provider=employer._id;
            jobD.company=employer.company.name.toLowerCase();
            const job= await Jobs.create(jobData);
            return NextResponse.json(job,{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}