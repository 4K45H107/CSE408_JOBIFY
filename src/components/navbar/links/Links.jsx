"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { CiBookmark, CiSearch, CiSettings, CiVideoOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const Links = () => {
  const { logout } = useContext(AuthContext);

  const links = [
    {
      title: "Home",
      path: "/user/home",
      icon: () => <IoHomeOutline />,
    },

    {
      title: "Explore",
      path: "/user/explore",
      icon: () => <CiSearch />,
    },

    {
      title: "Activities",
      path: "/user/activities",
      icon: () => <CiBookmark />,
    },

    {
      title: "Interviews",
      path: "/user/interviews",
      icon: () => <CiVideoOn />,
    },

    {
      title: "Profile",
      path: "/user/profile",
      icon: () => <CiSettings />,
    },
  ];
  ``;

  return (
    <div className="bg-slate-300 px-10 flex flex-col h-full justify-center">
      {links.map((link) => (
        <div className="flex items-center gap-x-2 py-2">
          {link.icon()}
          <Link href={link.path} key={link.title}>
            {link.title}
          </Link>
        </div>
      ))}
      <button className="flex items-center gap-x-2 py-2" onClick={logout}>
        <IoIosLogOut />
        Logout
      </button>
    </div>
  );
};

export default Links;
