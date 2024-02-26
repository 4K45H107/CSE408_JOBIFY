"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { CiBookmark, CiSearch, CiSettings, CiVideoOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const Links = () => {
  const { logout } = useContext(AuthContext);

  const [activeLink, setActiveLink] = useState("Explore");

  const links = [
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

  return (
    <div className="bg-slate-300 px-10 flex flex-col h-full justify-center">
      {links.map((link) => (
        <div
          key={link.title}
          className={`${
            activeLink === link.title &&
            "text-shadow-lg text-white bg-gray-800 shadow-md"
          } flex items-center gap-x-2 py-2 rounded `}
        >
          {link.icon()}
          <Link href={link.path} key={link.title}>
            <p onClick={() => setActiveLink(link.title)}>{link.title}</p>
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
