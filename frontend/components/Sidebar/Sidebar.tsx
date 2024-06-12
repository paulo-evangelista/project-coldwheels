'use-client'
import Link from 'next/link';
import Logo from "../../assets/icons/Logo";
import Home from "../../assets/icons/Home";
import Search from "../../assets/icons/Search";
import Star from "../../assets/icons/Star";
import { usePathname } from 'next/navigation';


const Sidebar = () => {
    const path = usePathname();

    const isRouteActive = (pathname: any) => {
        console.log("pathname: ", pathname, " path: ", path)
        return path === pathname;
    };

    return (
    <div className="w-64 bg-white p-6 shadow-lg rounded-r-lg">
      <div className="ml-4 mb-6">
        <Link href='/'>
            <Logo/>
        </Link>
      </div>
      <nav className="mt-20 mb-20">
        <p className="pb-4 pl-6 font-bold">
            Vehicle Finder
        </p>
        <ul className="space-y-5 ml-8">
          <li className={`flex items-center ${isRouteActive('/home') ? 'text-gray-900 border rounded' : 'text-black'} hover:text-gray-900`}>
            <Link href="/home" className="flex items-center text-black hover:text-gray-900">
                <div className="h-5 w-5 mr-4">
                    <Search width="24px" height="24px"/>
                </div>
                <div className="mt-2">
                    Find Vehicle
                </div>
            </Link>
          </li>
          <li className={`flex items-center ${isRouteActive('/favorites') ? 'text-gray-900 border rounded' : 'text-black'} hover:text-gray-900`}>
            <Link href="/favorites" className="flex items-center text-black hover:text-gray-900">
                <div className="h-5 w-5 mr-4">
                    <Star width="25px" height="25px"/>
                </div>
                <div className="mt-2">
                    Favorites
                </div>
            </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <p className="pb-4 pl-6 font-bold">
            Company
        </p>
        <ul className="space-y-5 ml-8">
            <li className={`${isRouteActive('/login') ? 'text-gray-900 border rounded' : 'text-black'} hover:text-gray-900`}>
                <Link href="/login" className="flex items-center text-black hover:text-gray-900">
                    <div className="h-5 w-5 mr-4 ml-1">
                        <Home width="20px" height="20px"/>
                    </div>
                    <div className="mt-1">
                        Dashboard
                    </div>
                </Link>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
