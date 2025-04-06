import styles from "./page.module.sass";

interface EducationItemProps {
    item: {
        id: number;
        university: string;
        degree: string;
        period: string;
        moreInfo: string;
    }
}

function EducationItem({item}: EducationItemProps) {
  return (
      <div className={styles.educationItem}>
          <h4 className={styles.title}>{item.degree}</h4>
          <span className={styles.info}>{item.university}</span>
          <p className={styles.moreInfo}>
              {item.moreInfo}</p>
          <span className={styles.period}>{item.period}</span>
      </div>
  );
}

export default EducationItem;
