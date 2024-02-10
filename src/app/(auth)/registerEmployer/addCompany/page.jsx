"use client";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const addCompany = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numOfEmployer, setNumOfEmployer] = useState("");

  const [designation, setDesignation] = useState("");
  const [branch, setBranch] = useState("");
  const [description, setDescription] = useState("");

  const [selectedCompany, setSelectedCompany] = useState("");

  const { role, userId } = useContext(AuthContext);
  const router = useRouter();

  const handleCompanyCreate = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !designation ||
      !branch ||
      !description ||
      !numOfEmployer
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const company = {
      name: fullName,
      email,
      phone: phoneNumber,
      designation,
      branch,
      description,
      numOfEmployees: numOfEmployer,
    };

    console.log("Company data submitted:", company);
    // Replace the console.log with actual backend integration.
    try {
      const res = await axios.post(
        `/api/employer/addCompany?userId=${userId}`,
        company
      );
      const data = res.data;
      console.log(data);
      toast.success("Company Created Successfully");
      setSelectedCompany(fullName);
      handleCompanyChange();
      router.push("/employer/home");
    } catch (error) {
      console.log(error);
    }

    toast.success("Successfully created new company");
  };

  const handleCompanyChange = async () => {
    const data = {
      name: selectedCompany,
    };

    try {
      const res = await axios.patch(
        `/api/employer/updateCompany?userId=${userId}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
    setChange("done");
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <h3 className="flex text-xl pb-6 justify-center">Sign Up to JOBIFY</h3>
        <div className="flex gap-6">
          <div className="flex flex-col">
            <label>Enter your Company Name:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></input>
            <label>Enter Company Type:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Type"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            ></input>
            <label>Enter Company Email:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Enter Company Phone Number:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col">
            {/* ... Other existing fields ... */}
            <label>Enter Branch:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            ></input>
            <label>Enter Number of Employees:</label>
            <input
              className="border rounded py-3 px-2 mb-3"
              type="number"
              placeholder="Number of Employee"
              value={numOfEmployer}
              onChange={(e) => setNumOfEmployer(e.target.value)}
            ></input>
            <label>Enter Description:</label>
            <textarea
              id="description"
              className="border rounded py-2 px-3 mb-3 h-24 resize-none"
              placeholder="Description about your company..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleCompanyCreate}
            className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default addCompany;
