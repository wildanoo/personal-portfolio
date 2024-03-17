import slugify from '@sindresorhus/slugify';

const portfolioData = [
   {
      title: "Homecare Progressive Web Apps",
      description: `Healthcare service application for user that want a healthcare
      service right to the comfort of their home and booking a clinic
      visit. Developed using NextJs 13, Tailwindcss, Zustand & Graphql
      Apollo.`,
      thumbnail: `/assets/img/portfolio/thumbnail-hc-1.png`,
      slug: slugify("Homecare Progressive Web Apps"),
   },
   {
      title: "Snap Dkonsul",
      description: `Snap Dkonsul is a consultation web application for user that
      need to consult their health issue direct with a specialist
      doctor and can get prescription that required doctor permission.
      Developed using NextJs 11, Tailwindcss, NestJS, Typescript &
      Redux.`,
      thumbnail: `/assets/img/portfolio/thumbnail-dkonsul.png`,
      slug: slugify("Snap Dkonsul"),
   },
   {
      title: "Doctor To Doctor",
      description: `Doctor to Doctor (D2D) is a web application for doctor in
      Indonesia to organize a webinar, virtual event and manage their
      Continuing Professional Development (CPD) point that is
      mandatory for doctors who want to work in Indonesia. Developed
      using NextJs 11, Tailwindcss & Redux.`,
      thumbnail: `/assets/img/portfolio/thumbnail-d2d-1.png`,
      slug: slugify("Doctor To Doctor"),
   },
   {
      title: "Educational Web Based Games",
      description: `Develop a web-based educational games for primary school kids,
      education about economy such as saving, accounting and money
      moves. This project mainly focus on games and animation.
      Developed using HTML, CSS, Javascript, jQuery and Laravel.`,
      thumbnail: `/assets/img/portfolio/thumbnail-pji-1.png`,
      slug: slugify("Educational Web Based Games"),
   },
   {
      title: "E-Procurement Garuda Indonesia",
      description: `E-procurement web application for Garuda Indonesia. Developed to
      facilitate procurement process, from register and filter the
      vendor to participate in procurement that organized by Garuda
      Indonesia. Developed using HTML, CSS, Jquery and Codeigniter.`,
      thumbnail: `/assets/img/portfolio/thumbnail-eproc-1.png`,
      slug: slugify("E-Procurement Garuda Indonesia"),
   }
]

export default portfolioData;