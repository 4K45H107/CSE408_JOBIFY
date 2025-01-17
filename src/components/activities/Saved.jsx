"use client";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { AuthContext } from "@/contexts/AuthContext";
import { CiGlass } from "react-icons/ci";
import CardSearch from "../jobs/cardSearch";
import CardSaved from "../jobs/cardSaved";

const Saved = () => {
  const [activeId, setActiveId] = useState("");

  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/user/activities/saved?userId=${userId}`,
    fetcher,
    { refreshInterval: 100 }
  );

  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="w-full h-[600px] overflow-auto px-4 ">
          <label className="text-red-500">Bookmarks</label>
          {jobList?.map((job) => (
            <CardSaved
              key={job._id}
              company={job.company}
              title={job.title}
              salaryMin={job.salary.minimum}
              salaryMax={job.salary.maximum}
              id={job._id}
              setActiveId={setActiveId}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Saved;
