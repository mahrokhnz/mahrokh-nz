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
  return (
      <div className={styles.wrapper}>
          <div className={styles.periodWrapper}>
              <span className={styles.period}>{item.period}</span>
              {item.long && <span className={styles.long}>{item.long}</span>}
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
