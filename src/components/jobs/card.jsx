import React from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";

const Card = (props) => {

  console.log(props.id);
  return (
    <div
      className="relative px-2 py-3 border-b-2 cursor-pointer"
      onClick={() => {
        props.setActiveId(props.id);
      }}
    >
      <div className="flex items-center gap-x-2">
        <div className="h-6 w-6 rounded-full bg-green-400"></div>
        <p className="">{props.company}</p>
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

      <div className="absolute top-2 right-4">
        <CiBookmark />
      </div>
    </div>
  );
};

export default Card;
