"use client";

import Container from "@/components/container/page";
import React, {useEffect, useMemo, useState} from "react";
import data from "@/data/db.json";
import ProjectCard from "@/app/projects/_components/project_card/page";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa6";
import cls from "@/utils/class_names";
import useMediaQuery from "@mui/material/useMediaQuery";
import SectionTitle from "@/components/section_title/page";

const itemsToShow = 6;

function Projects() {
    const {projects} = data;
    const [currentId, setCurrentId] = useState(1);
    const [startIndex, setStartIndex] = useState(0);

    const isDesktop = useMediaQuery("(max-width: 1600px)");
    const isSmallDesktop = useMediaQuery("(max-width: 1024px)");
    const isTablet = useMediaQuery("(max-width: 840px)");
    const isBigPhone = useMediaQuery("(max-width: 600px)");

    const itemsToShowOnCurrentScreen = isBigPhone
        ? 1
        : isTablet
          ? 2
          : isSmallDesktop
            ? 3
            : isDesktop
              ? 4
              : itemsToShow;

    const sliderItems = useMemo(() => {
        const newProjects = [...projects];
        const currentProjectIndex = newProjects.findIndex((project) => project.id === currentId);

        newProjects.splice(currentProjectIndex, 1);

        return Array.from({length: itemsToShowOnCurrentScreen}, (_, index) => {
            return newProjects[(startIndex + index) % newProjects.length];
        });
    }, [projects, currentId, startIndex, itemsToShowOnCurrentScreen]);

    useEffect(() => {
        if (sliderItems.length < itemsToShowOnCurrentScreen) {
            sliderItems.push(...sliderItems.slice(0, itemsToShowOnCurrentScreen - sliderItems.length));
        }
    }, [startIndex, itemsToShowOnCurrentScreen, sliderItems]);

    const changingSlides = (prev: number) => {
        const lastId = projects[projects.length - 1].id;

        if (prev >= lastId) {
            return 1;
        }
        return prev + 1;
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

    const currentProject = projects.find((project) => project.id === currentId);

    return (
        <main className="pt-[100px]">
            <Container>
                <SectionTitle text="My Projects" />
                <section className="grid w-full grow grid-rows-2 gap-8">
                    {currentProject && (
                        <ProjectCard className="row-span-2" isCurrent={true} data={currentProject} />
                    )}
                    <div className="relative row-span-1 flex items-center justify-between gap-4">
                        <FaChevronLeft
                            className={cls(
                                "absolute left-0 z-[2] cursor-pointer text-[110px] text-(--neutralColor) opacity-30 transition-opacity duration-300 ease-in-out hover:opacity-100 max-desktop:text-[80px] max-small-desktop:text-[50px]"
                            )}
                            onClick={clickPrev}
                        />
                        <div className="grid grow grid-cols-6 justify-center gap-8 max-desktop:grid-cols-4 max-small-desktop:grid-cols-3 max-tablet:grid-cols-2 max-big-phone:grid-cols-1">
                            {sliderItems.map((item) => (
                                <ProjectCard
                                    className=""
                                    key={item.id}
                                    data={item}
                                    clickHandler={(id: number) => setCurrentId(id)}
                                />
                            ))}
                        </div>
                        <FaChevronRight
                            className={cls(
                                "absolute right-0 z-[2] cursor-pointer text-[110px] text-(--neutralColor) opacity-30 transition-opacity duration-300 ease-in-out hover:opacity-100 max-desktop:text-[80px] max-small-desktop:text-[50px]"
                            )}
                            onClick={clickNext}
                        />
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default Projects;
