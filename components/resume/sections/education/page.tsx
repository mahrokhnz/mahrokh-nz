import styles from "./page.module.sass";
import SectionTitle from "@/components/resume/sections/components/section_title/page";
import {FaGraduationCap} from "react-icons/fa6";
import data from "@/data/db.json";
import EducationItem from "@/components/resume/sections/education/components/education_item/page";

function EducationSection() {
    const {resume: {menuItems: {educations}}} = data;

  return (
      <section className={styles.sectionWrapper}>
          <SectionTitle text='EDUCATION' icon={FaGraduationCap} />
          <div className={styles.educationWrapper}>
              {educations.map((education) => (
                  <EducationItem key={education.id} item={education} />
              ))}
          </div>
      </section>
  );
}

export default EducationSection;
