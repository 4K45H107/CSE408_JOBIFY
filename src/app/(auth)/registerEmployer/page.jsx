"use client";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const registerEmployer = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();
  const { signup, isLoggedIn } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    const role = "employer";
    await signup(role, user);
    toast.success("Successfully created new account");
    // try {
    //   const res = await axios.post("/api/register/employer", user);
    //   const data = res.data;
    //   console.log(data);
    //   //router.push("/login");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/employer/home");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <h3 className="flex text-xl pb-4 justify-center">Sign Up to JOBIFY</h3>
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
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleRegister}
            className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default registerEmployer;
