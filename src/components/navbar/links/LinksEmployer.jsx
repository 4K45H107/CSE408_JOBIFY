"use client";

import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch, CiCirclePlus, CiSettings, CiVideoOn} from "react-icons/ci";
import { HiBuildingLibrary } from "react-icons/hi2";

const LinksEmployer = () => {
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
      icon: () => <CiSearch/>
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
      title: "Settings",
      path: "/employer/settings",
      icon: () => <CiSettings />,
    },
  ];
  ``;

  return (
    <div className="bg-slate-300 px-2.5 flex flex-col h-full justify-center">
      {links.map((link) => (
        <div className="flex items-center gap-x-2 py-2">
          {link.icon()}
          <Link href={link.path} key={link.title}>
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LinksEmployer;
