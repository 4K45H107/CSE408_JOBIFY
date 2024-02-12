import { NextResponse } from "next/server";
import { connetToDb } from "../../../../lib/utils";
import { Companies } from "../../../../lib/models";

export const POST = async (request) => {
  try {
    connetToDb();

    // Extract the ID from the request parameters

    const data = await request.json();
    // Find the user by ID

    const company = data.company;

    if (company === "") {
      const companies = await Companies.find({});
      return NextResponse.json(companies, { status: 200 });
    }

    // location, type-title, salary-min,max, company

    // const jobs = await Jobs.find(
    //   location?{ "location.city": location }:type?{ "title": type }: salary?{
    //       $and: [
    //         { "salary.minimum": { $lte: salary } },
    //         { "salary.maximum": { $gte: salary } },
    //       ],
    //     }:company?{ company: company }:{}
    // ).sort({ "salary.maximum": -1 });

    let companies = await Companies.find({});

    if (company) {
      companies = companies.filter((c) => {
        return c.name.toLowerCase().includes(company.toLowerCase());
      });
    }

    return NextResponse.json(companies, { status: 200 });

    // console.log(job_preferences);
    // Return a response if needed
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error, { status: 500 });
  }
};
