import Image from "next/image";
import React from "react";
import Header from "./Header";
import HeroSection from "./Hero";
import Experiences from "./Experiences";
import Portfolio from "./Portfolio";
import Articles from "./Articles";
import Contact from "./Contact";
import Footer from "./Footer";

const HomeClient = () => {
  return (
    <main className="flex flex-col min-h-screen w-full items-center">
      <div className="px-0 lg:px-8 sm:px-2 max-w-[1400px] w-full bg-gradient-to-b from-[#ECB22E]/[.2]  bg-opacity-10 from-1% to-5%">
        <Header />
        <HeroSection />
        <Experiences />
        <Portfolio />
        <Articles />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default HomeClient;
