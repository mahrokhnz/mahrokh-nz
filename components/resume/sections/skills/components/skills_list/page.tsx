import styles from "./page.module.sass";

interface SkillsListProps {
    title: string;

    data: Array<{
        id: number;
        title: string;
    }>
}

function SkillsList({title, data}: SkillsListProps) {
  return (
      <div className={styles.wrapper}>
          <h4 className={styles.title}>{title}</h4>
          <ul className={styles.skillsList}>
              {data.map((skill) => (
                  <li className={styles.listItem} key={skill.id}>
                      {skill.title}
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default SkillsList;
