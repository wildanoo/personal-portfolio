import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Weabe",
  description: "Personal Portfolio",
};

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen w-full items-center bg-gradient-to-b from-[#ECB22E]/[.2]  bg-opacity-10 from-1% to-20%">
      <Header />
      {children}
      <div className="bg-green-primary w-full">
        <Footer />
      </div>
    </main>
  );
}
