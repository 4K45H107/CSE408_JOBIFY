import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters

    const data = await request.json();
    // Find the user by ID

    const id = data.companyId;

    const companies = await Companies.findByIdAndUpdate(id, data, {"admin":data.admin}, { new: true });
    
    return NextResponse.json(companies, { status: 200 });

    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
