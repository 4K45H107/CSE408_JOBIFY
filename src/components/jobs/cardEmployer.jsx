import React from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";
import job from "@/app/job/[jobID]/page";
import { useRouter } from "next/navigation";

const CardEmployer = (props) => {
  console.log(props.id);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/employer/addJobs/editMCQ?jobId=${props.id}`);
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
      <div className="flex justify-between ">
        <div className="flex items-center">
          <span className="text-lime-700 w-4">
            <AiFillThunderbolt />
          </span>
          <span className="text-sm text-lime-700">Easy Appily</span>
        </div>
        <p className="text-xs">3d</p>
      </div>
      <div className="bg-black rounded w-20">
        {props.skill_test && (
          <button
            type="submit"
            onClick={handleClick}
            className="text-white w-20 px-4 py-3 active:bg-slate-600 mx-auto"
          >
            View
          </button>
        )}
      </div>

      <div className="absolute top-2 right-4">
        <CiBookmark />
      </div>
    </div>
  );
};

export default CardEmployer;
