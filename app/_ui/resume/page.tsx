import SummarySection from "@/app/_ui/resume/sections/summary/page";
import styles from './page.module.sass'
import Header from "@/app/_ui/resume/sections/components/header/page";
import WorkExperiencesSection from "@/app/_ui/resume/sections/work_experiences/page";
import EducationSection from "@/app/_ui/resume/sections/education/page";
import SkillsSection from "@/app/_ui/resume/sections/skills/page";
import LanguagesSection from "@/app/_ui/resume/sections/Languages/page";
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
