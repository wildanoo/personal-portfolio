import Image from "next/image";
import React from "react";
import Header from "./Header";
import HeroSection from "./Hero";
import Experiences from "./Experiences";
import Portfolio from "./Portfolio";

const HomeClient = () => {
  return (
    <main className="flex flex-col min-h-screen w-full items-center">
      <div className="px-0 lg:px-8 sm:px-2 max-w-[1400px] w-full">
        <Header />
        <HeroSection />
        <Experiences />
        <Portfolio />
      </div>
    </main>
  );
};

export default HomeClient;
