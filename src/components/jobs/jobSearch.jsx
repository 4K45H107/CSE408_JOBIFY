import { useState } from "react";
import Card from "./card";

const JobSearch = () => {
  const [type, setType] = useState();
  const [salary, setSalary] = useState();
  const [location, setLocation] = useState();
  const [company, setCompany] = useState();

  return (
    <div className="flex gap-x-4 mt-16">
      <div className="w-3/4 h-[400px] overflow-auto px-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="border w-1/4 h-[400px] overflow-auto mr-5 ml-5 mt-2 mb-6">
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
            type="text"
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
            className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mt-5"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;