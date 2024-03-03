import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Applications, User } from "../../../../../lib/models";


export const GET = async (request) =>{
    try{
        connetToDb();
        const url = new URL(request.url);
        const id = url.searchParams.get("jobId");

        if(id == null){
            return NextResponse.json({message: "user not found"}, {status: 404});
        }
        let userIds;
        await Applications.find({"job_id": id})
        .then((applications) => {
            userIds = applications.map((application) => application.user_id);
            // Array containing only "name" values
          }

        );

        
        const users = await User.find({_id:{$in:userIds}});
        console.log(users);

        return NextResponse.json(users, {status: 200});
    }catch(error){
        console.log('Error', error);
        return NextResponse.error(error, {status: 500});
    }
}