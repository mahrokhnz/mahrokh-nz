import styles from "./page.module.sass";
import {LuClipboardList} from "react-icons/lu";
import SectionTitle from "@/app/_ui/resume/sections/components/section_title/page";

function SummarySection() {
  return (
      <section className={styles.sectionWrapper}>
          <SectionTitle text='SUMMARY' icon={LuClipboardList} />
          <p className={styles.description}>
              A Frontend Developer that work from 2021 with a passion for building efficient, user-centric and responsive web
              applications. I focus on creating high-quality, performance-driven solutions. I’m continuously improving
              my skills and exploring new technologies. My main skills are HTML5, CSS3, Javascript, Typescript, Reactjs, Nextjs.
          </p>
      </section>
  );
}

export default SummarySection;
