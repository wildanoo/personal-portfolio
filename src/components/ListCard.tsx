import Image from "next/image";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ListCard = {
  imgUrl: string;
  title: string;
  description: string;
  number: string;
  link: string;
  align?: "left" | "right";
};

const ListCard: FC<ListCard> = ({
  imgUrl,
  description,
  title,
  number,
  link,
  align = "left",
}) => {
  return (
    <div>
      <div
        className={`flex flex-col gap-5 ${
          align == "left" ? "sm:flex-row" : "sm:flex-row-reverse"
        }`}
      >
        <div className="flex-1 flex justify-center">
          <Image alt="homecare-img" src={imgUrl} width={550} height={410} />
        </div>
        <div className="flex flex-col flex-1 gap-5 justify-center sm:px-10">
          <div className="text-2xl sm:text-3xl text-green-primary">
            {number}
          </div>
          <div className="flex-col flex gap-3">
            <div className="text-xl sm:text-2xl">{title}</div>
            <div className="text-sm lg:text-base text-grey-description">
              {description}
            </div>
          </div>
          <Link href={link}>
            <Button
              variant="outline"
              className="text-green-primary border-green-primary w-fit px-12 py-3"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
