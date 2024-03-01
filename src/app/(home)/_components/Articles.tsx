import Image from "next/image";
import React from "react";

const Articles = () => {
  return (
    <div className="py-12">
      <div className="flex flex-col items-center py-3">
        <div className="text-green-primary">ARTICLES</div>
        <div className="text-3xl font-medium">My Personal Thoughts</div>
      </div>
      <div>
        <div className="text-sm text-green-primary cursor-pointer flex justify-end">
          Explore All Articles
        </div>
        <div className="flex justify-center gap-5">
          <div className="flex flex-col gap-2.5 px-2.5 justify-center text-center">
            <div className="flex justify-center">
              <Image
                alt="article-3"
                src="/assets/img/articles/Article-3.png"
                width={350}
                height={335}
              />
            </div>
            <div className="text-xl font-medium">Landing Page Design</div>
            <div className="text-sm text-grey-description">
              {`is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s`}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-2.5 justify-center text-center">
            <div className="flex justify-center">
              <Image
                alt="article-2"
                src="/assets/img/articles/Article-2.png"
                width={350}
                height={335}
              />
            </div>
            <div className="text-xl font-medium">Mobile App Design</div>
            <div className="text-sm text-grey-description">
              {`is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s`}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-2.5 justify-center text-center">
            <div className="flex justify-center">
              <Image
                alt="article-1"
                src="/assets/img/articles/Article-1.png"
                width={350}
                height={335}
              />
            </div>
            <div className="text-xl font-medium">Branding</div>
            <div className="text-sm text-grey-description">
              {`is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
