import React, { useContext, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const UserCard = (props) => {
  if (!props.id) {
    return <></>;
  }
  console.log(props.id);
  const { role, userId } = useContext(AuthContext);
  console.log(userId);

  const handleAccept = () => {};

  const handleReject = () => {};

  return (
    <div className="flex flex-col">
      <div
        className="flex px-2 py-3 border-b-2 cursor-pointer"
        onClick={() => {
          props.setActiveId2(props.id);
        }}
      >
        <Link href={`/profilePage/user/${props.id}`} className="">
          <h3 className="text-lg font-semibold">{props.name}</h3>
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="px-1">
          <Link
            type="submit"
            href={`/cv?userId=${props.id}`}
            className=" text-white px-2 bg-gray-800 rounded active:bg-slate-600"
          >
            View CV
          </Link>
        </div>

        <div>
          <p className="text-sm">Email: {props.email}</p>
        </div>
        <div>
          <p className="text-sm ">Phone: {props.phone}</p>
        </div>

        <div>
          <p className="text-sm ">Location: {props.profile.location}</p>
        </div>

        <div>
          <p className="text-sm ">Education: {props.profile.education}</p>
        </div>
      </div>

      <div className="flex py-4 border rounded">
        <button
          type="submit"
          onClick={handleAccept}
          className=" text-white px-2 bg-gray-800 rounded active:bg-slate-600 mx-2"
        >
          Accept
        </button>
        <button
          type="submit"
          onClick={handleReject}
          className=" text-white px-2 bg-gray-800 rounded active:bg-slate-600 mx-2"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default UserCard;
