"use client"

import styles from "./page.module.sass";
import Container from "@/app/_ui/container/page";
import data from '@/data/db.json'
import {useMemo} from "react";
import { useInView } from 'react-intersection-observer';
import SkillsList from "@/app/(home)/_sections/(skills)/components/skill_list/page";
import SectionTitle from "@/app/_ui/section_title/page";

export default function Skills() {
    const [ref, inView] = useInView({triggerOnce: true})
    const {skills} = data;

    const {primary, secondary} = useMemo(() => {
        const first = skills.filter((skill) => skill.column === 1)
        const second = skills.filter((skill) => skill.column === 2)

        return {primary: first, secondary: second}
    }, [skills])

  return (
          <section className={styles.skills}>
              <Container className={styles.skillsContainer}>
                  <SectionTitle text='Skills' />
                  <div className={styles.skillsWrapper} ref={ref}>
                      <SkillsList data={primary} inView={inView}/>
                      <SkillsList data={secondary} inView={inView}/>
                  </div>
              </Container>
          </section>
  );
}
