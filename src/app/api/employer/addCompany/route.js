// {
//     "name": "Street Chicken",
//     "email": "info@acmecorporation.com",
//     "numOfEmployees": 50,
//     "designation": "Technology",
//     "phone": "+1 234 567 8900",
//     "branch": "BUET",
//     "description": "We provide innovative software solutions for businesses.",
//     "logo": "https://example.com/logo.png",
//     "cover": "https://example.com/cover.jpg",
// }

// you need to send employer id in the url and company data in the body
// above is the data that need to be sent, logo and cover is not mendatory

import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Companies, Employers } from "../../../../../lib/models";

export const POST= async (request) => {
    try {
        const url = new URL(request.url);
        connetToDb();
        console.log("inside add Company route");
        const id = url.searchParams.get("userId");
        const companyData = await request.json();
        if(id === null){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        let company;
        try {
            company = await Companies.create(companyData);
            company.admin= id;
            await company.save();
        }catch (error){
            console.log(error);
            return NextResponse.json({message:"Company already exists"},{status:500});
        }
        const employer = await Employers.findByIdAndUpdate(id, { company:{name:company.name,branch:company.branch} }, { new: true });
        
        return NextResponse.json({message:"employer company added"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Same company name"},{status:500});   
    }

}