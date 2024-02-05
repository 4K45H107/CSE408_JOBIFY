"use client";

import Card from "./card";
import JobDetails from "./jobDetails";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const JobsForYou = () => {
  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/user/explore/jobs/for_you?userId=${userId}`,
    fetcher
  );

  const [activeId, setActiveId] = useState(jobs?.at(0)._id);

  useEffect(() => {
    setActiveId(jobs?.at(0)._id);
  }, [jobs]);

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
