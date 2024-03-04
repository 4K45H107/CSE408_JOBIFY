import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Interviews } from "../../../../../lib/models";

export const GET = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("userId");
    console.log(id);
    // Find the user by ID
    const interviews = await Interviews.find({ user_id: id });
    return NextResponse.json(interviews, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
