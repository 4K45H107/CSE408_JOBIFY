import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { AuthContext } from "@/contexts/AuthContext";
import { CiGlass } from "react-icons/ci";
import CardSearch from "../jobs/cardSearch";
import CardSaved from "../jobs/cardSaved";
import Card from "../jobs/card";
import CardApplication from "../jobs/cardApplication";

const Application = () => {
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [activeId, setActiveId] = useState();

  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/user/activities/applications?userId=${userId}`,
    fetcher
  );

  console.log(jobs);

  const [jobList, setJobList] = useState(jobs);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="w-full h-[600px] overflow-auto px-4">
          <label className="text-red-500">Applications</label>
          {jobList?.map((job) => (
            <CardApplication
              key={job._id}
              company={job.company}
              title={job.title}
              salaryMin={job.salary.minimum}
              salaryMax={job.salary.maximum}
              id={job._id}
              skillTest={job.skill_test}
              setActiveId={setActiveId}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Application;
