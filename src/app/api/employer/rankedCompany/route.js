import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Companies } from "../../../../../lib/models";

export const GET = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        
         const company = await Companies.find({}).sort({employerNumberInJobify: -1}).limit(10).exec();
            console.log(company)
        
        

        // Find the user by ID

        // Check if the user exists
        return NextResponse.json(company, { status: 200 });

        
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}