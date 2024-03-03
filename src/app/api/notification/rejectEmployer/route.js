import { NextResponse } from "next/server";
import { Notification } from "../../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";

export const POST = async (request) => {
  try {
    connetToDb();
    const data = await request.json();

    const notifications = await Notification.create({
      employer_id: data.employer,
      message: { name: data.name, description: "You have been rejected by " },
      type: "regular",
    });
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Same company name" }, { status: 500 });
  }
};
