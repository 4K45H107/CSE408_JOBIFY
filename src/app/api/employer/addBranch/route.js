//add Branch has some error



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
        const company = await Companies.findOneAndUpdate({name:companyData.name},{$addToSet:{branch:companyData.branch}},{new:true});
        const employer = await Employers.findByIdAndUpdate(id, { company:{name:company.name,branch:company.branch} }, { new: true });
        
        return NextResponse.json(employer, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Same company name"},{status:500});   
    }

}