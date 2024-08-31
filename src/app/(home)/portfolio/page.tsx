import React from "react";
import portfolioData from "@/portfolio";
import ListCard from "@/components/ListCard";

const PortfolioList = () => {
  return (
    <div className="max-w-[1200px]">
      <div className="py-12 px-5 sm:px-0">
        <div className="flex flex-col items-center py-3">
          <div className="text-green-primary text-sm sm:text-base">
            PORTFOLIO
          </div>
          <div className="text-xl lg:text-3xl font-medium">
            Check My Portfolio
          </div>
        </div>
        <div className="pt-10 md:px-10 lg:pt-24 flex flex-col gap-10">
          {portfolioData.map((data, i) => (
            <ListCard
              align={'left'}
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
    </div>
  );
};

export default PortfolioList;
