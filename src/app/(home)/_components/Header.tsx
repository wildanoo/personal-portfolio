"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { robotoCondensed } from "@/app/fonts";
import Link from "next/link";

const Header = () => {
  const [isExpand, setExpand] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-[999] ${
        scrolled ? "bg-white/[.8] backdrop-blur-sm" : ""
      } ease-in-out duration-300`}
    >
      <nav className="w-full max-w-[1200px] mx-auto">
        <div className="mx-auto max-w-7xl px-5 sm:px-4 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-between sm:items-stretch ">
              <div
                className={`flex flex-shrink-0 items-center text-2xl font-medium ${robotoCondensed.className}`}
              >
                <Link href={"/"}>WEABE</Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href={"/"}
                    className=" text-black rounded-md px-3 py-2 text-sm font-medium"
                  >
                    ABOUT ME
                  </Link>
                  <Link
                    href={"/#experience"}
                    className=" text-black rounded-md px-3 py-2 text-sm font-medium"
                  >
                    EXPERIENCES
                  </Link>
                  <Link
                    href={"/portfolio"}
                    className="text-black rounded-md px-3 py-2 text-sm font-medium"
                  >
                    PORTFOLIO
                  </Link>
                  <Link
                    href={"/article"}
                    className="text-black rounded-md px-3 py-2 text-sm font-medium"
                  >
                    ARTICLES
                  </Link>
                </div>
              </div>
              <div className="hidden sm:flex absolute inset-y-0 right-0  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Button>Contact Me</Button>
              </div>
              <div
                className="sm:hidden cursor-pointer"
                onClick={() => setExpand(!isExpand)}
              >
                {isExpand ? (
                  <IoMdClose size={30} />
                ) : (
                  <GiHamburgerMenu size={26} />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div
          className={`sm:hidden w-[40%] absolute right-0 bg-white shadow-lg rounded-lg ${
            isExpand ? "block" : "hidden"
          }`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href={"/"}
              className="bg-primary text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              ABOUT ME
            </Link>
            <Link
              href={"/#experience"}
              className="text-black hover:bg-gray-500 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              EXPERIENCES
            </Link>
            <Link
              href={"/portfolio"}
              className="text-black hover:bg-gray-500 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              PORTFOLIO
            </Link>
            <Link
              href={"/article"}
              className="text-black hover:bg-gray-500 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              ARTICLES
            </Link>
            <Link
              href={"/"}
              className="text-black hover:bg-gray-500 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              <Button>Contact Me</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
