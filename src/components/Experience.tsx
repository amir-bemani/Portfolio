import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

const EXPERIENCES = [
  {
    title: 'HSE Specialist',
    company: 'Teen Dairy Co. (Damdaran)',
    location: 'Tehran, Iran',
    period: 'Nov 2023 – Sep 2024',
    type: 'Full-Time · Food Production',
    points: [
      'Ensured ISO and 5S compliance across a large-scale food production facility with 200+ staff.',
      'Conducted regular safety audits, risk assessments, and incident investigations.',
      'Led staff training programs on safety protocols and hygiene procedures.',
      'Prepared management reports and KPI dashboards for executive review.',
    ],
  },
  {
    title: 'HSE Engineer',
    company: 'Azarestan Civil Engineering Co.',
    location: 'Tehran, Iran',
    period: 'Aug 2021 – Jul 2022',
    type: 'Full-Time · Construction',
    points: [
      'Monitored occupational safety compliance on high-rise construction sites.',
      'Implemented risk mitigation protocols in coordination with project engineers and site managers.',
      'Performed regular safety inspections and reported findings to senior management.',
    ],
  },
  {
    title: 'HSE Intern — Hospital Environment',
    company: 'Kasra Hospital',
    location: 'Tehran, Iran',
    period: 'Mar 2021 – Jul 2021',
    type: 'Internship · Healthcare',
    points: [
      'Supported implementation of hygiene and safety protocols in a clinical hospital environment.',
      'Assisted in risk assessments, safety inspections and compliance monitoring per healthcare regulations.',
    ],
  },
];

const ExperienceCard = ({ experience }: { experience: typeof EXPERIENCES[0] }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.period}
      iconStyle={{ background: "#383E56" }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="py-28 px-6 md:px-16 bg-[#050505] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-secondary text-[14px] tracking-widest uppercase mb-2">What I have done so far</p>
          <h2 className="text-white font-black md:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] tracking-tightest leading-tight">Work Experience.</h2>
        </motion.div>

        <div className='mt-20 flex flex-col'>
          <VerticalTimeline animate={true} lineColor="rgba(255,255,255,0.05)">
            {EXPERIENCES.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};
