import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Companies } from "../../../../../lib/models";

export const POST = async (request) =>{
    try{
        connetToDb();

        const data = await request.json();
        const companyName = data.name;
        const temp = await Companies.findOne({name: companyName});
        if(temp){
            return NextResponse.json({message: "company already exist"},{status: 401});
        }
        else{
            const companies = await Companies.create(data);
            return NextResponse.json(companies, {status: 200});
        }
    }catch(error){
        console.log("Error", error);
        return NextResponse.error(error, {status: 500});
    }
}