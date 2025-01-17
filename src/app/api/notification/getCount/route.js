import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Notification } from "../../../../../lib/models";

export const GET = async (request) => {
    try{
        connetToDb();
        const url= new URL(request.url);
        const id = url.searchParams.get("userId");
        
        if(id == null){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        const notificationsCount = await Notification.find({'user_id': id}).countDocuments();        
        return NextResponse.json(notificationsCount, {status: 200});
    }catch(error) {
        console.log('Error', error);
        return NextResponse.error(error, { status: 500});
    }
}

