import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { headers } from "next/headers";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Car Tracker - ColdWheels",
    description:
        "Car Tracker is an dapp built on top of Cartesi Infrastructure",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookie = headers().get("cookie");

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
            {/* <ToastContainer limit={2} /> */}
        </html>
    );
}
