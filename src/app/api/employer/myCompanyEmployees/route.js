// 
//   you need to send employer id in the url to get their company data
//


import { NextResponse } from "next/server";
import { Employers } from "../../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";

export const GET= async (request) => {
    try {
        const url = new URL(request.url);
        connetToDb();
        console.log("inside Get Company route");
        const id = url.searchParams.get("userId");
        if(id === null){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const employer = await Employers.findById(id);
        //console.log(employer.company.name);
        if(employer.company){
            const company = await Employers.find({"company.name":employer.company.name});
            //console.log(company);
            return NextResponse.json(company.length, { status: 200 });
        }else{
            return NextResponse.json(error, { status: 404 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Same company name"},{status:500});   
    }

}