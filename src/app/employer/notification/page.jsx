"use client";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { AuthContext } from "@/contexts/AuthContext";

const Notification = () => {
  const [activeId, setActiveId] = useState();

  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/notification/getNotification/employer?employerId=${userId}`,
    fetcher
  );
  console.log(jobs);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="w-3/4 h-[400px] overflow-auto px-4">
          <label className="text-red-500">Notifications</label>
          {jobList?.map((job) => (
            <div>abc</div>
            // <
            //   key={job._id}
            //   company={job.company}
            //   title={job.title}
            //   salaryMin={job.salary.minimum}
            //   salaryMax={job.salary.maximum}
            //   id={job._id}
            //   setActiveId={setActiveId}
            // />
          ))}
        </div>
      </div>
    );
  }
};

export default Notification;
