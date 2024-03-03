"use client";
import MCQ from "@/components/interview/MCQ";
import MCQExam from "@/components/interview/MCQExam";
import MCQQuestion from "@/components/interview/MCQQuestion";
import MCQQuestionEdit from "@/components/interview/MCQQuestionEdit";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const exam = () => {
  const [answers, setAnswers] = useState({});

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { userId } = useContext(AuthContext);

  console.log(jobId);

  const router = useRouter();

  const { data: questions, isLoading } = useSWR(
    `/api/question/getQuestion?jobId=${jobId}`,
    fetcher
  );

  console.log(questions);

  const handleDone = async () => {
    console.log(answers);
    if (questions === null) {
      router.push(`activities`);
      return;
    }
    const req = [];
    questions?.questions?.forEach((q) => {
      //   console.log(q);
      req.push({ question_id: q._id, answer: answers[q._id] || "" });
    });
    console.log(req);

    try {
      const res = await axios.post("/api/employer/checkMcq", {
        job_id: jobId,
        user_id: userId,
        answers: req,
      });
      console.log(res.data.result);
      router.push(`activities`);
    } catch (error) {
      console.log(error);
    }
    // router.push("/user/explore");
  };

  // setMCQArray([...mcqArray, newMCQ]);
  if (!isLoading) {
    const Q_id = questions?._id;

    return (
      <div className="flex flex-col">
        {/* show previous mcqs */}
        <div>
          <>
            {questions?.questions?.map((mcq, i) => (
              <>
                {i + 1}.
                <MCQExam
                  key={i}
                  Q_ID={Q_id}
                  q_id={mcq._id}
                  question={mcq.question}
                  options={mcq.options}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </>
            ))}
          </>
        </div>
        <div className="flex justify-center my-4 w-auto bg-gray-800 rounded">
          <button
            type="submit"
            onClick={handleDone}
            className="w-full text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
          >
            Done
          </button>
        </div>
        <div></div>
      </div>
    );
  }
};

export default exam;
