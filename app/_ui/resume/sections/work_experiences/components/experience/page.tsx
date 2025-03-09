import styles from "./page.module.sass";
import {GoDotFill} from "react-icons/go";

function Experience({item}) {
  return (
      <div className={styles.wrapper}>
          <div className={styles.periodWrapper}>
              <span className={styles.period}>{item.period}</span>
              {item.long && <span className={styles.long}>{item.long}</span>}
          </div>
          <GoDotFill className={styles.icon}/>
          <div className={styles.content}>
                <h4>{item.title}</h4>
                <span>{item.company}</span>
                <p>{item.description}</p>

                <ul className={styles.skillsWrapper}>
                    {item.skills?.map((skill: string, index: number) => (
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
