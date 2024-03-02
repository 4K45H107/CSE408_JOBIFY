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

  const [type, setType] = useState("company"); // company, regular
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

    try {
      const res = await axios.patch("/api/updateEmployerNumber", dummy);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const res = await axios.patch("/api/updateEmployerNumber", dummy);
    //   const data = res.data;
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }

  };

  return (
    <div className="relative px-2 py-3 border-b-2 cursor-pointer">
      {type === "company" && (
        <div className="">
          <h3 className="text-lg font-semibold">Company Notification</h3>
          <div className="flex items-center">{props.message}</div>
          {change !== "done" && (
            <div className="">
              <div className="flex justify-center my-4 w-40 bg-gray-800 rounded">
                <button
                  type="submit"
                  //onClick={handleRecent}
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
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
