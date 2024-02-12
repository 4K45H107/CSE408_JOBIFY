import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const CardSearchCompany = (props) => {
  const { role, userId } = useContext(AuthContext);
  const [activeId, setActiveId] = useState("");
  const router = useRouter();

  const handleView = async (e) => {
    e.preventDefault();

    setActiveId(props.name);
  };

  useEffect(() => {
    if (activeId !== "") {
      router.push(`/company/${props.name}`);
    }
  }, [activeId]);

  console.log(props.name);

  return (
    <div className="relative px-2 py-3 border-b-2 cursor-pointer">
      <div className="flex items-center gap-x-2">
        <img src="/company_logo.jpg" className="h-6 w-6 rounded-full" />
        <Link href={`/company/${props.name}`} className="">
          {props.name}
        </Link>
        <p className="text-xs">4.8</p>
      </div>
      <h3 className="text-lg font-semibold">{props.type}</h3>
      <p className="">{props.description}</p>
      <p className="">{props.numOfEmployees}</p>
      <p className="">{props.employerNumberInJobify}</p>
      <div className="flex justify-between ">
        <div className="flex justify-center my-4 w-auto bg-gray-800 rounded">
          <button
            type="submit"
            onClick={handleView}
            className="w-full text-white w-100 px-4 py-3 active:bg-slate-600 mx-auto"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSearchCompany;
