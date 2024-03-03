import { NextResponse } from "next/server";
import { connetToDb } from "../../../../lib/utils";
import { Tests } from "../../../../lib/models";

export const POST = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters

    const data = await request.json();
    
    const tests = await Tests.find({"user_id": data.user_id, "job_id": data.job_id});

    
        return NextResponse.json({given:tests.given}, { status: 200 });
    

    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};

export const PATCH = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters

    const data = await request.json();
    
    const test = await Tests.findOne(data);
    test.given = true;
    await test.save();

    return NextResponse.json({test}, { status: 200 });
    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
