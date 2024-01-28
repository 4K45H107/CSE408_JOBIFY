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

// export const GET = async (request) => {
//     try {
//         connetToDb();
        
//         // const users = await User.find({});

//         // return NextResponse.json(users,{status:200});
//     } catch (error) {
//         console.log(error);
//         return NextResponse.error(error, { status: 500 });   
//     }
// }
export const GET = async (request) => {
    try {
        connetToDb();
        
        // Extract the ID from the request parameters
        const id = "65b538ecd0e12007bfa7fe73";

        // Find the user by ID
        const user = await User.findById(id);

        // Check if the user exists
        if (!user) {
            console.log('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Log the user data to the console
        console.log('User Data:', user);

        // Return a response if needed
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}
