import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../lib/utils";
import { Bookmarks, Jobs } from "../../../../../../lib/models";

export const POST = async (request) => {
  try {
    connetToDb();
    const url = new URL(request.url);
    const id = url.searchParams.get("userId");
    // const id = "65b538ecd0e12007bfa7fe73";
    console.log("id", id);

    if (id == null) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const data = await request.json();

    console.log(data.id);
    const updatedData = await Bookmarks.create({
      user_id: id,
      job_id: data.id,
    });
    console.log(updatedData);
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.error(error, { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    connetToDb();
    const url = new URL(request.url);
    const id = url.searchParams.get("userId");
    const jobId = url.searchParams.get("jobId");
    // const id = "65b538ecd0e12007bfa7fe73";
    console.log("id", id);

    if (id === null) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    const updatedData = await Bookmarks.deleteOne({
      user_id: id,
      job_id: jobId,
    });
    console.log(updatedData);
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.error(error, { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    connetToDb();
    const url = new URL(request.url);
    const id = url.searchParams.get("userId");

    if (id == null) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    let jobIds;
    const bookmarks=await Bookmarks.find({user_id:id});
    jobIds=bookmarks.map((bookmark)=>bookmark.job_id);
    console.log(jobIds);

    const job = await Jobs.find({ _id: { $in: jobIds } });
    console.log(job);

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.error(error, { status: 500 });
  }
};
