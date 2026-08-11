"use client";

import Container from "@/components/container/page";
import React, {useState} from "react";
import data from "@/data/db.json";
import SectionTitle from "@/components/section_title/page";
import ProjectCard from "@/app/projects/_components/project_card/page";
import cls from "@/utils/class_names";

const ALL_TAG = "All";

function Projects() {
    const {projects} = data;

    const allTags = Array.from(
        new Set(projects.flatMap((p) => p.skills))
    );

    const [activeTag, setActiveTag] = useState<string>(ALL_TAG);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const filteredProjects =
        activeTag === ALL_TAG
            ? projects
            : projects.filter((p) => p.skills.includes(activeTag));

    const selectedProject = projects.find((p) => p.id === selectedId) ?? null;

    const handleCardClick = (id: number) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };

    return (
        <main className="pt-[100px]">
            <Container>
                <SectionTitle text="My Projects" />

                <div className="mb-10 flex flex-wrap gap-2">
                    <button
                        onClick={() => {
                            setActiveTag(ALL_TAG);
                            setSelectedId(null);
                        }}
                        className={cls(
                            "rounded-full border px-4 py-1.5 text-sm transition-all duration-200",
                            activeTag === ALL_TAG
                                ? "border-(--firstWaveColor) bg-(--firstWaveColor) text-white"
                                : "border-(--neutralColor) text-(--neutralColor) hover:border-(--firstWaveColor) hover:text-(--firstWaveColor)"
                        )}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => {
                                setActiveTag(tag);
                                setSelectedId(null);
                            }}
                            className={cls(
                                "rounded-full border px-4 py-1.5 text-sm transition-all duration-200",
                                activeTag === tag
                                    ? "border-(--firstWaveColor) bg-(--firstWaveColor) text-white"
                                    : "border-(--neutralColor) text-(--neutralColor) hover:border-(--firstWaveColor) hover:text-(--firstWaveColor)"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {selectedProject && (
                    <div className="mb-10">
                        <ProjectCard
                            data={selectedProject}
                            isCurrent={true}
                            className=""
                            clickHandler={() => setSelectedId(null)}
                        />
                    </div>
                )}

                <section className="grid grid-cols-3 gap-6 max-small-desktop:grid-cols-2 max-tablet:grid-cols-2 max-big-phone:grid-cols-1">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            data={project}
                            className={cls(
                                "transition-transform duration-200 hover:-translate-y-1",
                                selectedId === project.id && "ring-2 ring-(--firstWaveColor)"
                            )}
                            clickHandler={handleCardClick}
                        />
                    ))}
                </section>

                {filteredProjects.length === 0 && (
                    <p className="mt-10 text-center text-(--neutralColor)">No projects found for this filter.</p>
                )}
            </Container>
        </main>
    );
}

export default Projects;
