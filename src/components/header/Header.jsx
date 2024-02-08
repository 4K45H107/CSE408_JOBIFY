import Link from "next/link";
import { IoIosNotificationsOutline } from "react-icons/io";
const Header = () => {
  return (
    <div className="flex justify-between py-4 px-8 items-center">
      <img src="/logo.jpg" className="h-12 rounded" />
      <div className="flex items-center gap-x-2">
        <Link href={"#"}>
          <IoIosNotificationsOutline size={24} />
        </Link>
        <Link href="/user/profile" className="">
          <img src="/profile_logo.jpg" className="h-12 rounded-full" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
