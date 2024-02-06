"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Input } from "postcss";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg2"></div>
      <div className="center w-1/2">
        <h3 className="text-center text-4xl font-semibold mb-12">Log in</h3>

        <Input
          type="text"
          placeholder="Email"
          value={email}
          setValue={setEmail}
          className={"mb-6"}
        />

        <Input
          type={"password"}
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          className={"mb-6"}
        />

        <button
          //onClick={login}
        >
         
        </button>

        <Link
          href="/reset-password"
          className="content3 text-left w-[300px] text-sm mb-1"
        >
          Forgot password?
        </Link>
        <Link
          href="/signup"
          className="content3 text-left w-[300px] text-sm mb-1"
        >
          Don&apos;t have an account?{" "}
          <span className="font-semibold">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
