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

  return (
    <div
      className="relative px-2 py-3 border-b-2 cursor-pointer"
      onClick={() => {
        props.setActiveId2(props.id);
      }}
    >
      <Link href={`/profilePage/user/${props.id}`} className="">
        <h3 className="text-lg font-semibold">{props.name}</h3>
      </Link>

      <div className="flex justify-center my-4 px-2 bg-gray-800 rounded">
        <Link
          type="submit"
          href={`/cv?userId=${props.id}`}
          className=" text-white active:bg-slate-600 mx-auto"
        >
          View CV
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
