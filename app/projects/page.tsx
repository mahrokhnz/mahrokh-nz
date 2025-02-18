"use client"

import styles from "./page.module.sass";
import Container from "@/app/_ui/container/page";
import {useEffect, useMemo, useState} from "react";
import data from "@/data/db.json";
import ProjectCard from "@/app/projects/components/project_card/page";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

// export const metadata: Metadata = metadataCreator('Projects', 'This page is about me' )
const itemsToShow = 6

export default function Projects() {
    const {projects} = data;
    const [currentId, setCurrentId] = useState(1);
    const [startIndex, setStartIndex] = useState(0);

    const sliderItems= useMemo(() => {
        const newProjects = [...projects]
        const currentProjectIndex = newProjects.findIndex((project) => project.id === currentId)

        newProjects.splice(currentProjectIndex, 1)

        return Array.from({ length: itemsToShow }, (_, index) => {
            return newProjects[(startIndex + index) % newProjects.length];
        });
    }, [projects, currentId, startIndex])

    useEffect(() => {
        if (sliderItems.length < itemsToShow) {
            sliderItems.push(...sliderItems.slice(0, itemsToShow - sliderItems.length))
        }
    }, [startIndex]);

    const changingSlides = (prev: number) => {
        const lastId = projects[projects.length - 1].id

        if (prev >= lastId) {
            return 1
        } else {
            return prev + 1
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentId(changingSlides)
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const clickPrev = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    }

    const clickNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }

    console.log(sliderItems)

    return (
        <main className={styles.projectsWrapper}>
            <Container>
                <section className={styles.projects}>
                    <ProjectCard isCurrent={true} data={projects.find(project => project.id === currentId)} />
                    <div className={styles.slider}>
                        <FaChevronLeft onClick={clickPrev}/>
                        <div className={styles.sliderItems}>
                            {sliderItems.map((item) => (
                                <ProjectCard className={styles.item} key={item.id} data={item} clickHandler={(id) => setCurrentId(id)} />
                            ))}
                        </div>
                        <FaChevronRight onClick={clickNext}/>
                    </div>
                </section>
            </Container>
        </main>
    );
}
