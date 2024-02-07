import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { User } from "../../../../../lib/models";


export const GET = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        let user;
        if(id==null){ 
            console.log("User not found............");  
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }else{
            user = await User.findById(id);
        }
        

        // Find the user by ID

        // Check if the user exists
        if (!user) {
            console.log('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });

        
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}

export const PATCH = async (request) => {
    try {
        
        connetToDb();
        // Extract the ID from the request parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");
        const data = await request.json();
        
        let user;
        if(id==null){ 
            console.log("User not found............");  
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }else{
            user = await User.findById(id);
        }
        

        // Find the user by ID

        // Check if the user exists
        if (!user) {
            console.log('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const userN= await User.findByIdAndUpdate(id, data, {new: true});

        console.log("this is the user data \n",userN);

        return NextResponse.json(userN, { status: 200 });
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.error(error, { status: 500 });   
    }
}
