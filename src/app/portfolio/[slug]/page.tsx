import React from "react";
import portfolioData from "@/portfolio";
import { notFound } from "next/navigation";
import ImgSlider from "@/app/_components/ImgSlider";
import { Button } from "@/components/ui/button";

const PortfolioDetail = ({ params }: { params: { slug: string } }) => {
  const data = portfolioData.find((val) => val.slug == params.slug);
  if (!data) notFound();

  return (
    <div className="max-w-[1200px] flex flex-col gap-4 justify-center items-center my-5">
      <div className="text-xl my-10 lg:text-3xl font-medium">{data.title}</div>
      <div className="w-[600px] h-[300px] flex justify-center">
        <ImgSlider imgListUrl={data.images} delay={3000} />
      </div>
      <div className="px-10 m-10 text-grey-description text-sm lg:text-base">
        {data.description}
      </div>
      <div>
        <a href="https://homecare.dkonsul.com/">
          <Button>Live link</Button>
        </a>
      </div>
    </div>
  );
};

export default PortfolioDetail;
