import SummarySection from "@/app/_ui/resume/sections/summary/page";
import styles from './page.module.sass'
import Header from "@/app/_ui/resume/sections/components/header/page";
import WorkExperiencesSection from "@/app/_ui/resume/sections/work_experiences/page";

function Resume() {
  return (
      <div className={styles.resumeContainer}>
        <div className={styles.resumeWrapper}>
            <Header />
            <SummarySection />
            <WorkExperiencesSection />
        </div>
      </div>
  );
}

export default Resume;
