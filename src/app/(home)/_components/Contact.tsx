import React from "react";
import { IoMdMailUnread } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="flex py-12 bg-gradient-to-b from-[#ECB22E]/[.2]  bg-opacity-10	gap-24 from-10%">
      <div className="flex-1 px-14">
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
            <div className="text-xl text-grey-description">
              wabimantoro@gmail.com
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <FaRegAddressCard size={28} className="text-green-primary" />
            </div>
            <div className="text-xl text-grey-description">
              Tangerang, Indonesia
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <IoIosPhonePortrait size={28} className="text-green-primary" />
            </div>
            <div className="text-xl text-grey-description">
              +62 812 838 77539
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 gap-5 flex-col px-14">
        <Input placeholder="Name *" required  className="bg-white border border-black/50 py-6 px-8" />
        <Input placeholder="Email *" required className="bg-white border border-black/50 py-6 px-8"/>
        <Input placeholder="Website *" required className="bg-white border border-black/50 py-6 px-8"/>
        <Textarea placeholder="Message" className="bg-white border border-black/50 py-6 px-8" rows={5}/>
        <Button className="bg-green-primary w-fit px-12 py-5" >Submit</Button>
      </div>
    </div>
  );
};

export default Contact;
