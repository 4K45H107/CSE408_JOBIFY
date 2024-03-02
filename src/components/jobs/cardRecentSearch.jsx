import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const CardRecentSearch = (props) => {
  console.log(props.id);
  const { role, userId } = useContext(AuthContext);
  console.log(userId);
  const [activeId, setActiveId] = useState("");

  const [bookmark, setBookmark] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (activeId !== "") {
      router.push(`/job/${props.id}`);
    }
  }, [activeId]);

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
      <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
        <button
          type="submit"
          onClick={handleRecent}
          className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default CardRecentSearch;
