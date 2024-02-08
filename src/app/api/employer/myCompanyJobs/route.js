// you need to send employer id in the url to get their company jobs data


import { NextResponse } from "next/server";
import { Employers, Jobs } from "../../../../../lib/models";
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
        let employerIds;
        await Employers.find({"company.name":employer.company.name})
        .then((employers) => {
            employerIds = employers.map((employer) => employer._id);
            // Array containing only "name" values
          })
          .catch((err) => {
            console.log(err);        
        });
        console.log(employerIds);
        const jobs = await Jobs.find({provider:{$in:employerIds}});
        return NextResponse.json(jobs, { status: 200 });
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Same company name"},{status:500});   
    }

}