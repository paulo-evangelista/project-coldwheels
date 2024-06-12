import Link from 'next/link';
import Logo from "../../assets/icons/Logo";
import Home from "../../assets/icons/Home";
import Search from "../../assets/icons/Search";
import Star from "../../assets/icons/Star";
import { usePathname } from 'next/navigation';
import React from 'react';

// Updating IconType to accept all SVGProps for SVGSVGElement
type IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface NavLinkProps {
    href: string;
    icon: any;
    children: React.ReactNode;
}

const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => (
    <li className={`flex items-center p-2 ${usePathname() === href ? 'bg-gray-200 rounded text-gray-900 border' : 'text-gray-600 hover:bg-gray-100'} transition-all duration-200`}>
        <Link href={href} className="flex items-center w-full">
            <div className="h-5 w-5 mr-4">
                {/* Render Icon with SVGProps */}
                <Icon width="24" height="24" />
            </div>
            {children}
        </Link>
    </li>
);

const Sidebar = () => {
    return (
        <div className="w-64 bg-white p-6 shadow-lg rounded-r-lg">
            <div className="w-full">
                <div className="mb-6">
                    <Link href='/'>
                        <Logo />
                    </Link>
                </div>

                <div className="w-full border-b border-gray-300 my-4"></div>

                <nav>
                    <p className="pb-4 font-bold">Vehicle Finder</p>
                    <ul className="">
                        <NavLink href="/home" icon={Search}>Find Vehicle</NavLink>
                        <NavLink href="/favorites" icon={Star}>Favorites</NavLink>
                    </ul>
                </nav>

                <div className="w-full border-b border-gray-300 my-4"></div>

                <nav>
                    <p className="pb-4 font-bold">Company</p>
                    <ul className="">
                        <NavLink href="/login" icon={Home}>Dashboard</NavLink>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
