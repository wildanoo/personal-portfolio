import ListCard from "@/components/ListCard";
import { Button } from "@/components/ui/button";
import portfolioData from "@/portfolio";
import Image from "next/image";
import React from "react";
const Portfolio = () => {
  return (
    <div className="py-12 px-5 sm:px-0">
      <div className="flex flex-col items-center py-3">
        <div className="text-green-primary text-sm sm:text-base">PORTFOLIO</div>
        <div className="text-xl lg:text-3xl font-medium">
          Check My Portfolio
        </div>
      </div>
      <div className="pt-10 lg:pt-24 flex flex-col gap-10">
        {portfolioData.map((data, i) => (
          <ListCard
            align={(i + 1) % 2 == 0 ? "left" : "right"}
            key={data.title}
            imgUrl={data.thumbnail}
            title={data.title}
            description={data.description}
            number={
              (i + 1).toString().length == 1
                ? `0${(i + 1).toString()}`
                : (i + 1).toString()
            }
            link={`/portfolio/${data.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
