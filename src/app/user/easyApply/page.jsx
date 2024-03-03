"use client";
import UploadFile from "@/components/common/UploadFile";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const easyApply = () => {
  const [uploadShowCv, setUploadShowCv] = useState(false);
  const [pdf, setPdf] = useState("");
  const { role, userId } = useContext(AuthContext);

  const [type, setType] = useState();

  const router = useRouter();

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  console.log(jobId);

  useEffect(() => {
    handleCheck();
  }, [userId, jobId]);

  const handleCheck = async () => {
    const dataCheck = {
      user_id: userId,
      job_id: jobId,
    };

    

    console.log(dataCheck);

    try {
      const res = await axios.post(
        `/api/user/activities/applications/check`,
        dataCheck
      );
      const data = res.data;
      console.log(data);
      setType(data.applied);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: profile, isLoading } = useSWR(
    `/api/user/profile?userId=${userId}`,
    fetcher,
    { refreshInterval: 100 }
  );

  useEffect(() => {
    if (profile) {
      setPdf(profile.cv);
    }
  }, [isLoading]);

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
    } finally {
      setUploadShowCv(false);
    }
  };

  useEffect(() => {
    handleuploadPdf();
  }, [pdf]);

  console.log(profile);
  console.log(pdf);

  const handleNext = async () => {
    if (!jobId) {
      return;
    }

    const datam = {
      user_id: userId,
      job_id: jobId,
    };

    console.log(datam);

    try {
      const res = await axios.post(`/api/easyApply`, datam);
      const data = res.data;
      console.log(data);
      router.push("/user/explore");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoading) {
    if (!type) {
      return (
        <div className="flex justify-center items-start h-screen">
          <div className=" h-full w-4/5 p-6 border-gray-300 ml-12 mt-12">
            <div className="flex flex-col">
              <div className="flex gap-x-4">
                <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
                  <button
                    type="submit"
                    onClick={() => setUploadShowCv(true)}
                    className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
                  >
                    Upload
                  </button>
                </div>
                <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
                  <button
                    type="submit"
                    onClick={handleNext}
                    className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
                  >
                    Next
                  </button>
                </div>
              </div>
              {uploadShowCv && (
                <UploadFile imageUrl={pdf} setImageURL={setPdf} />
              )}

              {pdf && <iframe src={pdf} className="h-screen w-100"></iframe>}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <p className="text-4xl bold">
            {" "}
            You have already Applied to this Job!!!
          </p>
        </div>
      );
    }
  }
};

export default easyApply;
