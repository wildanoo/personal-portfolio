import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoDownload } from "react-icons/go";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:py-12">
      <div className="flex-1 flex flex-col justify-center gap-2 text-center px-5 sm:text-left">
        <div className="text-primary">Hello, I am</div>
        <div className="semibold-36 sm:semibold-36 lg:semibold-54 xl:semibold-64">
          Wildan Aryo B
        </div>
        <div className="text-green-bold text-2xl sm:text-xl">
          Fullstack Web Developer
        </div>
        <div className="text-grey-description text-sm lg:text-base">
          I’m a highly motivated developer with over 8 years professional
          experience. With a passion of creating seamless web application. I am
          also eager to learn new technology.
        </div>
        <div className="flex gap-5 mt-4 justify-center sm:justify-start">
          <Link
            href={"/#contact"}
            className="text-black rounded-md px-3 py-2 text-sm font-medium"
          >
            <Button>Contact Me</Button>
          </Link>
          <a
            className="flex gap-5 items-center cursor-pointer"
            href="https://drive.google.com/file/d/167Y_RKDrxjHO9pvPeTRlubVGFVDf6lGQ/view?usp=drive_link"
            download="WildanResume"
          >
            <div className="font-semibold text-sm lg:text-base">
              Download CV
            </div>
            <div>
              <GoDownload size={24} className="text-green-primary" />
            </div>
          </a>
        </div>
      </div>
      <div className="flex flex-1 justify-end">
        <Image
          src="/assets/img/hero-img.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default HeroSection;
