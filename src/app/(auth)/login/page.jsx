"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState("");

  const { login, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if userType is selected
    if (!type) {
      alert("Please select a user type.");
      return;
    }

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
    <div className="flex h-screen">
      <div className="flex flex-col justify-center w-1/2 h-full">
        {/* Logo Picture */}
        <div className="w-100 flex justify-center">
          <img
            className="mb-6"
            src="/home_logo2.png"
            alt="Jobify Logo"
            style={{ maxWidth: "400px", maxHeight: "400px" }}
          />
        </div>
      </div>
      <div className="flex h-full w-1/2 bg-gray-800 items-center justify-center">
        <form className="flex flex-col border rounded bg-slate-50 px-10 py-10">
          <h3 className="text-center text-4xl font-semibold mb-12">Log in</h3>

          <input
            className="border rounded w-auto py-3 px-2 mt-3"
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <input
            className="border rounded w-auto py-3 px-2 my-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <select
            className="border rounded h-12 py-6 px-2 mt-3 mb-6"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option className="text-gray-500" value="" disabled>
              Select Role
            </option>
            <option value="user">Employee</option>
            <option value="employer">Employer</option>
          </select>

          <div className="flex justify-center my-4 w-auto bg-gray-800 rounded">
            <button
              type="submit"
              onClick={handleLogin}
              className=" text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
            >
              Login
            </button>
          </div>
          <Link
            href="/register"
            className="content3 text-left w-[300px] text-sm mb-1"
          >
            Don&apos;t have an account?{" "}
            <span className="font-semibold">Sign up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
