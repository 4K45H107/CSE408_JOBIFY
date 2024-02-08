import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../lib/utils";
import { Bookmarks, Jobs } from "../../../../../../lib/models";

export const POST = async (request) => {
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

        const savedJob =  data;
        const job = await Jobs.findById(savedJob.id);

        if(!job){
            return NextResponse.json({message: "no such jobs"}, {status: 404});
        }else{
            savedJob.user_id = id;
            savedJob.job_id = job._id;
            const bookmarkedJob = await Bookmarks.create(savedJob);
            return NextResponse.json(bookmarkedJob, {status: 200});
        }
        
    }catch(error) {
        console.log('Error', error);
        return NextResponse.error(error, { status: 500});
    }
}