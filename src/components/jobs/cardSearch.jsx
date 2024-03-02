import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const CardSearch = (props) => {
  const { role, userId } = useContext(AuthContext);
  const [activeId, setActiveId] = useState("");
  const router = useRouter();
  

  const handleRecent = async (e) => {
    e.preventDefault();

    console.log(props.id);
    const recentData = {
      id: props.id,
    };

    try {
      const res = await axios.post(
        `/api/user/activities/recent?userId=${userId}`,
        recentData
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setActiveId(props.id);
  };

  const handleSaved = async (e) => {
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

  useEffect(() => {
    if (activeId !== "") {
      router.push(`/job/${props.id}`);
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
            onClick={handleRecent}
            className="w-full text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
          >
            View
          </button>
        </div>
      </div>

      <div className="absolute top-2 right-4">
        <CiBookmark onClick={handleSaved} />
      </div>
    </div>
  );
};

export default CardSearch;
