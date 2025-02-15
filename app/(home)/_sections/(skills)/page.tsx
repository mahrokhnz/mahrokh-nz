"use client"

import styles from "./page.module.sass";
import Container from "@/app/_ui/container/page";
import data from '@/data/db.json'
import {use, useMemo} from "react";

export default function Skills() {
    const {skills} = data;

    console.log(skills.filter((skill) => skill.column === 1))

    const {primary, secondary} = useMemo(() => {
        const first = skills.filter((skill) => skill.column === 1)
        const second = skills.filter((skill) => skill.column === 2)

        return {primary: first, secondary: second}
    }, [skills])

    console.log(primary, secondary)

  return (
          <section className={styles.skills}>
              <Container>
                  <div className={styles.skillsWrapper}>
                      <ul className={styles.warpper}>
                          {
                              primary.map((skill) => (
                                  <li key={skill.id}>{skill.title}</li>
                              ))
                          }
                      </ul>
                      <ul className={styles.warpper}>
                          {
                              secondary.map((skill) => (
                                  <li key={skill.id}>{skill.title}</li>
                              ))
                          }
                      </ul>
                  </div>
              </Container>
          </section>
  );
}
