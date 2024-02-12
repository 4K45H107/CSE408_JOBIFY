import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../lib/utils";
import { Jobs, Recent } from "../../../../../../lib/models";

export const POST = async(request) => {
    try{
        connetToDb();
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");

        if(id === null){
            console.log("here");
            return NextResponse.json({message: "user not found"}, {status: 404});
        }
        const data = await request.json();
        const recent = await Recent.findOne({"user_id": id});
        if(recent == null){
            console.log("here i come");
            await Recent.create({"user_id": id});
        }
        const existanceCheck = await Recent.findOne({"user_id": id});
        if(existanceCheck == null){
            console.log("problem");
        }
        if(existanceCheck && existanceCheck.job_ids.includes(data.id)){
            console.log("item already exist");
            return NextResponse.json(existanceCheck,{status: 200});
        }
        const recentSearches = await Recent.findOneAndUpdate(
            {"user_id": id},
            {$push: 
                {
                    job_ids:
                    {
                        $each: [data.id],
                        $position:0,
                        $slice:10
                    }
                }
            },
            {new: true}
        );

        return NextResponse.json(recentSearches, {status: 200});

    }catch(error){
        console.log("Error", error);
        return NextResponse.error(error, {status: 500});
    }
}

export const GET = async(request) => {
    try{
        connetToDb();
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        // console.log()
        if(id == null){
            return NextResponse.json({message: "user not found"},{status: 404});
        }
        const recentSearches = await Recent.findOne({"user_id": id});
        

        const jobs =await Jobs.find({_id: {$in: recentSearches.job_ids}});

        return NextResponse.json(jobs,{status: 200});
    }catch(error){
        console.log("Error", error);
        return NextResponse.error(error, {status: 500});
    }
}