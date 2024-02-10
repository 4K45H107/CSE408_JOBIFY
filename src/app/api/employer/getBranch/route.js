//This route is used to get all the company names from the database

import { NextResponse } from "next/server";
import { Companies } from "../../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";

export const GET= async (request) => {
    try {
        connetToDb();
        const url = new URL(request.url);
        const companyName = url.searchParams.get("company");
        
        console.log("inside get branches route");
        let companyBranches;
        const company =await Companies.find({name : companyName})
        companyBranches=company[0].branch;
        console.log(companyBranches);
        return NextResponse.json(companyBranches, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error,{status:500});   
    }

}