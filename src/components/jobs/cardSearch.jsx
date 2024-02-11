import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CardSearch = (props) => {
  const [activeId, setActiveId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (activeId !== "") {
      router.push(`/job/${activeId}`);
    }
  }, [activeId]);

  console.log(props.id);
  return (
    <div className="relative px-2 py-3 border-b-2 cursor-pointer">
      <div className="flex items-center gap-x-2">
        <img src="/company_logo.jpg" className="h-6 w-6 rounded-full" />
        <Link href={`/company/${props.company}`} className="">
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
        <div className="flex justify-center my-4 w-auto bg-gray-800 rounded">
          <button
            type="submit"
            onClick={() => {
              setActiveId(props.id);
            }}
            className="w-full text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
          >
            View
          </button>
        </div>
      </div>

      <div className="absolute top-2 right-4">
        <CiBookmark />
      </div>
    </div>
  );
};

export default CardSearch;
