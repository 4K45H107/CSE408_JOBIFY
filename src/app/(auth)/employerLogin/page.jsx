"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const employerLoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    try {
      const res = await axios.post("/api/login/employer", user);
      const data = res.data;
      console.log(data);
      router.push("/employer/addJobs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <lebel>Enter your User Name:</lebel>
        <input
          className="border rounded py-3 px-2 mb-3"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <lebel>Enter your Password:</lebel>
        <input
          className="border rounded py-2 px-2 mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          type="submit"
          onClick={handleLogin}
          className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default employerLoginPage;
