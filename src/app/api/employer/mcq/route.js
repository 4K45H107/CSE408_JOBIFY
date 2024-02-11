// {
//     "title": "MCQ test for Software Developers",
//     "employer_id": "65b6ac3916e553752ecb571a",
//     "job_id": "65c0a368f4f8de9c61919dc5",
//     "questions": [{
//         "question": "What is the unit of power?",
//         "options": [
//             {
//                 "text": "Watt",
//                 "correct": true
//             },
//             {
//                 "text": "Joule",
//                 "correct": false
//             },
//             {
//                 "text": "Ruble",
//                 "correct": false
//             },
//             {
//                 "text": "Newton",
//                 "correct": false
//             },   
//         ]
//       },
//       {
//         "question": "What is the unit of Energy?",
//         "options": [
//             {
//                 "text": "Watt",
//                 "correct": false
//             },
//             {
//                 "text": "Joule",
//                 "correct": true
//             },
//             {
//                 "text": "Ruble",
//                 "correct": false
//             },
//             {
//                 "text": "Newton",
//                 "correct": false
//             },   
//         ]
//       },
//     ]
// }


// Path: api/employer/mcq
// you need to send employer id in the url and company data in the body
// above is the data that need to be sent, logo and cover is not mendatory

import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";

export const POST= async (request) => {
    try {
        connetToDb();
        console.log("making question route");
        const data = await request.json();
        if(id === null){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        const employer = await User.findById(id);

        return NextResponse.json({message:"employer company added"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Same company name"},{status:500});   
    }

}