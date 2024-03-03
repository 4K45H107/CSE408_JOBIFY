import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Employers, Notification } from "../../../../../lib/models";
import company from "@/app/company/[companyID]/page";

export const PATCH = async (request) => {
  try {
    const url = new URL(request.url);
    connetToDb();
    console.log("inside add Company route");
    const id = url.searchParams.get("userId");
    const companyData = await request.json();
    if (id === null) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const employer = await Employers.findByIdAndUpdate(
      id,
      { "company.name": companyData.name },
      { new: true }
    );
     
    const message = {
      name: companyData.name,
      designation: employer.designation,
      description: "You have been approved to join ",
    };
    console.log(employer);
    return NextResponse.json(employer, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Same company name" }, { status: 500 });
  }
};
