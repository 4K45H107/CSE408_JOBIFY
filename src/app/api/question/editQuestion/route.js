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

// Path: api/question/addQuestion?questionId=65c878fb5cecc21eae57b6d6
// you need to send employer id in the url and company data in the body
// above is the data that need to be sent, logo and cover is not mendatory

import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Questions } from "../../../../../lib/models";

export const PATCH = async (request) => {
  try {
    connetToDb();
    const url = new URL(request.url);
    const id = url.searchParams.get("questionId");
    console.log("edit question route");
    const data = await request.json();
    const question = await Questions.findByIdAndUpdate(id,{ $addToSet: { questions: data.questions } } , { new: true });
    

    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
