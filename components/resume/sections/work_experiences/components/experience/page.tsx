import styles from "./page.module.sass";
import {GoDotFill} from "react-icons/go";

interface ExperienceProps {
    item: {
        id: number;
        startDate: string;
        endDate: string;
        title: string;
        company: string;
        description: string;
        skills?: string[]
    }
}

function Experience({item}: ExperienceProps) {
    function getDurationString(startDate: string, endDate?: string): string {
        const start = new Date(startDate);
        const end = endDate && endDate !== "" ? new Date(endDate) : new Date();

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        const yearStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
        const monthStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : '';

        if (yearStr && monthStr) return `${yearStr} and ${monthStr}`;
        if (yearStr) return yearStr;
        if (monthStr) return monthStr;
        return 'Less than a month';
    }


    return (
      <div className={styles.wrapper}>
          <div className={styles.periodWrapper}>
              <span className={styles.period}>{new Date(item.startDate).getFullYear()} - {item.endDate ? new Date(item.endDate).getFullYear() : new Date().getFullYear()}</span>
              <span className={styles.long}>{getDurationString(item.startDate, item.endDate)}</span>
          </div>
          <GoDotFill className={styles.icon}/>
          <div className={styles.content}>
                <h4 className={styles.title}>{item.title}</h4>
                <span className={styles.companyName}>{item.company}</span>
              {item.description && (
                  <p className={styles.workDescription}>{item.description}</p>
              )}

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
