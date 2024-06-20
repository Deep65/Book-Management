import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

const Header = () => {
//   const router = useRouter();

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
        <ul className="flex space-x-4">
        
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
