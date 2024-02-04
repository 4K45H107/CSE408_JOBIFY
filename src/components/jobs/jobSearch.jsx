import { useContext, useEffect, useState } from "react";
import Card from "./card";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const JobSearch = () => {
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [activeId, setActiveId] = useState();

  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/user/explore/jobs/search?userId=${userId}`,
    fetcher
  );

  const [jobList, setJobList] = useState(jobs);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  const handleFilter = async (e) => {
    e.preventDefault();

    const filterData = {
      type,
      salary,
      location,
      company,
    };

    try {
      const res = await axios.post("/api/user/explore/jobs/filter", filterData);
      const data = res.data;
      console.log(data);
      setJobList(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="w-3/4 h-[400px] overflow-auto px-4">
          <label className="text-red-500">TRENDING</label>
          {jobList?.map((job) => (
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
        </div>
        <div className="border w-1/4 h-[400px] mr-5 ml-5 mt-2 mb-6">
          <div className="flex flex-col items-center mt-5">
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <input
              className="border rounded py-3 px-2 mb-3"
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleFilter}
              className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mt-5"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default JobSearch;
