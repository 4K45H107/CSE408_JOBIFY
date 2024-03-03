"use client";
import Profile from "@/app/user/profile/page";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import useSWR from "swr";

const profilePage = (props) => {
  // <Link href={`/company/${props.company}`} className="">
  //    {" "}
  //    {props.company}
  // </Link>
  const router = useRouter();
  // const [jobID, setJobID] = useState(null);

  const { role, userId } = useContext(AuthContext);
  console.log(role);

  const { profileID } = useParams();
  console.log(profileID);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { jobID } = router.query;
  //     setJobID(jobID);
  //   }
  // }, [router.isReady, router.query]);
  // console.log(jobID);

  const { data: profile, isLoading } = useSWR(
    `/api/user/profile?userId=${profileID}`,
    fetcher
  );

  console.log(profile);

  // fetch data by props.activeId
  if (!isLoading) {
    return (
      <div className="flex justify-center items-start h-screen">
        {/* Left section */}
        <div className="h-full flex flex-col items-center w-1/5 p-6 bg-gray-200">
          {/* Logo */}
          <img
            className="aspect-square mb-8 rounded-full"
            src={profile.picture || "/profile_logo.jpg"}
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

          {/* Profile info */}
          <div className="flex flex-col w-full space-y-4">
            <div className="flex flex-col w-full items-center mb-12">
              <p className="text-3xl font-semibold">{profile?.fullname}</p>
              <p className="text-l text-gray-600">@{profile?.username}</p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className=" h-full w-4/5 p-6 border-gray-300 ml-12 mt-12">
          <h3 className="w-full text-center text-4xl font-semibold mb-6">
            Information
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
                <p className="text-4xl font-semibold">About</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Location</p>
                <p>{profile?.profile.location}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">BirthDate</p>
                <p>{profile?.birthdate}</p>
              </div>

              <div>
                <p className="text-2xl font-semibold">Education</p>
                <p>{profile?.profile.education}</p>
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <p className="text-4xl font-semibold mb-4">Job Preference</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Location</p>
                <p>{profile?.job_preferences?.locations}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Job Type</p>
                {profile?.job_preferences?.job_type?.map((jobType) => (
                  <span className="mr-2 border-r pr-2">{jobType}</span>
                ))}
              </div>
              <div>
                <p className="text-2xl font-semibold">Salary</p>
                <p>{profile?.job_preferences?.salary_range}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default profilePage;
