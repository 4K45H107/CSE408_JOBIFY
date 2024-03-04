"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import IV from "./IV";

const InterviewCard = (props) => {
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

  console.log(interviews);
  console.log(interviewList);

  if (!isLoading) {
    return (
      <div>
        <div className="flex gap-x-4 mt-2 ">
          <div className="w-full overflow-auto px-4">
            <div className="flex flex-col gap-y-3 my-3">
              {interviews?.map((int) => (
                <IV
                  key={int._id}
                  user_id={int.user_id}
                  job_id={int.job_id}
                  id={int._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InterviewCard;
