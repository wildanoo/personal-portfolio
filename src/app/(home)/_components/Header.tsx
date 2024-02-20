"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [isExpand, setExpand] = useState(false);
  return (
    <header className="sticky top-0  bg-white/[.80]">
      <nav className="">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-between sm:items-stretch ">
              <div className="flex flex-shrink-0 items-center text-3xl font-medium">
                WEABE
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className=" text-black rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    ABOUT ME
                  </a>
                  <a
                    href="#"
                    className="text-black rounded-md px-3 py-2 text-sm font-medium"
                  >
                    EXPERIENCES
                  </a>
                  <a
                    href="#"
                    className="text-black rounded-md px-3 py-2 text-sm font-medium"
                  >
                    PORTFOLIO
                  </a>
                  <a
                    href="#"
                    className="text-black rounded-md px-3 py-2 text-sm font-medium"
                  >
                    ARTICLES
                  </a>
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
          className={`sm:hidden w-[40%] absolute right-0 bg-gray-400 rounded-lg ${
            isExpand ? "block" : "hidden"
          }`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              ABOUT ME
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              EXPERIENCES
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              PORTFOLIO
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              ARTICLES
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              <Button>Contact Me</Button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
