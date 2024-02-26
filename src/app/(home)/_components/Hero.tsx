import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { GoDownload } from "react-icons/go";

const HeroSection = () => {
  return (
    <div className="flex py-12">
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="text-primary">Hello, I am</div>
        <div className="semibold-64">Wildan Aryo B</div>
        <div className="text-green-bold">Fullstack Web Developer</div>
        <div className="text-grey-description">
          I’m a highly motivated developer with over 8 years professional
          experience. With a passion of creating seamless web application. I am
          also eager to learn new technology.
        </div>
        <div className="flex gap-5 mt-4">
          <Button>Contact Me</Button>
          <div className="flex gap-5 items-center cursor-pointer">
            <div className="font-semibold">Download CV</div>
            <div>
              <GoDownload size={24} className="text-green-primary" />
            </div>
          </div>
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
