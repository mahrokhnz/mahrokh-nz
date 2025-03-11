import styles from "./page.module.sass";
import SectionTitle from "@/app/_ui/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import {LuPencilOff} from "react-icons/lu";
import SkillsList from "@/app/_ui/resume/sections/skills/components/skills_list/page";

function SkillsSection() {
    const {resume: {menuItems: {skills: {hard, soft}}}} = data;

  return (
      <section className={styles.sectionWrapper}>
          <SectionTitle text='SKILLS' icon={LuPencilOff} />
          <div className={styles.skillsWrapper}>
              <SkillsList title='Hard Skills' data={hard} />
              <SkillsList title='Soft Skills' data={soft} />
          </div>
      </section>
  );
}

export default SkillsSection;
