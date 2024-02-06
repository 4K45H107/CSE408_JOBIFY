// pages/index.js

import Link from "next/link";

const home = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div>
        {/* Logo Picture */}
        <img
          className="mb-6"
          src="/home_logo.png"
          alt="Jobify Logo"
          style={{ maxWidth: "500px" }}
        />
        {/* Text */}
        <h3 className="my-16 text-3xl font-semibold text-center">
          Dive into the realm of jobs!
        </h3>

        {/* Login and Sign Up Buttons */}
        <div className="flex justify-center">
          <Link
            href="/login"
            className=" bg-black text-white rounded py-4 px-10 mr-4 shadow-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-white text-black rounded py-4 px-7 shadow-md hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default home;
