import React from "react";
import { IoMdMailUnread } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div id="contact" className="grid grid-cols-1 w-full max-w-[1200px] mx-auto sm:grid-cols-2 py-12 gap-16 md:gap-24 ">
      <div className="flex-1 px-4 md:px-14">
        <div className="pl-[50px]">
          <div className="text-xl lg:text-3xl font-medium">Contact Me</div>
          <div className="text-sm lg:text-base text-grey-description">
            I am committed to processing the information in order to contact you
            and talk about your project.
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 mt-12">
          <div className="flex gap-5">
            <div>
              <IoMdMailUnread size={24} className="text-green-primary" />
            </div>
            <div className="lg:text-xl text-grey-description">
              wabimantoro@gmail.com
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <FaRegAddressCard size={24} className="text-green-primary" />
            </div>
            <div className="lg:text-xl text-grey-description">
              Tangerang, Indonesia
            </div>
          </div>
          {/* <div className="flex gap-5">
            <div>
              <IoIosPhonePortrait size={24} className="text-green-primary" />
            </div>
            <div className="lg:text-xl text-grey-description">
              +62 812 838 77539
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex flex-1 gap-5 flex-col px-4 lg:px-14 items-center ">
        <Input
          placeholder="Name *"
          required
          className="bg-white border border-black/50 py-6 px-8"
        />
        <Input
          placeholder="Email *"
          required
          className="bg-white border border-black/50 py-6 px-8"
        />
        <Input
          placeholder="Website *"
          required
          className="bg-white border border-black/50 py-6 px-8"
        />
        <Textarea
          placeholder="Message"
          className="bg-white border border-black/50 py-6 px-8"
          rows={5}
        />
        <Button className="bg-green-primary w-fit px-12 py-5">Submit</Button>
      </div>
    </div>
  );
};

export default Contact;
