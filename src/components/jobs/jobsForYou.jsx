"use client";

import Card from "./card";
import JobDetails from "./jobDetails";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";

const JobsForYou = () => {
  const { data: jobs, isLoading } = useSWR(
    "/api/user/explore/jobs/for_you",
    fetcher
  );

  console.log(jobs);

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="flex-1 h-[500px] overflow-auto px-4">
          <>
            {jobs?.map((job) => (
              <Card
                company={job.company}
                title={job.title}
                salaryMin={job.salary.minimum}
                salaryMax={job.salary.maximum}
              />
            ))}
          </>
        </div>
        <div className="flex-1 h-[500px] overflow-auto">
          <JobDetails />
        </div>
      </div>
    );
  }
};

export default JobsForYou;
