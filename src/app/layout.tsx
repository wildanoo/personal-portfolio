import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";
import Header from "./(home)/_components/Header";
import Footer from "./(home)/_components/Footer";

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
      <body className={poppins.className}>
        <main className="flex flex-col min-h-screen w-full items-center bg-gradient-to-b from-[#ECB22E]/[.2]  bg-opacity-10 from-1% to-20%">
          <Header />
          {children}
          <div className="bg-green-primary w-full">
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
