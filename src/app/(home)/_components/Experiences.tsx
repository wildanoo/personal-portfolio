import Image from "next/image";
import React from "react";

const Experiences = () => {
  return (
    <div className="py-4">
      <div className="flex flex-col items-center py-3">
        <div className="text-green-primary">EXPERIENCES & SKILLS</div>
        <div className="text-3xl font-medium">
          Experience & Tech That I've Used{" "}
        </div>
      </div>
      <div className="flex justify-evenly mt-10">
        <div className="">
          <div className="relative pl-8 sm:pl-32 py-2 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-green-bold after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold h-6 mb-3 sm:mb-0">
                2021 - Present
              </time>
              <div className="text-xl text-green-bold">
                PT Global Urban Esensial
              </div>
            </div>
            <div className="text-slate-500">Front-end Developer</div>
          </div>

          <div className="relative pl-8 sm:pl-32 py-2 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-green-bold after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold h-6 mb-3 sm:mb-0">
                2018 - 2021
              </time>
              <div className="text-xl text-green-bold">
                PT Meteor Inovasi Digital
              </div>
            </div>
            <div className="text-slate-500">Fullstack Developer</div>
          </div>

          <div className="relative pl-8 sm:pl-32 py-2 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-green-bold after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold h-6 mb-3 sm:mb-0">
                2016 - 2018
              </time>
              <div className="text-xl text-green-bold">
                PT Aiti Prima Indonesia
              </div>
            </div>
            <div className="text-slate-500">Web Developer</div>
          </div>

          <div className="relative pl-8 sm:pl-32 py-2 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-green-bold after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold h-6 mb-3 sm:mb-0">
                2015-2016
              </time>
              <div className="text-xl text-green-bold">PT Minda Perdana</div>
            </div>
            <div className="text-slate-500">PHP Developer</div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-3 gap-x-5 gap-y-10">
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="javascript"
                  src="/assets/img/skills/icon-javascript.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>Javascript</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="typescript"
                  src="/assets/img/skills/icon-typescript.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>Typescript</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="reactjs"
                  src="/assets/img/skills/icon-react.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>ReactJs</div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="nextJs"
                  src="/assets/img/skills/icon-nextjs.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>Next.js</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="nodejs"
                  src="/assets/img/skills/icon-nodejs.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>Node.js</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="expressjs"
                  src="/assets/img/skills/icon-express.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>Express.js</div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="postgresql"
                  src="/assets/img/skills/icon-postgresql.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>PostgreSQL</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="mongodb"
                  src="/assets/img/skills/icon-mongodb.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>MongoDB</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <Image
                  alt="storybook"
                  src="/assets/img/skills/icon-storybook.svg"
                  width={70}
                  height={70}
                  className="max-h-[70px] max-w-[70px]"
                />
              </div>
              <div>Storybook</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
