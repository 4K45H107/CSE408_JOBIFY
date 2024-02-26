"use client";

import { useState } from "react";
import JobsForYou from "@/components/jobs/jobsForYou";
import JobSearch from "@/components/jobs/jobSearch";
import RecentSearches from "@/components/activities/RecentSearches";
import Saved from "@/components/activities/Saved";
import Application from "@/components/activities/Application";

const activities = () => {
  const [type, setType] = useState("recent-searches"); // Recent searches, Saved, Applications

  return (
    <div className="w-full">
      <div className="flex w-full justify-center mt-14">
        <button
          className={` ${
            type === "recent-searches" && "bg-green-300 border-r border-b"
          } bg-gray-200 w-40 py-2 border-b border-r border-gray-500 `}
          onClick={() => setType("recent-searches")}
        >
          Recent Searches
        </button>

        <button
          className={` ${
            type === "saved" && "bg-green-300 border-r border-b"
          } bg-gray-200 w-32 py-2 border-b border-r border-gray-500 `}
          onClick={() => setType("saved")}
        >
          Saved
        </button>
        <button
          className={` ${
            type === "applications" && "bg-green-300 border-b"
          } bg-gray-200 w-32 py-2 border-b border-gray-500 `}
          onClick={() => setType("applications")}
        >
          Application
        </button>
      </div>

      {type === "recent-searches" && (
        <div className="h-[700px]">{<RecentSearches />}</div>
      )}

      {type === "saved" && <div className="">{<Saved />}</div>}

      {type === "applications" && (
        <div className="">
          <Application />
        </div>
      )}
    </div>
  );
};

export default activities;
