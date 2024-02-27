// {
//     "questions": [{
//         "question": "What is the unit o power?",
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
//             }
//         ]
//       },
//       {
//         "question": "What is the unit o Energy?",
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
//             }
//         ]
//       }
//     ]
// }

// Path: api/question/getQuestion?jobId=65c0a368f4f8de9c61919dc5
// you need to send employer id in the url and company data in the body
// above is the data that need to be sent, logo and cover is not mendatory

import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Questions } from "../../../../../lib/models";

export const GET = async (request) => {
  try {
    connetToDb();
    const url = new URL(request.url);
    const id = url.searchParams.get("jobId");

    console.log(id);
    console.log("get question route");
    //const data = await request.json();
    const question = await Questions.findOne({ job_id: id });

    console.log(question);

    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
