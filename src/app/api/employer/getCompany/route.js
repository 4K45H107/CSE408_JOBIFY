import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Companies, Employers } from "../../../../../lib/models";

export const GET = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        
        const employer =await Employers.findById(id);
        const name = employer.company.name;
        let company;
        if(name===null){ 
            console.log("No company name............");  
            return NextResponse.json({ message: "No company name was given" }, { status: 404 });
        }else{
            company = await Companies.findOne({name:name});
            console.log(company)
        }
        

        // Find the user by ID

        // Check if the user exists
        return NextResponse.json(company, { status: 200 });

        
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
        const employer =await Employers.findById(id);
        const name = employer.company.name;
        
        let company;
        if(name===null){ 
            console.log("No company name............");  
            return NextResponse.json({ message: "No company name was given" }, { status: 404 });
        }else{
            company = await Companies.findOneAndUpdate({name:name},data,{new:true});
            console.log(company)
        }
        

        // Find the user by ID

        // Check if the user exists
        return NextResponse.json(company, { status: 200 });

        
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}