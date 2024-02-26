"use client";

import { useState } from "react";
import JobsForYou from "@/components/jobs/jobsForYou";
import JobSearch from "@/components/jobs/jobSearch";
import CompanySearch from "@/components/company/companySearch";

const explore = () => {
  const [type, setType] = useState("jobs-for-you"); // jobs-for-you, jobs-search, companies

  return (
    <div className="w-full">
      <div className="flex w-full justify-center mt-4">
        <button
          className={` ${
            (type === "jobs-for-you" || type === "jobs-search") &&
            "bg-green-300 border-r border-b"
          } bg-gray-200 w-32 py-2 border-b border-r border-gray-500 `}
          onClick={() => setType("jobs-for-you")}
        >
          Jobs
        </button>

        <button
          className={` ${
            type === "companies" && "bg-green-300 border-b"
          } bg-gray-200 w-32 py-2 border-b border-gray-500 `}
          onClick={() => setType("companies")}
        >
          Companies
        </button>
      </div>

      {(type === "jobs-for-you" || type === "jobs-search") && (
        <div className="flex w-full justify-center mt-4">
          <button
            className={` ${
              type === "jobs-for-you" && "bg-slate-400 rounded"
            } rounded px-3 py-2 text-xs `}
            onClick={() => setType("jobs-for-you")}
          >
            For You
          </button>

          <button
            className={` ${
              type === "jobs-search" && "bg-slate-400 rounded"
            } rounded px-3 py-2 text-xs `}
            onClick={() => setType("jobs-search")}
          >
            Search
          </button>
        </div>
      )}

      {type === "jobs-for-you" && (
        <div className="h-[700px]">{<JobsForYou />}</div>
      )}

      {type === "jobs-search" && <div className="">{<JobSearch />}</div>}

      {type === "companies" && (
        <div className="">
          <div className="h-full flex justify-center mt-16">
            <CompanySearch />
          </div>
        </div>
      )}
    </div>
  );
};

export default explore;
