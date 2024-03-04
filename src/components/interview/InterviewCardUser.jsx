"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const InterviewCardUser = (props) => {
  console.log(props.id);
  if (!props.id) {
    return <></>;
  }

  console.log(props.id);

  const { role, userId } = useContext(AuthContext);
  const [activeId, setActiveId] = useState("");

  const [interviewList, setInterviewList] = useState([]);

  const { data: interviews, isLoading } = useSWR(
    `/api/interview/employer?jobId=${props.id}`,
    fetcher,
    { refreshInterval: 100 }
  );

  useEffect(() => {
    setInterviewList(interviews);
  }, [interviews]);

  console. log(interviews);
  console.log(interviewList);

  if (!isLoading) {
    return (
      <div>
        <div className="flex gap-x-4 mt-2 ">
          <div className="w-full overflow-auto px-4">
            <div className="">
              {interviews?.map((int) => (
                <div className="">
                  <h3 className="text-slate-400">Job ID: {int?.job_id}</h3>
                  <h3 className="text-red-200">Interview ID: {int?._id}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InterviewCardUser;
