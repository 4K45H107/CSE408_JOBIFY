"use client";

import { useState } from "react";
import JobsForYou from "@/components/jobs/jobsForYou";

const Home = () => {
  const [type, setType] = useState("my-offerings"); // my-company-jobs, my-offerings

  

  return (
    <div className="w-full">
      <div className="flex w-full justify-center mt-4">
        <button
          className="bg-gray-200 w-60 py-2 border-r border-b border-gray-500"
          onClick={() => setType("my-company-jobs")}
        >
          My Company Jobs
        </button>
        <button
          className="bg-gray-200 w-60 py-2 border-b border-gray-500"
          onClick={() => setType("my-offerings")}
        >
          My Offerings
        </button>
      </div>

      {type === "jobs-for-you" && (
        <div className="h-[700px]">
          <JobsForYou />
        </div>
      )}

      {type === "my-company-jobs" && <div className="">My company jobs</div>}

      {type === "my-offerings" && <div className=""></div>}
    </div>
  );
};

export default Home;
