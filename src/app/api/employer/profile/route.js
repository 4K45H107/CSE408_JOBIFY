import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Employers } from "../../../../../lib/models";




export const GET = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        let employer;
        if(id==null){ 
            console.log("User not found............");  
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }else{
            employer = await Employers.findById(id);
        }
        

        // Find the user by ID

        // Check if the user exists
        if (!employer) {
            console.log('Employer not found');
            return NextResponse.json({error:"there is an error in getting Employer"}, { status: 404 });
        }
        return NextResponse.json(employer, { status: 200 });

        
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}

export const PATCH = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        const data = await request.json();
        
        const userN= await Employers.findByIdAndUpdate(id, data, {new: true});

        
        return NextResponse.json(userN, { status: 200 });
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}
