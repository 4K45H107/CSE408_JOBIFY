import { NextResponse } from "next/server";
import { Jobs } from "../../../../../../../lib/models";
import { connetToDb } from "../../../../../../../lib/utils";


export const POST = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters
    
    const data = await request.json();
    // Find the user by ID
    
    const location = data.location;
    const type = data.type;
    const salary = data.salary;
    const company = data.company;

    if (location === "" && type === "" && salary === "" && company === "") {
      console.log("no filters");
      return NextResponse.json({ message: "no filters" }, { status: 404 });
    }

    // location, type-title, salary-min,max, company

    // const jobs = await Jobs.find(
    //   location?{ "location.city": location }:type?{ "title": type }: salary?{
    //       $and: [
    //         { "salary.minimum": { $lte: salary } },
    //         { "salary.maximum": { $gte: salary } },
    //       ],
    //     }:company?{ company: company }:{}
    // ).sort({ "salary.maximum": -1 });

    let jobs = await Jobs.find({}).sort({ "salary.maximum": -1 });;
    
    if(location) {
      jobs = jobs.filter((job) => job.location.city === location)
    }

    if (salary) {
      jobs = jobs.filter(
        (job) =>
          job.salary.minimum <= salary && job.salary.maximum >= salary
      );
    }

    if (type) {
      // jobs = jobs.filter((job) => job.title === type);
      jobs = jobs.filter((job)=> { return job.title.toLowerCase().includes(type.toLowerCase())});
    }

    if (company) {
      jobs = jobs.filter((job) => job.company === company)
    }
   
    
    return NextResponse.json(jobs, { status: 200 });
    
    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
