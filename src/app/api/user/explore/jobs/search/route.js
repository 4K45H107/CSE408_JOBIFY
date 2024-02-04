import { NextResponse } from "next/server";
import { Jobs, User } from "../../../../../../../lib/models";
import { connetToDb } from "../../../../../../../lib/utils";

// export const GET = async(request) => {
//     try{
//         const id = "65b538ecd0e12007bfa7fe73";
//         connetToDb();
//         console.log("insise the route");
//         // const data = await request.json();

//         const user = await User.findOne({_id : id});

//         if (!user) {
//             console.log('User not found');
//             return NextResponse.json({ message: 'User not found' }, { status: 404 });
//         }

//         console.log('User Data:', user);
//         return NextResponse.json(user, { status: 200 });
//     }catch(error) {
//         console.log(error);
//         return NextResponse.error(error,{status:500});
//     }
// }

export const GET = async (request) => {
  //   console.log(request);

  try {
    const url = new URL(request.url);

    console.log("here is the id..........................",url.searchParams.get("userId"));

    //console.log(request);
    connetToDb();

    // Extract the ID from the request parameters
    // const id = "65b538ecd0e12007bfa7fe73";
    const id = url.searchParams.get("userId");

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // console.log(user);
    // Log the user data to the console
    console.log("User Data:", user.job_preferences.locations);
    const location = user.job_preferences.locations;
    const title = user.job_preferences.job_type;

    // const locations = "India";
    // const city = "dhaka";
    const jobs = await Jobs.find(
      { "location.city": location } || { title: title } || {}
    )
      .sort({ "salary.maximum": -1 })
      .exec();
    if (jobs.length === 0) {
      console.log("no jobs");
      return NextResponse.json({ message: "no jobs for you" }, { status: 404 });
    } else {
      // console.log("jobs:", jobs);
      return NextResponse.json(jobs, { status: 200 });
    }
    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
