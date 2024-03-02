import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../../../lib/utils";
import { User } from "../../../../../../../lib/models";
import { Jobs } from "../../../../../../../lib/models";

export const GET = async (request) => {
  try {
    connetToDb();
    // Extract the ID from the request parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("userId");
    console.log("here is the id..........................", id);
    let user;
    if (id == null) {
      console.log("User not found............");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      user = await User.findById(id);
    }

    // Find the user by ID
    // Check if the user exists
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    //console.log(user);
    // Log the user data to the console
    //console.log('User Data:', user.job_preferences.locations);
    const location = user.job_preferences.locations;
    const title = user.job_preferences.job_type;
    const salary = user.job_preferences.salary_range;
    const birthdate= user.birthdate;
    console.log(birthdate);


    function calculateAge(birthDate) {
      // Check if birthDate is a valid date object
      if (!(birthDate instanceof Date)) {
        throw new Error("Invalid birthDate argument. Please provide a valid Date object.");
      }
    
      const today = new Date();
      const birthYear = birthDate.getFullYear();
      const birthMonth = birthDate.getMonth();
      const birthDay = birthDate.getDate();
    
      let age = today.getFullYear() - birthYear;
    
      // Adjust age if birthday hasn't passed yet this year
      if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
        age--;
      }
    
      return age;
    }
    
    // Example usage:
     // Year, Month (0-indexed), Day
    const age = calculateAge(birthdate);
    console.log("Age:", age); // Output: 34 (as of today, 2024-02-27)
    

    // const locations = "India";
    // const city = "dhaka";
    const jobs = await Jobs.find({
      $and: [
        { "location.city": location },
        { title: { $in: title } },
        { "salary.minimum": { $lte: salary } },
        { "age.minimum": { $lte: age } },
        { "age.maximum": { $gte: age } },
      ],
    }).sort({ "salary.maximum": -1 });
    if (jobs.length === 0) {
      console.log("no jobs");
      return NextResponse.json({ message: "no jobs for you" }, { status: 404 });
    } else {
      //console.log("jobs:",jobs);
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
