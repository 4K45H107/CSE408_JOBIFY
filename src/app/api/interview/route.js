import { NextResponse } from "next/server";
import { Interviews } from "../../../../lib/models";
import { connetToDb } from "../../../../lib/utils";

export const DELETE = async (request) => {
    try {
      connetToDb();
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
    //   const data =await request.json();
    //   console.log(data);
      
      if (id === null) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      
      const updatedData = await Interviews.deleteOne({
        _id: id,
      });
      console.log(updatedData);
      return NextResponse.json(updatedData, { status: 200 });
    } catch (error) {
      console.log("Error", error);
      return NextResponse.error(error, { status: 500 });
    }
  };