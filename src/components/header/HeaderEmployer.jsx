import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/conn";
import { Island_Moments } from "next/font/google";
import Link from "next/link";
import { useContext } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import useSWR from "swr";
const HeaderEmployer = () => {
  const { role, userId } = useContext(AuthContext);
  const { data: profile, isLoading } = useSWR(
    `/api/employer/profile?userId=${userId}`,
    fetcher
  );

  if (!isLoading) {
    return (
      <div className="flex justify-between py-4 px-8 items-center">
        <img src="/logo.jpg" className="h-12 rounded" />
        <div className="flex items-center gap-x-2">
          <Link href={"#"}>
            <IoIosNotificationsOutline size={24} />
          </Link>
          <Link href="/user/profile" className="">
            <img
              src={profile?.photo || "/profile_logo.jpg"}
              className="h-12 rounded-full"
            />
          </Link>
        </div>
      </div>
    );
  }
};

export default HeaderEmployer;
