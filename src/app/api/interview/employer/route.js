// {
//   job_id: "",
//   user_id: "",
//   employer_id: "",
// }

import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Interviews, Jobs, Notification } from "../../../../../lib/models";

export const POST = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters

    const data = await request.json();
    console.log(data);
    // Find the user by ID
    const interview = await Interviews.create(data);
    const job = await Jobs.findById(data.job_id);
    const message = {
      name: "New Interview",
      designation: "Interview",
      description: `New Interview has been scheduled for the job title ${job.title} at ${job.company}`,
    };
    await Notification.create({
      user_id: data.user_id,
      message: message,
      type: "interview",
      read: false,
    });
    await Notification.create({
      employer_id: data.employer_id,
      message: message,
      type: "interview",
      read: false,
    });
    return NextResponse.json(interview, { status: 200 });

    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("employerId");
    // Find the user by ID
    let variables = [[]];
    const jobs=await Jobs.find({provider:id})
    jobs.map(async(job)=>{
      const interview = await Interviews.find({job_id:job._id});
      variables.push(interview);
    })
    console.log(variables);
    return NextResponse.json(variables,{status:200});
  } catch(error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
