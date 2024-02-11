"use client";
import { fetcher } from "@/utils/conn";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import useSWR from "swr";

const company = (props) => {
  const router = useRouter();
  // const [jobID, setJobID] = useState(null);

  const { companyID } = useParams();
  console.log(companyID);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { jobID } = router.query;
  //     setJobID(jobID);
  //   }
  // }, [router.isReady, router.query]);
  // console.log(jobID);

  const { data: company, isLoading } = useSWR(
    `/api/employer/getCompany?company=${companyID}`,
    fetcher
  );
  if (!company) return <div>Loading...</div>;

  console.log(company);

  // fetch data by props.activeId
  if (!isLoading) {
    return (
      <div className="flex flex-col w-full h-full items-center mx-auto px-4 py-8 justify-center">
        <div className="flex flex-col items-center justify-center mx-72 border rounded">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <img
                src={company?.logo}
                alt="Cover Photo"
                className="rounded-lg mb-4 md:mb-0"
              />
            </div>
            <div className="md:w-1/2">
              <img
                src={company?.logo}
                alt="Profile Photo"
                className="rounded-full w-32 mb-4 md:mb-0 mx-auto"
              />
            </div>
          </div>
          <div className="w-1/3 mt-8">
            <h1 className="text-3xl font-bold mb-4">{company?.name}</h1>
            <p className="text-lg mb-2">
              <span className="font-semibold">Email:</span> {company?.email}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Phone Number:</span>{" "}
              {company?.phone}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Company Type:</span>{" "}
              {company?.designation}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Number of Employees:</span>{" "}
              {company?.numOfEmployees}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {company?.description}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Branch Name:</span>{" "}
              {company?.branch}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default company;
