"use client";
import { fetcher } from "@/utils/conn";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const CV = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  console.log(userId);

  const { data: profile, isLoading } = useSWR(
    `/api/user/profile?userId=${userId}`,
    fetcher
  );

  console.log(profile);

  if (!isLoading) {
    return (
      <div>
        <iframe src={profile.cv} className="h-screen w-full"></iframe>
      </div>
    );
  }
};

export default CV;
