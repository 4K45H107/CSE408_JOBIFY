import { NextResponse } from "next/server";
import { Notification } from "../../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";

export const PATCH = async (request) => {
  try {
    connetToDb();
    const data = await request.json();

    const notifications = await Notification.findByIdAndUpdate(
      data.id,
      { read: true },
      { new: true }
    );
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Same company name" }, { status: 500 });
  }
};
