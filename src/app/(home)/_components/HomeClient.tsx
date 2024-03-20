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
    <>
      <div className="px-0 lg:px-8 sm:px-2 max-w-[1200px] w-full ">
        <HeroSection />
        <Experiences />
        <Portfolio />
        {/* <Articles /> */}
      </div>
      <div className="px-0 lg:px-8 sm:px-2 w-full bg-gradient-to-b from-[#ECB22E]/[.2]  bg-opacity-10	from-10% ">
        <Contact />
      </div>
    </>
  );
};

export default HomeClient;
