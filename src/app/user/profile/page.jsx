"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import React, { useContext, useState } from "react";
import useSWR from "swr";

const Profile = () => {
  const [type, setType] = useState("profile"); //CV - Job Preferences - Notifications
  const { role, userId } = useContext(AuthContext);
  const { data: profile, isLoading } = useSWR(
    `/api/user/profile?userId=${userId}`,
    fetcher
  );

  console.log(profile);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-start h-screen">
        {/* Left section */}
        <div className="h-full flex flex-col items-center w-1/5 p-6 bg-gray-200">
          {/* Logo */}
          <img
            className="mb-8 rounded-full"
            src="/home_logo.png"
            alt="Jobify Logo"
            style={{ maxWidth: "200px" }}
          />

          {/* Upload photo */}
          <div className="mb-6 w-full">
            <input
              type="file"
              id="photo"
              className="w-full py-2 px-4 border rounded"
            />
          </div>

          {/* Profile info */}
          <div className="flex flex-col w-full space-y-4">
            <div className="flex flex-col w-full items-center mb-12">
              <p className="text-3xl font-semibold">{profile.fullname}</p>
              <p className="text-l text-gray-600">@{profile.username}</p>
            </div>
            <div className="flex flex-col items-end">
              <button
                className="rounded px-3 py-2"
                onClick={() => setType("cv")}
              >
                CV
              </button>
              <button
                className="px-3 py-2"
                onClick={() => setType("job-preferences")}
              >
                Job preferences
              </button>
              <button
                className="px-3 py-2"
                onClick={() => setType("notifications")}
              >
                Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="h-full w-4/5 p-6 border-gray-300 ml-12 mt-">
          <h3 className="text-2xl font-semibold mb-6">My Information</h3>
          <div className="space-y-4 text-gray-800">
            <div>
              <p className="font-semibold">Full Name</p>
              <p>{profile.fullname}</p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p>{profile.email}</p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p>{profile.profile.location}</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p>{profile.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Education</p>
              <p>{profile.profile.education}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
