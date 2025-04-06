import styles from "./page.module.sass";
import SectionTitle from "@/components/resume/sections/components/section_title/page";
import data from "@/data/db.json";
import Language from "@/components/resume/sections/Languages/components/language/page";
import {FaLanguage} from "react-icons/fa6";

function LanguagesSection() {
    const {resume: {menuItems: {languages}}} = data;

  return (
      <section className={styles.sectionWrapper}>
          <SectionTitle text='LANGUAGES' icon={FaLanguage} />
          <div className={styles.languagesWrapper}>
              {languages.map((language) => (
                  <Language key={language.id} item={language} />
              ))}
          </div>
      </section>
  );
}

export default LanguagesSection;
