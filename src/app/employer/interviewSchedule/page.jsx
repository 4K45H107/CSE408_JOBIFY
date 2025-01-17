"use client";

import InterviewCard from "@/components/interview/InterviewCard";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const interviewSchedule = () => {
  const { role, userId } = useContext(AuthContext);
  const [activeId, setActiveId] = useState("");

  const { data: jobs, isLoading } = useSWR(
    `/api/employer/addJobs?userId=${userId}`,
    fetcher,
    { refreshInterval: 100 }
  );

  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  console.log(jobs);
  console.log(jobList);

  if (!isLoading) {
    return (
      <div>
        <div className="flex gap-x-4 mt-16">
          <div className="flex gap-y-6 w-full h-[600px] overflow-auto px-4 ">
            <div className="flex flex-col gap-y-6">
              {jobList?.map((job, i) => (
                <div className=" border border-gray-200 rounded">
                  <p className="text-xl semi-bold text-Black ">
                    {" "}
                    {i + 1}. {job.title}{" "}
                  </p>
                  <InterviewCard
                    key={job._id}
                    id={job._id}
                    setActiveId={setActiveId}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default interviewSchedule;
