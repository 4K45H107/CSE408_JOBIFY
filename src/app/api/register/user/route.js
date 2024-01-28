import { NextResponse } from "next/server";
 import { User } from "../../../../../lib/models";
import { connetToDb } from "../../../../../lib/utils";


export const POST= async (request) => {
    try {
        const data = await request.json();
        console.log(data);
        console.log("inside register route");
        connetToDb();
        
        const user = await User.create(data);
        return NextResponse.json(user,{status:200});
        //return NextResponse.json(user,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error,{status:500});   
    }

}

// export const GET= async (request) => {
//     // const id = "65b538ecd0e12007bfa7fe73"
//     try {
//         connetToDb();
        
//         const users = await User.find({});

//         return NextResponse.json(users,{status:200});
//     } catch (error) {
//         console.log(error);
//         return NextResponse.error(error,{status:500});   
//     }

// }

export const GET = async (request) => {
    try {
        connetToDb();
        
        // const users = await User.find({});

        // return NextResponse.json(users,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.error(error, { status: 500 });   
    }
}
