"use client"

import styles from "./page.module.sass";
import data from '@/data/db.json'
import {useMemo} from "react";
import { useInView } from 'react-intersection-observer';
import SkillsList from "@/app/(home)/_sections/(skills)/components/skills_lists/components/skill_list/page";
import {skillType} from "@/app/(home)/_sections/(skills)/type";

function SkillsLists() {
    const [ref, inView] = useInView({triggerOnce: true})
    const {skills} = data;

    const { primary, secondary } = useMemo(() => {
        const first = skills.filter((skill) => skill.column === 1);
        const second = skills.filter((skill) => skill.column === 2);

        return { primary: first as skillType[], secondary: second as skillType[] };
    }, [skills]);

  return (
      <div className={styles.skillsWrapper} ref={ref}>
          <SkillsList data={primary} inView={inView}/>
          <SkillsList data={secondary} inView={inView}/>
      </div>
  );
}

export default SkillsLists;
