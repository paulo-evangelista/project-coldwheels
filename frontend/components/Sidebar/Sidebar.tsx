import Link from "next/link";
import Logo from "../../assets/icons/Logo";
import Home from "../../assets/icons/Home";
import { Search } from "lucide-react";
import Star from "../../assets/icons/Star";
import { usePathname } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Updating IconType to accept all SVGProps for SVGSVGElement
type IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface NavLinkProps {
	href: string;
	icon: any;
	children: React.ReactNode;
}

const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => (
	<li
		className={`flex items-center p-2 ${
			usePathname() === href
				? "bg-gray-200 rounded-xl text-gray-900 border"
				: "text-gray-600 hover:bg-gray-100 rouded-xl"
		} transition-all duration-200`}
	>
		<Link href={href} className="flex items-center w-full">
			<div className="mr-2">
				<Icon width="20" height="20" />
			</div>
			{children}
		</Link>
	</li>
);

const Sidebar = () => {
	const { address: wallet, isConnected } = useAccount();
	const getWallet = async () => {
		var accountCreatedStatus = false;
		const response = await axios
			.post("http://localhost:8080/inspect", {
				kind: "company",
				payload: { wallet },
			})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error("error is ", error);
				return error;
			});

		if (response.data.status === "Accepted") {
			accountCreatedStatus = true;
		} else {
			accountCreatedStatus = false;
		}

		return accountCreatedStatus;
	};

	return (
		<div className="w-64 bg-white p-6 shadow-lg rounded-xl mb-8 h-full">
			<div className="w-full h-full">
				<div className="mb-6 flex-items-center">
					<Link href="/">
						<Logo />
					</Link>
				</div>

				<div className="w-full border-b border-gray-300 my-4"></div>

				<div className="w-full mt-auto flex flex-col justify-center items-center">
					<ConnectButton
						chainStatus={"icon"}
						accountStatus={"avatar"}
						showBalance={false}
					/>
				</div>

				<div className="w-full border-b border-gray-300 my-4"></div>

				<nav>
					<p className="pb-4 font-bold">Vehicle Finder</p>
					<ul className="">
						<NavLink href="/home" icon={Search}>
							Find Vehicle
						</NavLink>
						<NavLink href="/favorites" icon={Star}>
							Favorites
						</NavLink>
					</ul>
				</nav>

				<div className="flex flex-col justify-between">
					<div className="w-full border-b border-gray-300 my-4"></div>

					<nav>
						<p className="pb-4 font-bold">Company</p>
						<ul className="">
							<NavLink href="/dashboard" icon={Home}>
								Dashboard
							</NavLink>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
