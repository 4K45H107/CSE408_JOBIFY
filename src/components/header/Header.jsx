import Link from "next/link";
import { IoIosNotificationsOutline } from "react-icons/io";
const Header = () => {
    return (
        <div className="flex justify-between py-4 px-8 items-center">
            <div className="h-12 w-12 bg-amber-300 rounded-full"></div>
            <div className="flex items-center gap-x-2">
                <Link href={"/"}><IoIosNotificationsOutline size={24}/></Link>
                <Link href="/" className="h-12 w-12 rounded-full bg-emerald-400"></Link>
            </div>
        </div>
    )
}

export default Header