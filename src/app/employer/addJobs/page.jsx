"use client";
import { useState } from "react";

const addJobs = () => {
  // Destructure jobData into individual state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salarymin, setSalaryMin] = useState("");
  const [salarymax, setSalaryMax] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [skillTest, setSkillTest] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !title ||
      !description ||
      !salarymin ||
      !salarymax ||
      !country ||
      !city
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const jobData = {
      title,
      description,
      salarymin,
      salarymax,
      location: { country, city },
      skillTest,
    };
    console.log("Job data submitted:", jobData);
    // Replace the console.log with actual backend integration.
  };

  //   return (
  //       <form className="flex flex-col border px-6 py-10">
  //         <label>Enter your User Name:</label>
  //         <input
  //           className="border rounded py-3 px-2 mb-3"
  //           type="text"
  //           placeholder="User Name"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //         ></input>
  //         <label>Enter your Password:</label>
  //         <input
  //           className="border rounded py-2 px-2 mb-3"
  //           type="password"
  //           placeholder="Password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         ></input>
  //         <button
  //           type="submit"
  //           onClick={handleLogin}
  //           className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
  //         >
  //           Login
  //         </button>
  //       </form>
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <h1 className="flex text-3xl font-bold mb-6 justify-center">
        Create a New Job
      </h1>
      <form className="flex flex-col border px-6 py-10" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          className="border rounded py-3 px-2 mb-3"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Description:</label>
        <textarea
          className="border rounded py-3 px-2 mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <p className="pb-4">Salary Information:</p>
        <div>
          <label className="px-4">Max:</label>
          <input
            className="border rounded py-3 px-2 mb-3"
            type="number"
            value={salarymin}
            onChange={(e) => setSalaryMin(e.target.value)}
            required
          />
          <label className="px-4">Min:</label>
          <input
            className="border rounded py-3 px-2 mb-3"
            type="number"
            value={salarymax}
            onChange={(e) => setSalaryMax(e.target.value)}
            required
          />
        </div>
        <br />
        <p className="pb-4">Location Information:</p>
        <div>
          <label className="m-auto px-4 ">Country:</label>
          <input
            className="border rounded py-3 px-2 mb-3"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <label className="m-auto px-4">City:</label>
          <input
            className="border rounded py-3 px-2 mb-3"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label className="pr-3">Skill Test:</label>
          <input
            className="border rounded py-3 px-2 mb-3"
            type="checkbox"
            checked={skillTest}
            onChange={(e) => setSkillTest(e.target.checked)}
          />
        </div>
        <br />
        <div className="mb-4">
          <button
            type="submit"
            className="flex justify-center bg-gray-700 rounded text-white px-4 py-4 active:bg-slate-600 w-32 mx-auto"
          >
            CreateJob
          </button>
        </div>
      </form>
    </div>
  );
};

export default addJobs;
