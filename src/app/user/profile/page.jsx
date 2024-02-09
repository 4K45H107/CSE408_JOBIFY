"use client";
import UploadFile from "@/components/common/UploadFile";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const Profile = () => {
  const [type, setType] = useState("profile"); //CV - Job Preferences - Notifications
  const [picture, setPicture] = useState();

  const { role, userId } = useContext(AuthContext);
  const { data: profile, isLoading } = useSWR(
    `/api/user/profile?userId=${userId}`,
    fetcher
  );

  useEffect(() => {
    if (profile) setPicture(profile.photo);
  }, [isLoading]);

  useEffect(() => {
    handleupload();
  }, [picture]);

  const handleupload = async () => {
    const data = {
      photo: picture,
    };

    try {
      const res = await axios.patch(
        `/api/user/profile/picture?userId=${userId}`,
        data
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(profile);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-start h-screen">
        {/* Left section */}
        <div className="h-full flex flex-col items-center w-1/5 p-6 bg-gray-200">
          {/* Logo */}
          <img
            className="mb-8 rounded-full"
            src={picture || "/profile_logo.jpg"}
            alt="Jobify Logo"
            style={{ maxWidth: "200px" }}
          />

          {/* Upload photo */}
          {/* <div className="mb-6 w-full">
            <input
              type="file"
              id="photo"
              className="text-sm text-stone-500
                          file:mr-5 file:py-1 file:px-3 file:border-[0.5px]
                          file:text-xs file:font-medium
                          file:bg-stone-50 file:text-stone-700
                          hover:file:cursor-pointer hover:file:bg-gray-200
                        hover:file:text-gray-600"
            />
          </div> */}

          <UploadFile imageUrl={picture} setImageURL={setPicture} />
          <button className=" bg-black text-sm text-white rounded py-2 px-10 mr-4 shadow-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray">
            {" "}
            Upload File{" "}
          </button>
          {/* Profile info */}
          <div className="flex flex-col w-full space-y-4">
            <div className="flex flex-col w-full items-center mb-12">
              <p className="text-3xl font-semibold">{profile?.fullname}</p>
              <p className="text-l text-gray-600">@{profile?.username}</p>
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
        <div className="h-full w-4/5 p-6 border-gray-300 ml-12 mt-12">
          <h3 className="w-full text-center text-4xl font-semibold mb-6">
            My Information
          </h3>
          <div className="space-y-4 text-gray-800">
            <div>
              <p className="text-2xl font-semibold">Full Name</p>
              <p>{profile?.fullname}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Email</p>
              <p>{profile?.email}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Location</p>
              <p>{profile?.profile.location}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Phone</p>
              <p>{profile?.phone}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Education</p>
              <p>{profile?.profile.education}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
