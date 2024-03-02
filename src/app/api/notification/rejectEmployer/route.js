import { NextResponse } from "next/server";
import { Companies, Employers, Notification } from "../../../../../lib/models";

export const POST = async (request) => {
  try {
    connetToDb();
    const data=await request.json();
    const company=await Companies.findOne({name:data.name});
    const employer=await Employers.findById(data.employer);
    const notifications=await Notification.create({"employer_id":company.admin,"message":`Employer Named:${employer.fullname} and Designation : ${employer.designation} wants to join your company`,"type":"company","data":data.employer});
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Same company name" }, { status: 500 });
  }
};
