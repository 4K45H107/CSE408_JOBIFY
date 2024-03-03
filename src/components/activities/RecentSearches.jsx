"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import CardRecentSearch from "../jobs/cardRecentSearch";


const RecentSearches = () => {
  const [activeId, setActiveId] = useState("");
  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/user/activities/recent?userId=${userId}`,
    fetcher
  );

  

  useEffect(() => {}, [jobs]);

  console.log(jobs);

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="flex-1 h-[600px] overflow-auto px-4">
          <label className="text-red-500">Recent Searches</label>
          <div className="flex flex-col">
            {jobs?.map((job) => (
              <CardRecentSearch
                key={job?._id}
                company={job?.company}
                title={job?.title}
                salaryMin={job?.salary?.minimum}
                salaryMax={job?.salary?.maximum}
                id={job?._id}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default RecentSearches;
