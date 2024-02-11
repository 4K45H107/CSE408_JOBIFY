"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Card from "../jobs/card";

const RecentSearches = () => {
  const { role, userId } = useContext(AuthContext);

  const { data: jobs, isLoading } = useSWR(
    `/api/user/activities/recent?userId=${userId}`,
    fetcher
  );

  console.log(jobs?.job_ids);

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="flex-1 h-[500px] overflow-auto px-4">
          <div className="flex flex-col">
            {jobs?.job_ids?.map((ids) => (
              <>
                {ids} <br />{" "}
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default RecentSearches;
