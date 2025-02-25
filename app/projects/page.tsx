"use client";

import styles from "./page.module.sass";
import Container from "@/app/_ui/container/page";
import {useEffect, useMemo, useState} from "react";
import data from "@/data/db.json";
import ProjectCard from "@/app/projects/components/project_card/page";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import cls from "@/utils/class_names";
import useMediaQuery from '@mui/material/useMediaQuery';

const itemsToShow = 4;

export default function Projects() {
    const {projects} = data;
    const [currentId, setCurrentId] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const isSmallDesktop = useMediaQuery('(max-width: 1024px)');
    const isBigPhone = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 840px)');

    const itemsToShowOnCurrentScreen = isBigPhone ? 1 : isTablet ? 2 : isSmallDesktop ? 3 : itemsToShow;

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

    const changingSlides = (prev) => {
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

    return (
        <main className={styles.projectsWrapper}>
            <Container>
                <section className={styles.projects}>
                    <ProjectCard className={styles.currentItem} isCurrent={true} data={projects.find(project => project.id === currentId)} />
                    <div className={styles.slider}>
                        <FaChevronLeft className={cls(styles.chevronIcon, styles.chevronLeft)} onClick={clickPrev} />
                        <div className={styles.sliderItems}>
                            {sliderItems.map((item) => (
                                <ProjectCard className={styles.item} key={item.id} data={item} clickHandler={(id) => setCurrentId(id)} />
                            ))}
                        </div>
                        <FaChevronRight className={cls(styles.chevronIcon, styles.chevronRight)} onClick={clickNext} />
                    </div>
                </section>
            </Container>
        </main>
    );
}
