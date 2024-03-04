"use client";

import JobDetails from "../jobs/jobDetails";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import CardEmployer from "../jobs/cardEmployer";
import JobDetailsEmployer from "../jobs/jobDetailsEmployer";

const MyCompanyJobs = () => {
  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/employer/myCompanyJobs?userId=${userId}`,
    fetcher
  );

  const [activeId, setActiveId] = useState(jobs?.at(0)?._id);

  useEffect(() => {
    setActiveId(jobs?.at(0)?._id);
  }, [jobs]);

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="flex-1 h-[600px] overflow-auto px-4">
          <>
            {jobs?.map((job) => (
              <CardEmployer
                key={job._id}
                company={job.company}
                title={job.title}
                salaryMin={job.salary.minimum}
                salaryMax={job.salary.maximum}
                id={job._id}
                provider={job.provider}
                setActiveId={setActiveId}
              />
            ))}
          </>
        </div>
        <div className="flex-1 h-[600px] overflow-auto">
          <JobDetailsEmployer activeId={activeId} />
        </div>
      </div>
    );
  }
};

export default MyCompanyJobs;
