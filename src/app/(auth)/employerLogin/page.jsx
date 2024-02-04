"use client";

import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

const employerLoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { login } = useContext(AuthContext);

  //const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    const role = "employer";

    await login(role, user);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <label>Enter your User Name:</label>
        <input
          className="border rounded py-3 px-2 mb-3"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Enter your Password:</label>
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
