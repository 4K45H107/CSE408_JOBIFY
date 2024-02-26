"use client";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { CiCirclePlus, CiSearch, CiSettings, CiVideoOn } from "react-icons/ci";
import { HiBuildingLibrary } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

const LinksEmployer = () => {
  const { logout } = useContext(AuthContext);

  const [activeLink, setActiveLink] = useState("Home");

  const links = [
    {
      title: "Home",
      path: "/employer/home",
      icon: () => <IoHomeOutline />,
    },

    {
      title: "Add Jobs",
      path: "/employer/addJobs",
      icon: () => <CiCirclePlus />,
    },

    {
      title: "Explore",
      path: "/employer/explore",
      icon: () => <CiSearch />,
    },

    {
      title: "My Company",
      path: "/employer/myCompany",
      icon: () => <HiBuildingLibrary />,
    },

    {
      title: "Interview Scheduling",
      path: "/employer/interviewSchedule",
      icon: () => <CiVideoOn />,
    },

    {
      title: "Profile",
      path: "/employer/profile",
      icon: () => <CiSettings />,
    },
  ];
  ``;

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

export default LinksEmployer;
