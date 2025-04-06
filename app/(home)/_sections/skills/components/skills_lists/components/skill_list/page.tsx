import styles from "./page.module.sass";
import Circle from "@/components/circle/page";
import {SkillType} from "@/app/(home)/_sections/skills/type";

interface SkillsListProps {
    data: SkillType[];
    inView: boolean;
}

function SkillsList({data, inView}: SkillsListProps) {
  return (
      <ul className={styles.listWrapper}>
          {
              data.map((skill) => {
                  return (
                      (
                          <li key={skill.id}>
                              <h3 className={styles.title}>{skill.title}</h3>
                              <div className={styles.circles}>
                                  {[...Array(10)].map((_, index) => (
                                      <Circle key={index} filled={inView && index < skill.count} delay={index * 0.1}/>
                                  ))}
                              </div>
                          </li>
                      )
                  )
              })
          }
      </ul>
  );
}

export default SkillsList;
