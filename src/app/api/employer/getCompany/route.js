// you need to send employer id in the url to get their company data
import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Companies, Employers } from "../../../../../lib/models";

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
        if(employer.company){
            const company = await Companies.findOne({name:employer.company.name});
            return NextResponse.json(company, { status: 200 });
        }else{
            return NextResponse.json(error, { status: 404 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Same company name"},{status:500});   
    }

}