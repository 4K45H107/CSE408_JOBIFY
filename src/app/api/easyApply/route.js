import { NextResponse } from "next/server";
import { Applications, Jobs, Notification, Tests, User } from "../../../../lib/models";
import { connetToDb } from "../../../../lib/utils";

export const POST = async (request) => {
    try{
        connetToDb();
        
        
        const data = await request.json();
        const status =  "ongoing";
        try {
            const user= await User.findById(data.user_id);
            if(user.cv === "N/A"){
                return NextResponse.json({message: "Please upload your CV before applying for a job"}, {status: 400});
            }
            const findApplication = await Applications.find({'user_id': data.user_id, 'job_id': data.id});
            if(findApplication.length > 0){
                return NextResponse.json({message: "Application already exists"}, {status: 400});
            }
            const application = await Applications.create({'user_id': data.user_id, 'job_id': data.id, 'status': status});
            const job = await Jobs.findById(data.job_id);
            if(job.skill_test){
                const message = {
                    "name":job.company,
                    "description": `You have a new skill test to take for the job titled \"${job.title}\" \n
                    for the company `,
                }
                const messageEmployer = {
                    "name":user.fullname,
                    "description": `This candidate has applied for the job titled \"${job.title}\" `,
                }

                const tests = await Tests.create({'user_id': data.user_id, 'job_id': data.job_id, 'given': false});
                const notification = await Notification.create({'user_id': data.user_id, 'message': message , 'job_id': data.job_id, 'type': "regular","read": false});
                const notEmployer = await Notification.create({'employer_id': job.provider, 'message': messageEmployer , 'job_id': data.job_id, 'type': "applied","read": false});
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

