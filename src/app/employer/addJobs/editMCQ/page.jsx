"use client";
import MCQ from "@/components/interview/MCQ";
import MCQQuestion from "@/components/interview/MCQQuestion";
import MCQQuestionEdit from "@/components/interview/MCQQuestionEdit";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import useSWR from "swr";

const editMCQ = () => {
  const jobId = useSearchParams().get("jobId");
  const { userId } = useContext(AuthContext);

  const [mcqArray, setMCQArray] = useState([]);
  const router = useRouter();

  const { data: questions, isLoading } = useSWR(
    `/api/question/getQuestion?jobId=${jobId}`,
    fetcher
  );

  console.log(questions);

  const handleDone = () => {
    router.push("/employer/home");
  };

  // setMCQArray([...mcqArray, newMCQ]);
  if (!isLoading) {
    const Q_id = questions._id;
    return (
      <div className="flex flex-col">
        {/* show previous mcqs */}
        <div>
          <>
            {questions?.questions?.map((mcq, i) => (
              <>
                {i + 1}.
                <MCQQuestionEdit
                  key={i}
                  Q_ID={Q_id}
                  q_id={mcq._id}
                  question={mcq.question}
                  options={mcq.options}
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

export default editMCQ;
