"use client";

import Card from "./card";
import JobDetails from "./jobDetails";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { useState } from "react";

const JobsForYou = () => {
  const { data: jobs, isLoading } = useSWR(
    "/api/user/explore/jobs/for_you",
    fetcher
  );
  

  const [activeId, setActiveId] = useState(jobs?.at(0)._id)

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="flex-1 h-[500px] overflow-auto px-4">
          <>
            {jobs?.map((job) => (
              <Card
                key={job._id}
                company={job.company}
                title={job.title}
                salaryMin={job.salary.minimum}
                salaryMax={job.salary.maximum}
                id={job._id}
                setActiveId={setActiveId}
              />
            ))}
          </>
        </div>
        <div className="flex-1 h-[500px] overflow-auto">
          <JobDetails activeId={activeId} />
        </div>
      </div>
    );
  }
};

export default JobsForYou;
