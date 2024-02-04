import { fetcher } from "@/utils/conn";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import useSWR from "swr";

const JobDetails = (props) => {
  const tempLink = "/api/user/explore/jobs/" + props.activeId;
  const { data: job, isLoading } = useSWR(tempLink, fetcher);

  // fetch data by props.activeId
  if (!isLoading) {
    return (
      <div className="border h-full rounded px-4 py-4 mr-4">
        <div className="flex items-center gap-x-2 justify-between">
          <div className="flex items-center gap-x-2">
            <div className="h-6 w-6 rounded-full bg-green-400"></div>
            <p className="">{job?.company}</p>
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
        <h3 className="text-lg font-semibold">{job?.title}</h3>
        <p className="text-xs color-gray-500">Remote</p>
        <div className="mt-6">
          <h2 className="text-xl font-bold">{job?.title}</h2>
          {job?.description}
        </div>
        <div>
          <h2 className="text-xl font-bold mt-6">{job?.title}</h2>
          {job?.description}
        </div>
        {/* <div className="flex items-center">
        <MdOutlineKeyboardArrowDown />
        <Link href={"/"}>Show More</Link>
      </div> */}
      </div>
    );
  }
};

export default JobDetails;
