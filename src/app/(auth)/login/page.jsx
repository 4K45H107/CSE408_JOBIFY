"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState("user");

  const { login, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    let role = "user";
    if (type === "user") {
      role = "user";
    } else {
      role = "employer";
    }
    await login(role, user);
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
      if (type === "user") {
        router.push("/user/explore");
      } else {
        router.push("/employer/home");
      }
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <h3 className="flex text-xl pb-4 justify-center">
          User Login to JOBIFY
        </h3>
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
        <label>Select User Type:</label>
        <select
          className="border rounded h-10 py-2 px-2 mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="user">Employee</option>
          <option value="employer">Employer</option>
        </select>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleLogin}
            className="bg-gray-700 rounded text-white px-4 py-2 active:bg-slate-600 w-32 mx-auto"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
