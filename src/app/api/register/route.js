import { User } from "../../../../lib/models"
import { NextResponse } from "next/server";
import { connetToDb } from "../../../../lib/utils"


export const POST= async (request) => {
    try {
        connetToDb();
        const data={
            username:"test",
            name:"test",
            email:"test@gmai.com",
            password:"1",
        }
        const user = await User.create(data);

        return NextResponse.json({user},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}