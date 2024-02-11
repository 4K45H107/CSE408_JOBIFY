import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../lib/utils";
import { Employers } from "../../../../../../lib/models";


export const PATCH = async (request) => {
  try {
    
    connetToDb();
    // Extract the ID from the request parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("userId");
    const data = await request.json();

    let employer;
    if (id == null) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      employer = await Employers.findById(id);
    }

    // Find the user by ID

    // Check if the user exists
    if (!employer) {
      console.log("User not found");
      return NextResponse.json({ message: "Employer not found" }, { status: 404 });
    }
    const userN = await Employers.findByIdAndUpdate(
      id,
      { "photo": data.photo },
      { new: true }
    );

    //console.log("this is new profile picture data \n", userN);

    return NextResponse.json(userN, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
