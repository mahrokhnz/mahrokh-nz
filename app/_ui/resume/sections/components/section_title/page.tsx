import styles from "./page.module.sass";
import {IconType} from "react-icons";

interface ISectionTitleProps {
  text: string;
  icon: IconType;
}

function SectionTitle({text, icon: Icon}: ISectionTitleProps) {
  return (
      <div className={styles.sectionTitle}>
          <Icon className={styles.icon} />
        <h3 className={styles.title}>{text}</h3>
        <div className={styles.horizontalLine}></div>
      </div>
  );
}

export default SectionTitle;
