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
      const jobs = await Jobs.find().sort({ "salary.maximum": -1 }).exec();
      if (jobs.length === 0) {
        console.log("no jobs");
        return NextResponse.json(
          { message: "no jobs for you" },
          { status: 404 }
        );
      } else {
        // console.log("jobs:", jobs);
        return NextResponse.json(jobs, { status: 200 });
      }
    }


    let jobs = await Jobs.find({}).sort({ "salary.maximum": -1 });

    if (location) {
      jobs = jobs.filter((job) => {
        return job.location.city.toLowerCase().includes(location.toLowerCase());
      });
    }

    if (salary) {
      jobs = jobs.filter(
        (job) => job.salary.minimum <= salary && job.salary.maximum >= salary
      );
    }

    if (type) {
      // jobs = jobs.filter((job) => job.title === type);
      jobs = jobs.filter((job) => {
        return job.title.toLowerCase().includes(type.toLowerCase());
      });
    }

    if (company) {
      jobs = jobs.filter((job) => {
        return job.company.toLowerCase().includes(company.toLowerCase());
      });
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
