"use client";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useReducer, useState } from "react";
import toast from "react-hot-toast";

const addJobs = () => {
  const countries = [
    "Bangladesh",
    "India",
    "Pakistan",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
  ];

  const cities = {
    Bangladesh: [
      "Dhaka",
      "Chittagong",
      "Khulna",
      "Rajshahi",
      "Sylhet",
      "Barisal",
      "Rangpur",
      "Comilla",
      "Narayanganj",
      "Gazipur",
    ],
    India: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Kolkata",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Surat",
      "Jaipur",
    ],
    Pakistan: [
      "Karachi",
      "Lahore",
      "Faisalabad",
      "Rawalpindi",
      "Multan",
      "Gujranwala",
      "Islamabad",
      "Quetta",
      "Peshawar",
      "Sialkot",
    ],
    "United States": [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
    ],
    "United Kingdom": [
      "London",
      "Birmingham",
      "Manchester",
      "Glasgow",
      "Liverpool",
      "Leeds",
      "Sheffield",
      "Edinburgh",
      "Bristol",
      "Cardiff",
    ],
    Canada: [
      "Toronto",
      "Montreal",
      "Vancouver",
      "Calgary",
      "Edmonton",
      "Ottawa",
      "Winnipeg",
      "Quebec City",
      "Hamilton",
      "London",
    ],
    Australia: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Gold Coast",
      "Newcastle",
      "Canberra",
      "Sunshine Coast",
      "Wollongong",
    ],
    Germany: [
      "Berlin",
      "Hamburg",
      "Munich",
      "Cologne",
      "Frankfurt",
      "Stuttgart",
      "Düsseldorf",
      "Dortmund",
      "Essen",
      "Leipzig",
    ],
    France: [
      "Paris",
      "Marseille",
      "Lyon",
      "Toulouse",
      "Nice",
      "Nantes",
      "Strasbourg",
      "Montpellier",
      "Bordeaux",
      "Lille",
    ],
    Japan: [
      "Tokyo",
      "Yokohama",
      "Osaka",
      "Nagoya",
      "Sapporo",
      "Fukuoka",
      "Kobe",
      "Kyoto",
      "Kawasaki",
      "Saitama",
    ],
  };

  // Destructure jobData into individual state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salarymin, setSalaryMin] = useState("");
  const [salarymax, setSalaryMax] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [skillTest, setSkillTest] = useState(false);

  const { role, userId } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
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
      salary: {
        minimum: salarymin,
        maximum: salarymax,
      },
      location: { country, city },
      skillTest,
    };
    console.log("Job data submitted:", jobData);
    // Replace the console.log with actual backend integration.
    try {
      const res = await axios.post(
        `/api/employer/addJobs/addJob?userId=${userId}`,
        jobData
      );
      const data = res.data;
      console.log(data);
      toast.success("Job Created Successfully");
      if (!skillTest) {
        router.push("/employer/home");
      } else {
        router.push(`/employer/addJobs/addMCQ?jobId=${data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            value={salarymax}
            onChange={(e) => setSalaryMax(e.target.value)}
            required
          />
          <label className="px-4">Min:</label>
          <input
            className="border rounded py-3 px-2 mb-3"
            type="number"
            value={salarymin}
            onChange={(e) => setSalaryMin(e.target.value)}
            required
          />
        </div>
        <br />
        <p className="pb-4">Location Information:</p>
        <div>
          <label className="m-auto px-4 ">Country:</label>
          <select
            className="border rounded py-3 px-2 mb-3"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            className="border rounded py-3 px-2 mb-3"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">City</option>
            {cities[country] &&
              cities[country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
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
