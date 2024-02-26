import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Applications, Jobs, User } from "../../../../../lib/models";

export const GET = async (request) => {
    try{
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        connetToDb();
        const jobs=await Jobs.find({'employer_id':id});
        if(jobs.length==0){
            return NextResponse.json({message: "No jobs found"}, {status: 404});
        }
        let applications=[];
        for(let i=0;i<jobs.length;i++){
            let job_id=jobs[i]._id;
            let applied=await Applications.find({'job_id':job_id});
            applications.push(applied);
        }
        let users=[];
        for(let i=0;i<applications.length;i++){
            
            let user_id=applications[i].user_id;
            let user=await User.findById(user_id);
            users.push(user);
        
        }
        return NextResponse.json(users, {status: 200});
        
    }catch(error) {
        console.log('Error', error);
        return NextResponse.error(error, { status: 500});
    }
}

