import React from "react";
import { IoMdMailUnread } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";

const Contact = () => {
  return (
    <div className="flex py-12">
      <div className="flex-1">
        <div className="pl-[50px]">
          <div className="text-3xl font-medium">Contact Me</div>
          <div className="text-grey-description">
            I am committed to processing the information in order to contact you
            and talk about your project.
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-12">
          <div className="flex gap-5">
            <div>
              <IoMdMailUnread size={28} className="text-green-primary" />
            </div>
            <div className="text-2xl text-grey-description">
              wabimantoro@gmail.com
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <FaRegAddressCard size={28} className="text-green-primary" />
            </div>
            <div className="text-2xl text-grey-description">
              Tangerang, Indonesia
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <IoIosPhonePortrait size={28} className="text-green-primary" />
            </div>
            <div className="text-2xl text-grey-description">
              +62 812 838 77539
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Contact;
