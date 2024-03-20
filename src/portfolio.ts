import slugify from "@sindresorhus/slugify";

const portfolioData = [
  {
    title: "Homecare Progressive Web Apps",
    description: `Healthcare service application for user that want a healthcare
      service right to the comfort of their home and booking a clinic
      visit. Developed using NextJs 13, Tailwindcss, Zustand & Graphql
      Apollo.`,
    thumbnail: `/assets/img/portfolio/thumbnail-hc-1.png`,
    images: ["/assets/img/featured/homecare-ss-header.png"],
    slug: slugify("Homecare Progressive Web Apps"),
    link: "https://homecare.dkonsul.com/",
    date: "2023",
    client: "PT Global Urban Esensial",
  },
  {
    title: "Snap Dkonsul",
    description: `Snap Dkonsul is a consultation web application for user that
      need to consult their health issue direct with a specialist
      doctor and can get prescription that required doctor permission.
      Developed using NextJs 11, Tailwindcss, NestJS, Typescript &
      Redux.`,
    thumbnail: `/assets/img/portfolio/thumbnail-dkonsul.png`,
    images: ["/assets/img/portfolio/thumbnail-dkonsul.png"],
    slug: slugify("Snap Dkonsul"),
    link: `https://snap.dkonsul.com/order?
    token=30a8ce0547da106c11ccdb3f42745759e95626cb28eb6349f462710244089a4c49dc8c8813502a541600aa32ceb7beefb3da88c100a0a4e2950759f58f579736806b08b927bad2cbd2fff87ed6684896__4DWCBPd6gnQG1kgH`,
    date: "2022",
    client: "PT Global Urban Esensial",
  },
  {
    title: "Doctor To Doctor",
    description: `Doctor to Doctor (D2D) is a web application for doctor in
      Indonesia to organize a webinar, virtual event and manage their
      Continuing Professional Development (CPD) point that is
      mandatory for doctors who want to work in Indonesia. Developed
      using NextJs 11, Tailwindcss & Redux.`,
    thumbnail: `/assets/img/portfolio/thumbnail-d2d-1.png`,
    images: [
      "/assets/img/featured/d2d-webapp.png",
      "/assets/img/featured/d2d-webapp-2.png",
      "/assets/img/featured/d2d-webapp-3.png",
    ],
    slug: slugify("Doctor To Doctor"),
    link: `https://app.d2d.co.id/id/p2kb`,
    date: "2021",
    client: "PT Global Urban Esensial",
  },
  {
    title: "Educational Web Based Games",
    description: `Develop a web-based educational games for primary school kids,
      education about economy such as saving, accounting and money
      moves. This project mainly focus on games and animation.
      Developed using HTML, CSS, Javascript, jQuery and Laravel.`,
    thumbnail: `/assets/img/portfolio/thumbnail-pji-1.png`,
    images: [
      "/assets/img/featured/pji-1.jpg",
      "/assets/img/featured/pji-2.jpg",
      "/assets/img/featured/pji-3.jpg",
      "/assets/img/featured/pji-4.jpg",
      "/assets/img/featured/pji-5.jpg",
      "/assets/img/featured/pji-6.jpg",
    ],
    slug: slugify("Educational Web Based Games"),
    link: `https://anakcerdas.prestasijunior.org/`,
    date: "2017",
    client: "Prestasi Junior Indonesia",
  },
  {
    title: "E-Procurement Garuda Indonesia",
    description: `E-procurement web application for Garuda Indonesia. Developed to
      facilitate procurement process, from register and filter the
      vendor to participate in procurement that organized by Garuda
      Indonesia. Developed using HTML, CSS, Jquery and Codeigniter.`,
    thumbnail: `/assets/img/portfolio/thumbnail-eproc-1.png`,
    images: ["/assets/img/featured/e-proc.jpg"],
    slug: slugify("E-Procurement Garuda Indonesia"),
    link: "https://eproc.garuda-indonesia.com/auth/login",
    date: "2016",
    client: "Asyst",
  },
];

export default portfolioData;
