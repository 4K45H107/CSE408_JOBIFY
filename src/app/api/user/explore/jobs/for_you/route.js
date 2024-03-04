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
    const jobCategories ={
      software: ["Software Engineer", "SWE", "Software Engineer","developer", "developer", "developer", "developer","front end developer", "front end developer","Developer ","Software Developer"],
      chef: ["Chef", "chef"],
      drive: ["Driver", "Driver"],
      "ml engineer": ["Data Scientist","ML Engineer", "ML Engineer", "Crypto Miner"],
      "creative": ["Content Creator","Singer","Designer","Guitarist"],
      teaching: ["Teacher"],
      worker: ["Police", "Police", "Volunteer"],
      sports: ["Cricketer","Footballer"],
      
    }
    // console.log(titles);

    function findCategoryName(inputs) {
      const matchingCategories = new Set();

      inputs.forEach(input => {
        for (const category in jobCategories) {
          // console.log(input);
          const lowercaseCategory = category.toLowerCase();
          const lowercaseInput = input.toLowerCase();
          if (lowercaseCategory.includes(lowercaseInput)) {
            matchingCategories.add(category);
            console.log(matchingCategories);
          } else {
            const subcategories = jobCategories[category];
            subcategories.forEach(subcategory => {
              if (subcategory.toLowerCase().includes(lowercaseInput)) {
                matchingCategories.add(category);
              }
            });
          }
        }
      });
    
      return Array.from(matchingCategories);
    }
    
    function getSubcategories(categoryName) {
      return jobCategories[categoryName] || [];
    }

    const location = user.job_preferences.locations;
    const titles = user.job_preferences.job_type;
    const salary = user.job_preferences.salary_range;
    const birthdate= user.birthdate;
    //console.log(birthdate);
    // const subcategory = "Frontend Developer";
    console.log(titles);
    const categoryName = findCategoryName(titles);
    console.log(categoryName);
    let subcategories = getSubcategories(categoryName);
    console.log("subcategories of ${categoryName}: ",subcategories);

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
    // const age = calculateAge(birthdate);
    // console.log("Age:", age); // Output: 34 (as of today, 2024-02-27)
    

    // const locations = "India";
    // const city = "dhaka";
    let j = await Jobs.find({}).sort({ "salary.maximum": -1 });

    console.log("----------------", subcategories, "-----------------------------")

    subcategories= titles;

    const preferredJobs = j.filter(job => {
      for (let i = 0; i < subcategories.length; i++) {
        let b = job.title.toLowerCase().includes(subcategories[i].toLowerCase())
        if (b) {
          return true;
        } else {
          return false;
        }
      }
    })

    const arr = []
    for(let i = 0; i < preferredJobs.length; i++) {
      if (typeof preferredJobs[i] !== undefined) {
        arr.push(preferredJobs[i])
      }
    }

    console.log("-----------------------", arr, "-----------------------------")

      return NextResponse.json(arr, { status: 200 });
    
    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
