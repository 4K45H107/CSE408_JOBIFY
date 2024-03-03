import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import useSWR from "swr";

const JobDetailsEmployer = (props) => {
  if (!props.activeId) return <></>;

  const { role, userId } = useContext(AuthContext);

  const tempLink = "/api/user/explore/jobs/" + props.activeId;
  const { data: job, isLoading } = useSWR(tempLink, fetcher);
  const [activeId, setActiveId] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (activeId !== "") {
      router.push(`/job/${activeId}`);
    }
  }, [activeId]);

  const handleRecent = async (e) => {
    e.preventDefault();

    const recentData = {
      id: props.activeId,
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

    setActiveId(props.activeId);
  };

  console.log(props.id);

  const handleSaved = async () => {
    const savedData = {
      id: props.activeId,
    };
    console.log(props.activeId);

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

  console.log(job);

  // fetch data by props.activeId
  if (!isLoading) {
    return (
      <div className="border h-full rounded px-4 py-4 mr-4">
        <div className="flex items-center gap-x-2 justify-between">
          <div className="flex items-center gap-x-2">
            <img src="/company_logo.jpg" className="h-6 w-6 rounded-full" />
            <Link href={`/company/${job?.company}`} className="text-xl">
              {" "}
              {job?.company}
            </Link>
            <p className="text-xs">4.8</p>
          </div>
          {/* <div className="flex items-center gap-x-1">
            <CiBookmark className="cursor-pointer" onClick={handleSaved} />
            <div className="flex items-center text-lime-600">
              <AiFillThunderbolt />
              <p>Easy Apply</p>
            </div>
          </div> */}
        </div>
        <h3 className="text-3xl font-semibold">{job?.title}</h3>
        <p className="text-xs color-gray-500">Remote</p>
        <div className="mt-6">
          <p className="flex text-lg font-bold">
            <p className="text-red-600 pr-2 text-xl">Title: </p> {job?.title}
          </p>
          <p className="font-bold text-red-600 pr-2 text-xl">Location: </p>
          <p className="flex text-lg font-bold">
            <p className="text-green-800 pr-2 text-lg">Country: </p>{" "}
            {job?.location?.country}
          </p>
          <p className="flex text-lg font-bold">
            <p className="text-green-800 pr-2 text-lg">City: </p>{" "}
            {job?.location?.city}
          </p>
          <p className="flex text-lg font-bold">
            <p className="text-red-600 pr-2 text-xl">Company: </p>{" "}
            {job?.company}
          </p>
          <p className="font-bold text-red-600 pr-2 text-xl">Salary: </p>
          <p className="flex text-lg font-bold">
            <p className="text-green-800 pr-2 text-lg">Minimum: </p>{" "}
            {job?.salary?.minimum}
          </p>
          <p className="flex text-lg font-bold">
            <p className="text-green-800 pr-2 text-lg">Maximum: </p>{" "}
            {job?.salary?.maximum}
          </p>
          <p className="font-bold text-red-600 pr-2 text-xl">Age: </p>
          <p className="flex text-lg font-bold">
            <p className="text-green-800 pr-2 text-lg">Minimum: </p>{" "}
            {job?.age?.minimum}
          </p>
          <p className="flex text-lg font-bold">
            <p className="text-green-800 pr-2 text-lg">Maximum: </p>{" "}
            {job?.age?.maximum}
          </p>
        </div>
        <div>
          <h2 className="text-3xl text-slate-500 font-bold mt-6">
            Job Description -{" "}
          </h2>
          {job?.description}
        </div>
        <div className="flex justify-center w-auto my-4 rounded">
          <button
            type="submit"
            onClick={handleRecent}
            className="w-auto bg-gray-800 rounded text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
          >
            View
          </button>
        </div>
        {/* <div className="flex items-center">
        <MdOutlineKeyboardArrowDown />
        <Link href={"/"}>Show More</Link>
      </div> */}
      </div>
    );
  }
};

export default JobDetailsEmployer;
