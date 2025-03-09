import styles from "./page.module.sass";
import SectionTitle from "@/app/_ui/resume/sections/components/section_title/page";
import {FaSuitcase} from "react-icons/fa";
import data from "@/data/db.json";
import Experience from "@/app/_ui/resume/sections/work_experiences/components/experience/page";

function WorkExperiencesSection() {
    const {resume: {menuItems: {experiences}}} = data;

  return (
      <section className={styles.sectionWrapper}>
          <SectionTitle text='WORK EXPERIENCE' icon={FaSuitcase} />
         <div className={styles.experiencesWrapper}>
             {experiences.map((experience) => (
                 <Experience key={experience.id} item={experience} />
             ))}
         </div>
      </section>
  );
}

export default WorkExperiencesSection;
