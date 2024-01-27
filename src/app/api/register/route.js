import { User } from "../../../../lib/models"
import { NextResponse } from "next/server";
import { connetToDb } from "../../../../lib/utils"


export const POST= async (request) => {
    try {
        console.log("inside register route");
        connetToDb();
        const data={
            username:"tested",
            email:"tested@gmail.com",
            password:"1",
            fullname:"test4",
            profile:{
                location:"dhaka",
                skills:["java","python","react"],
                education: "bachelor",
            },
            contact:{
                phone:"01835286271",
                email: "test3@gmail.com",
            },
            privacySettings:{
                notification: true,
                publicProfile: true, 
            },
            job_preferences:{
                locations: "dhaka",
                salary_range:"20k-100k",
                job_type:["developer"],
            }
        }
        const user = await User.create(data);

        return NextResponse.json(user,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}

export const GET= async (request) => {
    try {
        connetToDb();
        
        const users = await User.find({});

        return NextResponse.json(users,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}