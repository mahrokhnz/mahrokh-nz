import SummarySection from "@/components/resume/sections/summary/page";
import styles from './page.module.sass'
import Header from "@/components/resume/sections/components/header/page";
import WorkExperiencesSection from "@/components/resume/sections/work_experiences/page";
import EducationSection from "@/components/resume/sections/education/page";
import SkillsSection from "@/components/resume/sections/skills/page";
import LanguagesSection from "@/components/resume/sections/Languages/page";
import './colors.sass'

function Resume() {
  return (
      <div className={styles.resumeContainer}>
        <div className={styles.resumeWrapper}>
            <Header />
            <SummarySection />
            <WorkExperiencesSection />
        </div>
        <div className={styles.resumeWrapper}>
            <EducationSection />
            <SkillsSection />
            <LanguagesSection />
        </div>
      </div>
  );
}

export default Resume;
