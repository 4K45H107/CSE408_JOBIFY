"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import axior from "axios";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const SelectCompany = () => {
  const { role, userId } = useContext(AuthContext);

  const {
    data: companies,
    isLoading,
    error,
  } = useSWR("/api/employer/getCompanies", fetcher);
  useEffect(() => {
    console.log(companies);
  }, [companies, isLoading]);

  const [selectedCompany, setSelectedCompany] = useState("");

  // Patch the selected company data
  const handleCompanyChange = async () => {
    const data = {
      photo: picture,
    };

    try {
      const res = await axios.patch(
        `/api/employer/updateCompany?userId=${userId}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const patchCompany = async (companyData) => {
    try {
      const response = await axios.patch(
        `/api/company/${selectedCompany}`,
        companyData
      );
      console.log("Company data patched successfully:", response.data);
    } catch (error) {
      console.error("Error patching company data:", error);
    }
  };

  if (!isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Select Company
          </h1>
          <div className="flex">
            {/* Company dropdown */}
            <div className="w-1/2 mr-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Select a company:
              </label>
              <select
                id="company"
                className="block w-full bg-white border border-gray-300 rounded px-4 py-2"
                value={selectedCompany}
                onChange={handleCompanyChange}
              >
                <option value="">Select a company...</option>
                {companies?.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
          >
            Next
          </button>
          <Link
            href="/registerEmployer/addCompany"
            className="content3 text-left w-[300px] text-sm mb-1"
          >
            Don&apos;t have your company?{" "}
            <span className="font-semibold">Create One</span>
          </Link>
        </div>
      </div>
    );
  }
};

export default SelectCompany;
