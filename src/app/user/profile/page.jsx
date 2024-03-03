"use client";
import UploadFile from "@/components/common/UploadFile";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const Profile = () => {
  const [type, setType] = useState("profile"); //CV
  const [picture, setPicture] = useState("");
  const [pdf, setPdf] = useState("");

  const [uploadShow, setUploadShow] = useState(false);
  const [uploadShowCv, setUploadShowCv] = useState(false);

  const { role, userId } = useContext(AuthContext);
  const { data: profile, isLoading } = useSWR(
    `/api/user/profile?userId=${userId}`,
    fetcher,
    { refreshInterval: 100 }
  );

  const [editable, setEditable] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthDate] = useState(new Date());
  const [profileInfo, setProfileInfo] = useState({
    location: "",
    skills: "",
    education: "",
  });
  const [job_preferences, setjob_preferences] = useState({
    locations: "",
    salary_range: "",
    job_type: "",
  });

  useEffect(() => {
    if (profile) {
      console.log(profile);
      setPicture(profile.photo);
      setFullName(profile.fullname);
      setEmail(profile.email);
      setPassword(profile.password);
      setPhoneNumber(profile.phone);
      setBirthDate(profile.birthdate);
      setPdf(profile.cv);
      setUploadShowCv(false);

      let result = "";
      console.log(profile.job_preferences?.job_type);
      for (let i = 0; i < profile.job_preferences?.job_type?.length; i++) {
        result += profile.job_preferences?.job_type?.at(i);
        if (i < profile.job_preferences?.job_type?.length - 1) {
          result += ", ";
        }
      }
      console.log(result);
      setjob_preferences(profile.job_preferences);
      setjob_preferences((prev) => ({ ...prev, job_type: result }));

      let result2 = "";
      console.log(profile.profile?.skills);
      for (let i = 0; i < profile.profile?.skills?.length; i++) {
        result2 += profile.profile?.skills?.at(i);
        if (i < profile.profile?.skills?.length - 1) {
          result2 += ", ";
        }
      }
      console.log(result2);
      setProfileInfo(profile.profile);
      setProfileInfo((prev) => ({ ...prev, skills: result2 }));
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
        `/api/user/profile/picture?userId=${userId}`,
        data
      );
    } catch (error) {
      console.log(error);
    } finally {
      setUploadShowCv(false);
    }
  };

  const handleuploadPdf = async () => {
    if (!pdf) {
      return;
    }

    const data = {
      cv: pdf,
    };

    try {
      const res = await axios.patch(`/api/user/profile?userId=${userId}`, data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleuploadPdf();
  }, [pdf]);

  const handleSave = async (e) => {
    e.preventDefault();
    const user = {
      fullname: fullName,
      username: profile.username,
      email,
      password,
      phone: phoneNumber,
      profile: {
        ...profileInfo,
        skills: profileInfo.skills?.split(","),
      },
      job_preferences: {
        ...job_preferences,
        job_type: job_preferences.job_type?.split(","),
      },
      birthdate,
      //job_preferences,
    };

    console.log(user);

    try {
      const res = await axios.patch(`/api/user/profile?userId=${userId}`, user);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditable(false);
    }
  };

  if (!isLoading) {
    if (type === "profile") {
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
            <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
              <button
                type="submit"
                onClick={() => setUploadShow(true)}
                className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
              >
                Upload
              </button>
            </div>

            {uploadShow && (
              <UploadFile imageUrl={picture} setImageURL={setPicture} />
            )}

            {/* Profile info */}
            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-col w-full items-center mb-12">
                <p className="text-3xl font-semibold">{profile?.fullname}</p>
                <p className="text-l text-gray-600">@{profile?.username}</p>
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="px-3 py-2"
                  onClick={() => {
                    setType("profile");
                    setUploadShowCv(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className="rounded px-3 py-2"
                  onClick={() => setType("cv")}
                >
                  CV
                </button>
                <button className="px-3 py-2">Notifications</button>
              </div>
            </div>
          </div>

          {/* Right section */}
          {!editable && (
            <div className=" h-full w-4/5 p-6 border-gray-300 ml-12 mt-12">
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
                    <p className="text-4xl font-semibold mb-4">
                      Job Preference
                    </p>
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
            <div className="w-full">
              <div className="mt-16 flex h-full w-full items-center justify-center">
                <form className="flex flex-col border px-6 py-10">
                  <h3 className="flex text-xl pb-6 justify-center">
                    Edit Your Info
                  </h3>
                  <div className="flex gap-6">
                    <div className="flex flex-col">
                      <label>Update your Email:</label>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="test"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                      <label>Update your Password:</label>
                      <input
                        className="border rounded py-3 px-2 mb-5"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                      <label>Update your Full Name:</label>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      ></input>
                      {/* ... Other existing fields ... */}
                      <label>Update your Phone Number:</label>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Birth Date:</label>
                      <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        placeholder="Phone Number"
                        value={birthdate}
                        onChange={(e) => setBirthDate(e.target.value)}
                      />

                      <label>Profile Information:</label>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="text"
                        placeholder="Location"
                        value={profileInfo.location}
                        onChange={(e) =>
                          setProfileInfo({
                            ...profileInfo,
                            location: e.target.value,
                          })
                        }
                      ></input>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="text"
                        placeholder="Skills"
                        value={profileInfo.skills}
                        onChange={(e) =>
                          setProfileInfo({
                            ...profileInfo,
                            skills: e.target.value,
                          })
                        }
                      ></input>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="text"
                        placeholder="Education"
                        value={profileInfo.education}
                        onChange={(e) =>
                          setProfileInfo({
                            ...profileInfo,
                            education: e.target.value,
                          })
                        }
                      ></input>
                      <label>Job Preference:</label>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="text"
                        placeholder="Location"
                        value={job_preferences.locations}
                        onChange={(e) =>
                          setjob_preferences({
                            ...job_preferences,
                            locations: e.target.value,
                          })
                        }
                      ></input>
                      <input
                        className="border rounded py-3 px-2 mb-3"
                        type="text"
                        placeholder="Salary Range"
                        value={job_preferences.salary_range}
                        onChange={(e) =>
                          setjob_preferences({
                            ...job_preferences,
                            salary_range: e.target.value,
                          })
                        }
                      ></input>
                      <input
                        className="border rounded py-3 px-2 mb-5"
                        type="text"
                        placeholder="Job Type"
                        value={job_preferences.job_type}
                        onChange={(e) =>
                          setjob_preferences({
                            ...job_preferences,
                            job_type: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={handleSave}
                      className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    } else {
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

            {/* Profile info */}
            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-col w-full items-center mb-12">
                <p className="text-3xl font-semibold">{profile?.fullname}</p>
                <p className="text-l text-gray-600">@{profile?.username}</p>
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="px-3 py-2"
                  onClick={() => setType("profile")}
                >
                  Profile
                </button>
                <button
                  className="rounded px-3 py-2"
                  onClick={() => setType("cv")}
                >
                  CV
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
          <div className=" h-full w-4/5 p-6 border-gray-300 ml-12 mt-12">
            <div className="flex flex-col">
              <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
                <button
                  type="submit"
                  onClick={() => setUploadShowCv(true)}
                  className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
                >
                  Upload
                </button>
              </div>
              {uploadShowCv && (
                <UploadFile imageUrl={pdf} setImageURL={setPdf} />
              )}

              {pdf && <iframe src={pdf} className="h-screen w-100"></iframe>}
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Profile;
