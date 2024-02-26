import { NextResponse } from "next/server";
import { connetToDb } from "../../../../lib/utils";
import { Applications , Jobs , Notification} from "../../../../lib/models";

export const POST = async (request) => {
    try{
        connetToDb();
        
        if(id == null){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        const data = await request.json();
        const status =  "ongoing";
        try {
            const application = await Applications.create({'user_id': data.user_id, 'job_id': data.id, 'status': status});
            const job = await Jobs.findById(data.job_id);
            if(job.skill_test){
                const notification = await Notification.create({'user_id': data.user_id, 'message': `You have a new skill test to take ${job.title}` , 'job_id': data.job_id});
            }
            return NextResponse.json(application, {status: 200});
            
        } catch (error) {
            return NextResponse.json({message: "Application already exists"}, {status: 400});   
        }
        
    }catch(error) {
        console.log('Error', error);
        return NextResponse.error(error, { status: 500});
    }
}

