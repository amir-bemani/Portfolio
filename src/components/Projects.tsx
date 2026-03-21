import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";

const PROJECTS = [
  {
    name: "Heart Disease Prediction",
    description:
      "Evaluated Logistic Regression, KNN, SVM & Random Forest models on UCI Heart Disease data. Achieved >80% accuracy and best model ROC-AUC: 0.908 (Random Forest).",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "scikit-learn", color: "green-text-gradient" },
      { name: "pytorch", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/ladunjexa/reactjs18-3d-portfolio/main/.github/README_ASSETS/3d-portfolio.png", // Placeholder
    source_code_link: "https://github.com/",
  },
  {
    name: "Dönerhaus Nürnberg",
    description:
      "Complete restaurant web platform: marketing site, digital loyalty club with QR membership cards, admin panel, and seller dashboard.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "supabase", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/ladunjexa/reactjs18-3d-portfolio/main/.github/README_ASSETS/3d-portfolio.png", // Placeholder
    source_code_link: "https://github.com/",
  },
  {
    name: "Persia Market",
    description:
      "Multi-platform marketplace with separate admin, seller, buyer & courier interfaces. Real-time inventory, payment tracking.",
    tags: [
      { name: "nestjs", color: "blue-text-gradient" },
      { name: "nextjs", color: "green-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
    ],
    image: "https://raw.githubusercontent.com/ladunjexa/reactjs18-3d-portfolio/main/.github/README_ASSETS/3d-portfolio.png", // Placeholder
    source_code_link: "https://github.com/",
  },
];

interface ProjectTag {
  name: string;
  color: string;
}

interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link: string;
}

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Tilt className='sm:w-[360px] w-full'>
        <SpotlightCard className='bg-tertiary p-5 rounded-2xl w-full border-none'>
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <span className="text-white text-[10px] font-bold">GH</span>
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
        </SpotlightCard>
      </Tilt>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-28 px-6 md:px-16 bg-primary relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-secondary text-[14px] tracking-widest uppercase mb-2">My work</p>
          <h2 className="text-white font-black md:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] tracking-tightest leading-tight">Projects.</h2>
        </motion.div>

        <div className='w-full flex'>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
            Following projects showcases my skills and experience through
            real-world examples of my work. Each project is briefly described with
            links to code repositories and live demos in it. It reflects my
            ability to solve complex problems, work with different technologies,
            and manage projects effectively.
          </motion.p>
        </div>

        <div className='mt-20 flex flex-wrap gap-7'>
          {PROJECTS.map((project, index) => (
            <div key={`project-${index}`} className="project-card-gsap">
              <ProjectCard index={index} {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
