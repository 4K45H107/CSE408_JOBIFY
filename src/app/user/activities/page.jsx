"use client";

import { useState } from "react";
import JobsForYou from "@/components/jobs/jobsForYou";
import JobSearch from "@/components/jobs/jobSearch";

const activities = () => {
  const [type, setType] = useState("recent-searches"); // Recent searches, Saved, Activities

  return (
    <div className="w-full">
      <div className="flex w-full justify-center mt-14">
        <button
          className="bg-gray-200 w-40 py-2 border-r border-b border-gray-500"
          onClick={() => setType("recent-searches")}
        >
          Recent Searches
        </button>

        <button
          className="bg-gray-200 w-32 py-2 border-r border-b border-gray-500"
          onClick={() => setType("saved")}
        >
          Saved
        </button>
        <button
          className="bg-gray-200 w-32 py-2 border-b border-gray-500"
          onClick={() => setType("applications")}
        >
          Application
        </button>
      </div>

      {type === "recent searches" && (
        <div className="h-[700px]">{<JobsForYou />}</div>
      )}

      {type === "jobs-search" && <div className="">{<JobSearch />}</div>}

      {type === "companies" && <div className="">co</div>}
    </div>
  );
};

export default activities;
