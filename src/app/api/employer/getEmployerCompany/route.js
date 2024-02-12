//
//   you need to send employer id in the url to get their company data
//

import { NextResponse } from "next/server";
import { Companies, Employers } from "../../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";

export const GET = async (request) => {
  try {
    const url = new URL(request.url);
    connetToDb();
    console.log("inside Get Company route");
    const id = url.searchParams.get("company");
    if (id === null) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const company = await Companies.findOne({ name: id });
    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Same company name" }, { status: 500 });
  }
};
