import "./globals.css";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
