import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const NotificationCard = (props) => {
  if (!props) {
    return <div className=""></div>;
  }

  const [type, setType] = useState(props.type); // company, regular, applied, interview
  const { role, userId } = useContext(AuthContext);
  const [change, setChange] = useState("");

  console.log(props);
  console.log(props.data);

  const handleApproval = async () => {
    const data = {
      name: props.data.name,
    };

    try {
      const res = await axios.patch(
        `/api/employer/updateCompany?userId=${props.data.employer}`,
        data
      );
    } catch (error) {
      console.log(error);
    }

    const dummy = {
      name: "",
    };

    setChange("done");
    props.setRead(true);
    props.setActiveId(props.id);

    try {
      const res = await axios.patch("/api/updateEmployerNumber", dummy);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    const abc = {
      name: props.data.name,
      employer: props.data.employer,
    };

    console.log(abc);

    try {
      const res = await axios.post(`/api/notification/rejectEmployer`, abc);
    } catch (error) {
      console.log(error);
    }

    const dummy = {
      name: "",
    };

    setChange("done");
    props.setRead(true);
    props.setActiveId(props.id);
  };

  return (
    <div className="relative px-2 py-3 border-b-2 cursor-pointer">
      {type === "company" && (
        <div className="">
          <h3 className="text-lg font-semibold">Company Notification</h3>
          <div className="flex items-center">Name: {props.message.name}</div>
          <div className="flex items-center">
            Designation: {props.message.designation}
          </div>
          <div className="flex items-center">{props.message.description}</div>
          {!props.read && (
            <div className="">
              <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
                <button
                  type="submit"
                  onClick={handleReject}
                  className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
                >
                  Reject
                </button>
              </div>
              <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
                <button
                  type="submit"
                  onClick={handleApproval}
                  className="w-40 text-white px-4 py-3 active:bg-slate-600 mx-auto"
                >
                  Approve
                </button>
              </div>
            </div>
          )}

          {props.read && <div className=""></div>}
        </div>
      )}

      {type === "regular" && (
        <div className="">
          <h3 className="text-lg font-semibold">Regular Notification</h3>
          <div className="flex items-center">
            {props.message.description} {props.message.name}
          </div>
        </div>
      )}

      {type === "applied" && (
        <div className="">
          <h3 className="text-lg font-semibold">Applied Notification</h3>
          <div className="flex flex-col">
            <h2 className="text-xl">{props.message.name}</h2>
            <p className="">{props.message.description}</p>
          </div>
        </div>
      )}

      {type === "interview" && (
        <div className="">
          <h3 className="text-lg font-semibold">Interview Notification</h3>
          <div className="flex flex-col">
            <h2 className="text-xl">{props.message.name}</h2>
            <p className="">{props.message.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
