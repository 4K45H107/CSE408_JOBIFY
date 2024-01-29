"use client";

import { useState } from "react";
import JobsForYou from "@/components/jobs/jobsForYou";

const Home = () => {
  const [type, setType] = useState("my-company-jobs"); // jobs-for-you, jobs-search, companies

  return (
    <div className="w-full">
      <div className="flex w-full justify-center mt-4">
        <button
          className="bg-gray-200 w-32 py-2 border-r border-b border-gray-500"
          onClick={() => setType("my-company-jobs")}
        >
          Jobs
        </button>
        <button
          className="bg-gray-200 w-32 py-2 border-b border-gray-500"
          onClick={() => setType("companies")}
        >
          Companies
        </button>
      </div>

      <div className="flex w-full justify-center mt-4">
        <button
          className="bg-indigo-200 rounded px-3 py-2 text-xs"
          onClick={() => setType("jobs-for-you")}
        >
          For You
        </button>
        <button
          className="px-3 py-2 text-xs"
          onClick={() => setType("jobs-search")}
        >
          Search
        </button>
      </div>

      {type === "jobs-for-you" && (
        <div className="h-[700px]">
          <JobsForYou />
        </div>
      )}

      {type === "jobs-search" && <div className="">Jobs srch</div>}

      {type === "companies" && <div className="">co</div>}
    </div>
  );
};

export default Home;