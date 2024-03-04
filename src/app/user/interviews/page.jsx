"use client";

import IV2 from "@/components/interview/IV2";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const interviewUser = () => {
  const { role, userId } = useContext(AuthContext);
  const [activeId, setActiveId] = useState("");

  const [interviewList, setInterviewList] = useState([]);

  const { data: interviews, isLoading } = useSWR(
    `/api/interview/user?userId=${userId}`,
    fetcher,
    { refreshInterval: 100 }
  );

  useEffect(() => {
    setInterviewList(interviews);
  }, [interviews]);

  console.log(interviews);

  if (!isLoading) {
    return (
      <div>
        <div className="flex gap-x-4 mt-2 ">
          <div className="w-full overflow-auto px-4">
            <div className="flex flex-col gap-y-3 my-3">
              {interviews?.map((int) => (
                <IV2
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

  // if (!isLoading) {
  //   return (
  //     <div>
  //       <div className="flex gap-x-4 mt-16">
  //         <div className="w-full h-[600px] overflow-auto px-4 ">
  //           <div className="flex flex-col">
  //             {interviewList?.map((interview, i) => (
  //               <>
  //                 <p className="text-lg text-red-400 ">
  //                   {" "}
  //                   {i + 1}. Interview ID: {interview._id}{" "}
  //                 </p>
  //               </>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};

export default interviewUser;
