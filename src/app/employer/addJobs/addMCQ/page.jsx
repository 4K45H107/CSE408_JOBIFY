"use client";
import MCQ from "@/components/interview/MCQ";
import MCQQuestion from "@/components/interview/MCQQuestion";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";

const addMCQ = () => {
  const jobId = useSearchParams().get("jobId");
  const { userId } = useContext(AuthContext);

  const [add, setAdd] = useState(true);

  const [mcqArray, setMCQArray] = useState([]);
  const router = useRouter();

  const handleClick = () => {
    setAdd(false);
  };

  const handleSubmit = async () => {
    const recentData = {
      title: "MCQ Exam",
      job_id: jobId,
      employer_id: userId,
      questions: mcqArray,
    };

    try {
      const res = await axios.post(
        `/api/employer/mcq?userId=${userId}`,
        recentData
      );
      const data = res.data;
      router.push("/employer/home");
      toast.success("Job Created MCQ Exam");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(mcqArray);

  // setMCQArray([...mcqArray, newMCQ]);

  return (
    <div className="flex flex-col">
      {/* show previous mcqs */}
      <div>
        <>
          {mcqArray?.map((mcq, i) => (
            <>
              {i + 1}.
              <MCQQuestion
                key={i}
                question={mcq.question}
                options={mcq.options}
              />
            </>
          ))}
        </>
      </div>
      <div>
        {add === true && (
          <div>
            <div className="flex justify-center my-4 w-auto rounded">
              <button
                type="submit"
                onClick={handleClick}
                className="w-1/2  bg-gray-800 text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
              >
                Add MCQ
              </button>
            </div>
            <div className="flex justify-center my-4 w-auto rounded">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-1/2  bg-gray-800 text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
              >
                Done
              </button>
            </div>
          </div>
        )}
        {add === false && (
          <MCQ setAdd={setAdd} mcqArray={mcqArray} setMCQArray={setMCQArray} />
        )}
      </div>
    </div>
  );
};

export default addMCQ;
