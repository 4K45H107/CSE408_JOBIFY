import React, { useContext, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const Card = (props) => {
  console.log(props.id);
  const { role, userId } = useContext(AuthContext);
  console.log(userId);

  const [bookmark, setBookmark] = useState(false);

  const handleSaved = async (e) => {
    setBookmark((prev) => !prev);
    e.preventDefault();

    const savedData = {
      id: props.id,
    };
    console.log(props.id);

    try {
      const res = await axios.post(
        `/api/user/activities/saved?userId=${userId}`,
        savedData
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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

      <div className="absolute top-2 right-4">
        <CiBookmark className={`${bookmark && ""}`} onClick={handleSaved} />
      </div>
    </div>
  );
};

export default Card;
