import { User } from "../../../../lib/models"
import { NextResponse } from "next/server";
import { connetToDb } from "../../../../lib/utils"


export const POST= async (request) => {
    try {
        console.log("inside register route");
        connetToDb();
        const data={
            username:"test3",
            name:"test3",
            email:"test3@gmail.com",
            password:"1",
        }
        const user = await User.create(data);

        return NextResponse.json(user,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}

export const GET= async (request) => {
    try {
        connetToDb();
        
        const users = await User.find({});

        return NextResponse.json(users,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}