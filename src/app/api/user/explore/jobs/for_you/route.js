import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../../lib/utils";
import { User } from "../../../../../../../lib/models";
import { Jobs } from "../../../../../../../lib/models";


export const GET = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        console.log("here is the id..........................",id);
        let user;
        if(id==null){ 
            console.log("User not found............");  
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }else{
            user = await User.findById(id);
        }

        // Find the user by ID
        // Check if the user exists
        if (!user) {
            console.log('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        //console.log(user);
        // Log the user data to the console
        //console.log('User Data:', user.job_preferences.locations);
        const location = user.job_preferences.locations;
        const title = user.job_preferences.job_type;
        const salary = user.job_preferences.salary_range;
        
        console.log(user.job_preferences);

        // const locations = "India";
        // const city = "dhaka";
        const jobs = await Jobs.find( {$or:[{'location.city': location} , {title: { $in: title }}, {'salary.minimum': {$lte: salary}}]})
        .sort({'salary.maximum' : -1});
        if(jobs.length===0){
            console.log("no jobs");
            return NextResponse.json({message: "no jobs for you"},{status:404});
        }
        else{
            //console.log("jobs:",jobs);
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
