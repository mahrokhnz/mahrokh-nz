import styles from "./page.module.sass";
import {GoDotFill} from "react-icons/go";

interface ExperienceProps {
    item: {
        id: number;
        period: string;
        long?: string;
        title: string;
        company: string;
        description: string;
        skills?: string[]

    }
}

function Experience({item}: ExperienceProps) {
    function getDurationString(startDateStr: string, endDate: Date = new Date()): string {
        const startDate = new Date(startDateStr);
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        const yearPart = years > 0 ? `${years} ${years === 1 ? "yr" : "yrs"}` : "";
        const monthPart = months > 0 ? `${months} mos` : "";

        return [yearPart, monthPart].filter(Boolean).join(" and ");
    }

  return (
      <div className={styles.wrapper}>
          <div className={styles.periodWrapper}>
              <span className={styles.period}>{item.period}</span>
              <span className={styles.long}>{item.long ? item.long : getDurationString("2025-05-22")}</span>
          </div>
          <GoDotFill className={styles.icon}/>
          <div className={styles.content}>
                <h4 className={styles.title}>{item.title}</h4>
                <span className={styles.companyName}>{item.company}</span>
                <p className={styles.workDescription}>{item.description}</p>

                <ul className={styles.skillsWrapper}>
                    {item.skills && item.skills?.length > 0 && item.skills.map((skill: string, index: number) => (
                        <li key={`Skill-${index + 1}`} className={styles.skill}>
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
      </div>
  );
}

export default Experience;
