//This route is used to get all the company names from the database

import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Companies } from "../../../../../lib/models";

export const GET= async (request) => {
    try {
        connetToDb();
        console.log("inside get Companies route");
        let companyNames;
        await Companies.find({})
        .then((companies) => {
            companyNames = companies.map((company) => company.name);
            // Array containing only "name" values
          })
          .catch((err) => {
            console.log(err);        
        });
        console.log(companyNames);
        return NextResponse.json(companyNames, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Same company name"},{status:500});   
    }

}