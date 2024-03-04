"use client";
import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";

const IV2 = (props) => {
  if (!props.job_id) {
    return <></>;
  }
  console.log(props.job_id);
  console.log(props);

  const { role, userId } = useContext(AuthContext);

  const { data: profile, isLoading } = useSWR(
    `/api/employer/getJob?jobId=${props?.job_id}`,
    fetcher,
    { refreshInterval: 100 }
  );

  console.log(profile);

  const handleJoin = () => {};

  const router = useRouter();
  if (!isLoading) {
    return (
      <div className="border rounded">
        <div className="text-xl semi-bold ">{profile?.title}</div>
        <div className="flex justify-center my-4 w-20 bg-gray-800 rounded">
          <button
            type="submit"
            onClick={handleJoin}
            className="w-26 text-white px-4 py-3 active:bg-slate-600 mx-auto"
          >
            Join
          </button>
        </div>
      </div>
    );
  }
};

export default IV2;
