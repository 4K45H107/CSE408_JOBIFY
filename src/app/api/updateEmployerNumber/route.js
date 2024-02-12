import { NextResponse } from "next/server";
import { connetToDb } from "../../../../lib/utils";
import { Companies, Employers } from "../../../../lib/models";

export const PATCH = async (request) => {
  try {
    connetToDb();

    const data = await request.json();
    let dummy;
    const companies = await Companies.find({});
    companies.map(async (company) => {
      const employers = await Employers.find({ "company.name": company.name });
      dummy = await Companies.findOneAndUpdate(
        company._id,
        { employerNumberInJobify: employers.length },
        { new: true }
      );
    });

    console.log(dummy);

    return NextResponse.json(dummy, { status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.error(error, { status: 500 });
  }
};
