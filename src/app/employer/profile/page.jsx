"use client";
import UploadFile from "@/components/common/UploadFile";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const EmployerProfile = () => {
  const [type, setType] = useState("profile"); //CV - Notifications
  const [picture, setPicture] = useState();

  const { role, userId } = useContext(AuthContext);
  const { data: profile, isLoading } = useSWR(
    `/api/employer/profile?userId=${userId}`,
    fetcher
  );

  console.log(profile);

  const [editable, setEditable] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    if (profile) {
      setPicture(profile.photo);
      setFullName(profile.fullname);
      setEmail(profile.email);
      setPassword(profile.password);
      setPhoneNumber(profile.phone);
      setDesignation(profile.designation);
    }
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
        `/api/employer/profile/picture?userId=${userId}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const user = {
      fullname: fullName,
      username: profile.username,
      email,
      password,
      phone: phoneNumber,
      designation,
      //job_preferences,
    };

    console.log(user);

    try {
      const res = await axios.patch(
        `/api/employer/profile?userId=${userId}`,
        user
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditable(false);
    }
  };

  if (!isLoading) {
    return (
      <div className="flex justify-center items-start h-screen">
        {/* Left section */}
        <div className="h-full flex flex-col items-center w-1/5 p-6 bg-gray-200">
          {/* Logo */}
          <img
            className="aspect-square mb-8 rounded-full"
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
          </div>
        </div>

        {/* Right section */}
        {!editable && (
          <div className="h-full w-4/5 p-6 border-gray-300 ml-12 mt-12">
            <h3 className="w-full text-center text-4xl font-semibold mb-6">
              My Information
            </h3>
            <div className="flex">
              <div className="w-1/2 space-y-4 text-gray-800">
                <div>
                  <p className="text-2xl font-semibold">Full Name</p>
                  <p>{profile?.fullname}</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">Email</p>
                  <p>{profile?.email}</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">Phone</p>
                  <p>{profile?.phone}</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">Designation</p>
                  <p>{profile?.designation}</p>
                </div>
              </div>
              <div className="w-1/2 space-y-4 text-gray-800">
                <div>
                  <p className="text-2xl font-semibold">Company</p>
                  <p>{profile?.company?.name}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center my-4 w-auto bg-gray-800 rounded">
              <button
                type="submit"
                onClick={() => setEditable(true)}
                className="w-full text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {editable && (
          <div className="flex h-full w-full items-center justify-center">
            <form className="flex flex-col border px-6 py-10">
              <h3 className="flex text-xl pb-6 justify-center">
                Sign Up to JOBIFY
              </h3>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label>Enter your Email:</label>
                  <input
                    className="border rounded py-3 px-2 mb-3"
                    type="test"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <label>Enter your Full Name:</label>
                  <input
                    className="border rounded py-3 px-2 mb-3"
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  ></input>
                </div>

                <div className="flex flex-col">
                  {/* ... Other existing fields ... */}
                  <label>Enter your Phone Number:</label>
                  <input
                    className="border rounded py-3 px-2 mb-3"
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                  <label>Enter your Designation:</label>
                  <input
                    className="border rounded py-3 px-2 mb-3"
                    type="text"
                    placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={handleSave}
                  className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
};

export default EmployerProfile;
