import { NextResponse } from "next/server";
import { Applications, Jobs } from "../../../../../../lib/models";
import { connetToDb } from "../../../../../../lib/utils";

export const PATCH = async (request) => {
    try{
        connetToDb();
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        // const id = "65b538ecd0e12007bfa7fe73";
        console.log("id",id);

        if(id == null){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        const data = await request.json();
        const status =  "ongoing";
        const application = await Applications.create({'user_id': id, job_id: data.id, 'status': status});
        return NextResponse.json(application, {status: 200});
        // const data = await request.json();
             

        //     const updatedData =await Bookmarks.create({"user_id":id,
        // "job_id":data.id});
        //     return NextResponse.json(updatedData,{status:200});
       
        
    }catch(error) {
        console.log('Error', error);
        return NextResponse.error(error, { status: 500});
    }
}


export const GET = async (request) =>{
    try{
        connetToDb();
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");

        if(id == null){
            return NextResponse.json({message: "user not found"}, {status: 404});
        }
        let jobIds;
        await Applications.find({"user_id": id})
        .then((applications) => {
            jobIds = applications.map((application) => application.job_id);
            // Array containing only "name" values
          }

        );

        console.log(jobIds);
        
        const job = await Jobs.find({_id:{$in:jobIds}});
        console.log(job);

        return NextResponse.json(job, {status: 200});
    }catch(error){
        console.log('Error', error);
        return NextResponse.error(error, {status: 500});
    }
}