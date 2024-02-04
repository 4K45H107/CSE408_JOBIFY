"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const registerEmployer = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    try {
      const res = await axios.post("/api/register/employer", user);
      const data = res.data;
      console.log(data);
      //router.push("/employerLogin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <h3 className="flex text-xl pb-4 justify-center">Sign Up to JOBIFY</h3>
        <lebel>Enter your User Name:</lebel>
        <input
          className="border rounded py-3 px-2 mb-3"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <lebel>Enter your Email:</lebel>
        <input
          className="border rounded py-3 px-2 mb-3"
          type="test"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <lebel>Enter your Password:</lebel>
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
