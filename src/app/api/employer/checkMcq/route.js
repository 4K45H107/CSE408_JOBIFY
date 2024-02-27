// {
//     "job_id": "65c0a368f4f8de9c61919dc5",
//     "user_id": "65b538ecd0e12007bfa7fe73",
//     "answers": [
//         {
//             "question_id": "65c878fb5cecc21eae57b6d7",
//             "answer": "Watt"
//         },
//         {
//             "question_id": "65c878fb5cecc21eae57b6dc",
//             "answer": ""
//         }
//     ]
// }

import { NextResponse } from "next/server";
import { connetToDb } from "../../../../../lib/utils";
import { Questions, Marks } from "../../../../../lib/models";

export const POST = async (request) => {
  try {
    connetToDb();
    console.log("making question route");
    const data = await request.json();

    const question = await Questions.findOne({ job_id: data.job_id });
    let questions = question.questions;
    let i = 0;
    let result = 0;
    questions.map((q) => {
      let ans = data.answers[i].answer;
      if (ans === "") {
        data.answers[i].answer = "N/A";
      }
      q.options.map((o) => {
        if (o.correct && o.text === ans) {
          result++;
        }
      });
      i++;
    });

    console.log(result);

    data.result = (result * 100) / questions.length;

    const marks = await Marks.create({
      job_id: data.job_id,
      user_id: data.user_id,
      answers: data.answers,
      result: data.result,
    });
    console.log("result", result, "total", data.result);
    return NextResponse.json(marks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
