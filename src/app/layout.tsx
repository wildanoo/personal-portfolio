import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";

export const metadata: Metadata = {
  title: "Weabe",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
