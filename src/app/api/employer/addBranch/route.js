
import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Companies, Employers } from "../../../../../lib/models";

export const POST= async (request) => {
    try {
        const url = new URL(request.url);
        connetToDb();
        console.log("inside add Branch route");
        const id = url.searchParams.get("userId");
        const companyData = await request.json();
        if(id === null){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        let company;
        try {
            company = await Companies.create(companyData);
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