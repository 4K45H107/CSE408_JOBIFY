"use client";
import { fetcher } from "@/utils/conn";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import useSWR from "swr";

const job = (props) => {
  const router = useRouter();
  // const [jobID, setJobID] = useState(null);

  const { jobID } = useParams();
  console.log(jobID);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { jobID } = router.query;
  //     setJobID(jobID);
  //   }
  // }, [router.isReady, router.query]);
  // console.log(jobID);

  const { data: job, isLoading } = useSWR(
    `/api/employer/getJob?jobId=${jobID}`,
    fetcher
  );

  console.log(job);

  // fetch data by props.activeId
  if (!isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full  px-4 py-4 mr-4">
        <div className="border rounded flex flex-col items-center justify-center h-2/3 w-1/2 pt-10 border-grey-400">
          <div className="flex items-center gap-x-2 justify-between">
            <div className="flex items-center gap-x-2">
              <img src="/company_logo.jpg" className="h-6 w-6 rounded-full" />
              <p className="text-xl">{job?.company}</p>
              <p className="text-xs">4.8</p>
            </div>
            <div className="flex items-center gap-x-1">
              <CiBookmark />
              <div className="flex items-center text-lime-600">
                <AiFillThunderbolt />
                <p>Easy Apply</p>
              </div>
            </div>
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
          </div>
          <div>
            <h2 className="text-3xl text-slate-500 font-bold mt-6">
              Job Description -{" "}
            </h2>
            {job?.description}
          </div>
          {/* <div className="flex items-center">
        <MdOutlineKeyboardArrowDown />
        <Link href={"/"}>Show More</Link>
      </div> */}
        </div>
      </div>
    );
  }
};

export default job;
