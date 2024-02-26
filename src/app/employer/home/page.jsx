"use client";

import { useState } from "react";
import MyOfferings from "@/components/employer/myOfferings";
import MyCompanyJobs from "@/components/employer/myCompanyJobs";

const Home = () => {
  const [type, setType] = useState("my-company-jobs"); // my-company-jobs, my-offerings

  return (
    <div className="w-full">
      <div className="flex w-full justify-center mt-4">
        <button
          className={` ${
            type === "my-company-jobs" && "bg-green-300 border-r border-b"
          } bg-gray-200 w-40 py-2 border-b border-r border-gray-500 `}
          onClick={() => setType("my-company-jobs")}
        >
          My Company Jobs
        </button>
        <button
          className={` ${
            type === "my-offerings" && "bg-green-300 border-b"
          } bg-gray-200 w-40 py-2 border-b border-gray-500 `}
          onClick={() => setType("my-offerings")}
        >
          My Offerings
        </button>
      </div>

      {type === "my-offerings" && (
        <div className="h-[700px]">
          <MyOfferings />
        </div>
      )}

      {type === "my-company-jobs" && (
        <div className="">
          <MyCompanyJobs />
        </div>
      )}
    </div>
  );
};

export default Home;
