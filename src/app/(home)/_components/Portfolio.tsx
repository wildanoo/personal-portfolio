import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
const data = [
  {
    number: "01",
    image: "/assets/img/portfolio/thumbnail-hc-1.png",
    altImg: "homecare-img",
    title: "Homecare Progressive Web Apps",
    description: `Healthcare service application for user that want a healthcare
    service right to the comfort of their home and booking a clinic
    visit. Developed using NextJs 13, Tailwindcss, Zustand & Graphql
    Apollo.`,
    link: "",
  },
  {
    number: "02",
    image: "/assets/img/portfolio/thumbnail-dkonsul.png",
    altImg: "dkonsul-img",
    title: "Snap Dkonsul",
    description: `Snap Dkonsul is a consultation web application for user that
    need to consult their health issue direct with a specialist
    doctor and can get prescription that required doctor permission.
    Developed using NextJs 11, Tailwindcss, NestJS, Typescript &
    Redux.`,
    link: "",
  },
  {
    number: "03",
    img: "/assets/img/portfolio/thumbnail-d2d-1.png",
    altImg: "D2D-img",
    title: "Doctor To Doctor",
    description: `Doctor to Doctor (D2D) is a web application for doctor in
    Indonesia to organize a webinar, virtual event and manage their
    Continuing Professional Development (CPD) point that is
    mandatory for doctors who want to work in Indonesia. Developed
    using NextJs 11, Tailwindcss & Redux.`,
    link: "",
  },
  {
    number: "04",
    img: "/assets/img/portfolio/thumbnail-pji-1.png",
    altImg: "PJI-img",
    title: "Educational Web Based Games",
    description: `Develop a web-based educational games for primary school kids,
    education about economy such as saving, accounting and money
    moves. This project mainly focus on games and animation.
    Developed using HTML, CSS, Javascript, jQuery and Laravel.`,
    link: "",
  },
  {
    number: "05",
    img: "/assets/img/portfolio/thumbnail-eproc-1.png",
    altImg: "Eproc-img",
    title: "E-Procurement Garuda Indonesia",
    description: `E-procurement web application for Garuda Indonesia. Developed to
    facilitate procurement process, from register and filter the
    vendor to participate in procurement that organized by Garuda
    Indonesia. Developed using HTML, CSS, Jquery and Codeigniter.`,
    link: "",
  },
];
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
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex-1 flex justify-center">
            <Image
              alt="homecare-img"
              src="/assets/img/portfolio/thumbnail-hc-1.png"
              width={550}
              height={410}
            />
          </div>
          <div className="flex flex-col flex-1 gap-5 justify-center sm:px-10">
            <div className="text-2xl sm:text-3xl text-green-primary">01</div>
            <div className="flex-col flex gap-3">
              <div className="text-xl sm:text-2xl">Homecare Progressive Web Apps</div>
              <div className="text-sm lg:text-base text-grey-description">
                Healthcare service application for user that want a healthcare
                service right to the comfort of their home and booking a clinic
                visit. Developed using NextJs 13, Tailwindcss, Zustand & Graphql
                Apollo.
              </div>
            </div>
            <Button
              variant="outline"
              className="text-green-primary border-green-primary w-fit px-12 py-3"
            >
              Details
            </Button>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row">
          <div className="flex flex-col flex-1 gap-5 justify-center sm:px-10">
            <div className="text-2xl sm:text-3xl text-green-primary">02</div>
            <div className="flex-col flex gap-3">
              <div className="text-xl sm:text-2xl">Snap Dkonsul</div>
              <div className="text-sm lg:text-base text-grey-description">
                Snap Dkonsul is a consultation web application for user that
                need to consult their health issue direct with a specialist
                doctor and can get prescription that required doctor permission.
                Developed using NextJs 11, Tailwindcss, NestJS, Typescript &
                Redux.
              </div>
            </div>
            <Button
              variant="outline"
              className="text-green-primary border-green-primary w-fit px-12 py-3"
            >
              Details
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              alt="javascript"
              src="/assets/img/portfolio/thumbnail-dkonsul.png"
              width={550}
              height={410}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex-1 flex justify-center">
            <Image
              alt="javascript"
              src="/assets/img/portfolio/thumbnail-d2d-1.png"
              width={550}
              height={410}
            />
          </div>
          <div className="flex flex-col flex-1 gap-5 justify-center sm:px-10">
            <div className="text-2xl sm:text-3xl text-green-primary">03</div>
            <div className="flex-col flex gap-3">
              <div className="text-xl sm:text-2xl">Doctor To Doctor</div>
              <div className="text-sm lg:text-base text-grey-description">
                Doctor to Doctor (D2D) is a web application for doctor in
                Indonesia to organize a webinar, virtual event and manage their
                Continuing Professional Development (CPD) point that is
                mandatory for doctors who want to work in Indonesia. Developed
                using NextJs 11, Tailwindcss & Redux.
              </div>
            </div>
            <Button
              variant="outline"
              className="text-green-primary border-green-primary w-fit px-12 py-3"
            >
              Details
            </Button>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row">
          <div className="flex flex-col flex-1 gap-5 justify-center sm:px-10">
            <div className="text-2xl sm:text-3xl text-green-primary">04</div>
            <div className="flex-col flex gap-3">
              <div className="text-xl sm:text-2xl">Educational Web Based Games</div>
              <div className="text-sm lg:text-base text-grey-description">
                Develop a web-based educational games for primary school kids,
                education about economy such as saving, accounting and money
                moves. This project mainly focus on games and animation.
                Developed using HTML, CSS, Javascript, jQuery and Laravel.
              </div>
            </div>
            <Button
              variant="outline"
              className="text-green-primary border-green-primary w-fit px-12 py-3"
            >
              Details
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              alt="javascript"
              src="/assets/img/portfolio/thumbnail-pji-1.png"
              width={550}
              height={410}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex-1 flex justify-center">
            <Image
              alt="javascript"
              src="/assets/img/portfolio/thumbnail-eproc-1.png"
              width={550}
              height={410}
            />
          </div>
          <div className="flex flex-col flex-1 gap-5 justify-center sm:px-10">
            <div className="text-2xl sm:text-3xl text-green-primary">05</div>
            <div className="flex-col flex gap-3">
              <div className="text-xl sm:text-2xl">E-Procurement Garuda Indonesia</div>
              <div className="text-sm lg:text-base text-grey-description">
                E-procurement web application for Garuda Indonesia. Developed to
                facilitate procurement process, from register and filter the
                vendor to participate in procurement that organized by Garuda
                Indonesia. Developed using HTML, CSS, Jquery and Codeigniter.
              </div>
            </div>
            <Button
              variant="outline"
              className="text-green-primary border-green-primary w-fit px-12 py-3"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
