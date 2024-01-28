"use client"

import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch, CiBookmark, CiSettings, CiVideoOn } from "react-icons/ci";

const Links = () => {

    const links = [
        {
            title: "Home",
            path: "/employee/home",
            icon: () => <IoHomeOutline />        
        },

        {
            title: "Explore",
            path: "/employee/explore",
            icon: () => <CiSearch/>
        },

        {
            title: "Activities",
            path: "/employee/activities",
            icon: () => <CiBookmark/>
        },

        {
            title: "Interviews",
            path: "/employee/interviews",
            icon: () => <CiVideoOn/>
        },

        {
            title: "Settings",
            path: "/employee/settings",
            icon: () => <CiSettings/>
        },
    ];``

    return (
    <div className="bg-slate-300 px-2.5 flex flex-col h-full justify-center">
        {links.map((link => (
            <div className="flex items-center gap-x-2 py-2">
                {link.icon()}
                <Link href={link .path} key={link.title}>{link.title}</Link>
            </div>
        )))}
    </div>
    );
} 

export default Links
