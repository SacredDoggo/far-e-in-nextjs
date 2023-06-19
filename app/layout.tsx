import "./globals.css";
import { Inter } from "next/font/google";

import Link from "next/link";
import { FaGithub } from 'react-icons/fa';

import { logo } from "@/assets";


const inter = Inter({ subsets: ["latin"], style: ["normal"], weight: ["400"] });

export const metadata = {
  title: "Far-E",
  description: "0111",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={inter.className}>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link href="/">
          <img src={logo.src} alt="logo" className="w-28 object-contain" />
        </Link>

        <a className="font-inter font-medium bg-[#000000] text-white px-6 py-3 rounded-md" target="_blank" href="https://github.com/SacredDoggo/far-e-in-nextjs" rel="noopener noreferrer">
          <FaGithub />
        </a>

        <Link
          href="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
        {children}
        </body>
    </html>
  );
}
