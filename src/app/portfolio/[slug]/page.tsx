import React from "react";
import portfolioData from "@/portfolio";
import { notFound } from "next/navigation";

const PortfolioDetail = ({ params }: { params: { slug: string } }) => {

  const data = portfolioData.find(val => val.slug == params.slug);
  if(!data) notFound();

  return (
    <div>
      <div>{data.title}</div>
    </div>
  );
};

export default PortfolioDetail;
