"use client";

import styles from "./page.module.sass";
import Container from "@/app/_ui/container/page";
import React, {useEffect, useMemo, useState} from "react";
import data from "@/data/db.json";
import ProjectCard from "@/app/projects/_components/project_card/page";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import cls from "@/utils/class_names";
import useMediaQuery from '@mui/material/useMediaQuery';
import MetadataComponent from "@/utils/client-metadata";
import SectionTitle from "@/app/_ui/section_title/page";

const itemsToShow = 6;

function Projects() {
    const {projects} = data;
    const [currentId, setCurrentId] = useState(1);
    const [startIndex, setStartIndex] = useState(0);

    const isDesktop = useMediaQuery('(max-width: 1600px)');
    const isSmallDesktop = useMediaQuery('(max-width: 1024px)');
    const isTablet = useMediaQuery('(max-width: 840px)');
    const isBigPhone = useMediaQuery('(max-width: 600px)');

    const itemsToShowOnCurrentScreen = isBigPhone ? 1 : isTablet ? 2 : isSmallDesktop ? 3 : isDesktop ? 4 : itemsToShow;

    const sliderItems = useMemo(() => {
        const newProjects = [...projects];
        const currentProjectIndex = newProjects.findIndex((project) => project.id === currentId);

        newProjects.splice(currentProjectIndex, 1);

        return Array.from({ length: itemsToShowOnCurrentScreen }, (_, index) => {
            return newProjects[(startIndex + index) % newProjects.length];
        });
    }, [projects, currentId, startIndex, itemsToShowOnCurrentScreen]);

    useEffect(() => {
        if (sliderItems.length < itemsToShowOnCurrentScreen) {
            sliderItems.push(...sliderItems.slice(0, itemsToShowOnCurrentScreen - sliderItems.length));
        }
    }, [startIndex, itemsToShowOnCurrentScreen]);

    const changingSlides = (prev: number) => {
        const lastId = projects[projects.length - 1].id;

        if (prev >= lastId) {
            return 1;
        } else {
            return prev + 1;
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentId(changingSlides);
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const clickPrev = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    const clickNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const currentProject = projects.find(project => project.id === currentId)

    return (
        <>
            <MetadataComponent title='Projects' description={`Explore the projects of MAHrokh, an experienced Front-End Developer. Discover innovative web development work in HTML, CSS, JavaScript, React, and Next.js.

`} />
            <main className={styles.projectsWrapper}>
                <Container>
                    <SectionTitle text='My Projects' />
                    <section className={styles.projects}>
                        {currentProject && (
                            <ProjectCard className={styles.currentItem} isCurrent={true} data={currentProject} />
                        )}
                        <div className={styles.slider}>
                            <FaChevronLeft className={cls(styles.chevronIcon, styles.chevronLeft)} onClick={clickPrev} />
                            <div className={styles.sliderItems}>
                                {sliderItems.map((item) => (
                                    <ProjectCard className={styles.item} key={item.id} data={item} clickHandler={(id: number) => setCurrentId(id)} />
                                ))}
                            </div>
                            <FaChevronRight className={cls(styles.chevronIcon, styles.chevronRight)} onClick={clickNext} />
                        </div>
                    </section>
                </Container>
            </main>
        </>
    );
}

export default Projects