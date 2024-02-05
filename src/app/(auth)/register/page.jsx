"use client";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profile, setProfile] = useState({
    location: "",
    skills: "",
    education: "",
  });
  const [job_preferences, setjob_preferences] = useState({
    locations: "",
    salary_range: "",
    job_type: "",
  });

  const { signup, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !phoneNumber ||
      !profile.location ||
      !profile.skills ||
      !profile.education ||
      !job_preferences.locations ||
      !job_preferences.salary_range ||
      !job_preferences.job_type
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const user = {
      fullName,
      username,
      email,
      password,
      phoneNumber,
      profile,
      job_preferences,
    };

    const role = "user";
    await signup(role, user);
    toast.success("Successfully created new account");
    // try {
    //   const res = await axios.post("/api/login/user", user);
    //   const data = res.data;
    //   //console.log(data);

    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/user/explore");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <h3 className="flex text-xl pb-6 justify-center">Sign Up to JOBIFY</h3>
        <div className="flex gap-6">
          <div className="flex flex-col">
            <label>Enter your User Name:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label>Enter your Email:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="test"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Enter your Password:</label>
            <input
              className="border rounded py-3 px-2 mb-5"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label>Enter your Full Name:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></input>
            {/* ... Other existing fields ... */}
            <label>Enter your Phone Number:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label>Profile Information:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Location"
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            ></input>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Skills"
              value={profile.skills}
              onChange={(e) =>
                setProfile({ ...profile, skills: e.target.value })
              }
            ></input>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Education"
              value={profile.education}
              onChange={(e) =>
                setProfile({ ...profile, education: e.target.value })
              }
            ></input>
            <label>Job Preference:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Location"
              value={job_preferences.locations}
              onChange={(e) =>
                setjob_preferences({
                  ...job_preferences,
                  locations: e.target.value,
                })
              }
            ></input>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Salary Range"
              value={job_preferences.salary_range}
              onChange={(e) =>
                setjob_preferences({
                  ...job_preferences,
                  salary_range: e.target.value,
                })
              }
            ></input>
            <input
              className="border rounded py-3 px-2 mb-5"
              type="text"
              placeholder="Job Type"
              value={job_preferences.job_type}
              onChange={(e) =>
                setjob_preferences({
                  ...job_preferences,
                  job_type: e.target.value,
                })
              }
            ></input>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleRegister}
            className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
          >
            Sign Up
          </button>
          <Link
            href="/registerEmployer"
            className="bg-gray-700 rounded text-white  pl-4 py-1 active:bg-slate-600 w-32 mx-auto"
          >
            <p className="flex justify-center">SignUp Employer</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default register;
