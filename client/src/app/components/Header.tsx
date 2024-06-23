import Link from "next/link";
import { cookies } from "next/headers";
import { FaHome } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <Link href="/">
          <span className="text-xl font-bold flex items-center">
            <FaHome className="mr-2" />
            Books App
          </span>
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4 cursor-pointer">
          <LogoutButton />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
