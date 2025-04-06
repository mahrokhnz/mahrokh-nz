import styles from "./page.module.sass";
import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import Experience from "@/components/resume/sections/work_experiences/components/experience/page";
import {RiSuitcaseLine} from "react-icons/ri";

function WorkExperiencesSection() {
    const {resume: {menuItems: {experiences}}} = data;

  return (
      <section className={styles.sectionWrapper}>
          <SectionTitle text='WORK EXPERIENCE' icon={RiSuitcaseLine} />
         <div className={styles.experiencesWrapper}>
             {experiences.map((experience) => (
                 <Experience key={experience.id} item={experience} />
             ))}
         </div>
      </section>
  );
}

export default WorkExperiencesSection;
