import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";

const services = [
  {
    title: "Data Science & AI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    title: "Fullstack Engineering",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    title: "Deep Learning",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    title: "Health Tech Solutions",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
];

const ServiceCard = ({ index, title, icon }: { index: number; title: string; icon: string }) => (
  <Tilt className='xs:w-[280px] w-full mx-auto'>
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <SpotlightCard className="bg-tertiary rounded-[20px] py-5 px-10 min-h-[280px] flex justify-center items-center flex-col border-none">
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center mt-4'>
          {title}
        </h3>
      </SpotlightCard>
    </motion.div>
  </Tilt>
);

export const About = () => {
  return (
    <section id="about" className="py-28 px-6 md:px-16 bg-primary relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-secondary text-[14px] tracking-widest uppercase mb-2">Introduction</p>
          <h2 className="text-white font-black md:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] tracking-tightest leading-tight">Overview.</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          I'm a Data Science M.Sc. student at SRH University of Applied Sciences, Fürth/Nürnberg, specializing in Digital Health.
          With a strong background in Occupational Health & Safety, I bridge the gap between complex data analysis and robust engineering.
          I build full-stack applications and ML pipelines using modern tools like React, NestJS, and PyTorch.
        </motion.p>

        <div className='mt-20 flex flex-wrap gap-10'>
          {services.map((service, index) => (
            <div key={service.title} className="service-card">
              <ServiceCard index={index} {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
