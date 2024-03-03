import React, { useContext, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const CardApplication = (props) => {
  console.log(props.id);

  if (!props.id) {
    return <></>;
  }

  const { role, userId } = useContext(AuthContext);
  console.log(userId); 

  const router = useRouter();

  const handleExam = () => {
    router.push(`exam?jobId=${props.id}`);
  };

  return (
    <div
      className="relative px-2 py-3 border-b-2 cursor-pointer"
      onClick={() => {
        props.setActiveId(props.id);
      }}
    >
      <div className="flex items-center gap-x-2">
        <img src="/company_logo.jpg" className="h-6 w-6 rounded-full" />
        <Link href={`/company/${props.company}`} className="">
          {" "}
          {props.company}
        </Link>
        <p className="text-xs">4.8</p>
      </div>
      <h3 className="text-lg font-semibold">{props.title}</h3>
      <p className="text-xs color-gray-500">Remote</p>
      <p className="">
        {props.salaryMin}-{props.salaryMax}
      </p>

      {props.skillTest && (
        <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
          <button
            type="submit"
            onClick={handleExam}
            className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
          >
            Give Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default CardApplication;
