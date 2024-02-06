import { NextResponse } from "next/server";
import { Companies } from "../../../../../../lib/models";
import { connetToDb } from "../../../../../../lib/utils";

export const GET = async (request) =>{
    try{
        connetToDb();
        // const data = await request.json();
        const name = "Microsoft";
        console.log(name);

        const company = await Companies.findOne({name: name});
        console.log(company.name);
        if(!company){
            console.log("no company");
            return NextResponse.json({message: "no such company"}, {status: 401});
        }
        else{
            return NextResponse.json(company, {status: 200});
        }
    }catch(error){
        console.log("Error:", error);
        return NextResponse.error(error, {status: 500});

    }
}