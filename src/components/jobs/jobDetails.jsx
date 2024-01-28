import Link from "next/link";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const JobDetails = () => {
  return (
    <div className="border h-full rounded px-4 py-4 mr-4">
      <div className="flex items-center gap-x-2 justify-between">
        <div className="flex items-center gap-x-2">
          <div className="h-6 w-6 rounded-full bg-green-400"></div>
          <p className="">Google</p>
          <p className="text-xs">4.8</p>
        </div>
        <div className="flex items-center gap-x-1">
          <CiBookmark />
          <div className="flex items-center text-lime-600">
            <AiFillThunderbolt />
            <p>Easy Apply</p>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold">Frontend Developer</h3>
      <p className="text-xs color-gray-500">Remote</p>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Frontend Developer</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi maxime
        totam cupiditate fugit explicabo beatae assumenda, aliquid officiis
        reprehenderit pariatur praesentium cum magnam rerum corporis autem quae
        cumque voluptas veritatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi maxime
        totam cupiditate fugit explicabo beatae assumenda, aliquid officiis
        reprehenderit pariatur praesentium cum magnam rerum corporis autem quae
        cumque voluptas veritatis.
      </div>
      <div>
        <h2 className="text-xl font-bold mt-6">Frontend Developer</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi maxime
        totam cupiditate fugit explicabo beatae assumenda, aliquid officiis
        reprehenderit pariatur praesentium cum magnam rerum corporis autem quae
        cumque voluptas veritatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi maxime
        totam cupiditate fugit explicabo beatae assumenda, aliquid officiis
        reprehenderit pariatur praesentium cum magnam rerum corporis autem quae
        cumque voluptas veritatis.
        magnam rerum corporis autem quae
        cumque voluptas veritatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi maxime
        totam cupiditate fugit explicabo beatae assumenda, aliquid officiis
        reprehenderit pariatur praesentium cum magnam rerum corporis autem quae
        cumque voluptas veritatis.
      </div>
      {/* <div className="flex items-center">
        <MdOutlineKeyboardArrowDown />
        <Link href={"/"}>Show More</Link>
      </div> */}
    </div>
  );
};

export default JobDetails;
