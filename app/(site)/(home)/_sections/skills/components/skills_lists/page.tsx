"use client";

import data from "@/data/db.json";
import {useEffect, useMemo, useState} from "react";
import {useInView} from "react-intersection-observer";
import SkillsList from "@/app/(site)/(home)/_sections/skills/components/skills_lists/components/skill_list/page";
import {SkillType} from "@/app/(site)/(home)/_sections/skills/type";
import type {CircleFillSpeed} from "@/components/circle/page";

const FILL_SPEED: CircleFillSpeed = "med";
const DEFAULT_SKILL_COUNT = 8;

type SkillCategory = {
    id: number;
    title: string;
    skills: SkillType[];
};

const CATEGORY_DEFINITIONS = [
    {
        id: 1,
        title: "01 — Core Frontend",
        items: [
            "React.js",
            "Next.js",
            "JavaScript",
            "TypeScript",
            "HTML",
            "CSS / Sass / Stylus",
            "Responsive Web Design",
        ],
    },
    {
        id: 2,
        title: "02 — UI & Application",
        items: [
            "Tailwind CSS",
            "Material UI",
            "Ant Design",
            "Redux Toolkit",
            "GraphQL / REST API / React Query",
            "WebSocket",
            "PWA",
        ],
    },
    {
        id: 3,
        title: "03 — Tooling & Engineering",
        items: [
            "Git",
            "Webpack",
            "Vite",
            "Data Structures",
            "Performance",
            "SEO",
            "Frontend Architecture",
        ],
    },
    {
        id: 4,
        title: "04 — Specialized",
        items: [
            "Three.js",
            "Ubuntu",
        ],
    },
] as const;

const SKILL_TITLE_ALIASES: Record<string, string[]> = {
    "React.js": ["Reactjs"],
    "Next.js": ["Nextjs"],
    JavaScript: ["Javascript"],
    TypeScript: ["Typescript"],
    "Tailwind CSS": ["Tailwindcss"],
    "CSS / Sass / Stylus": ["CSS (Stylus/Sass)", "CSS", "Sass", "Stylus"],
    "GraphQL / REST API / React Query": ["Graphql and Rest Api", "Graphql", "Rest Api", "React Query"],
    WebSocket: ["Websocket"],
    "Data Structures": ["Data Structure"],
    "Three.js": ["Threejs"],
    Performance: [],
    SEO: [],
    "Frontend Architecture": [],
};

const SKILL_COUNT_OVERRIDES: Record<string, number> = {
    "Tailwind CSS": 9,
    "Ant Design": 10,
};

function normalizeTitle(value: string) {
    return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function buildSkillsByTitle(skills: SkillType[]) {
    return skills.reduce((acc, skill) => {
        acc[normalizeTitle(skill.title)] = skill;
        return acc;
    }, {} as Record<string, SkillType>);
}

function mapCategorySkills(skillsByTitle: Record<string, SkillType>) {
    let nextId = 1000;

    return CATEGORY_DEFINITIONS.map((category): SkillCategory => {
        const mappedSkills = category.items.map((label) => {
            const aliases = [label, ...(SKILL_TITLE_ALIASES[label] ?? [])];
            const matchedSkill = aliases
                .map((item) => skillsByTitle[normalizeTitle(item)])
                .find(Boolean);

            return {
                id: matchedSkill?.id ?? nextId++,
                column: category.id,
                title: label,
                count: SKILL_COUNT_OVERRIDES[label] ?? matchedSkill?.count ?? DEFAULT_SKILL_COUNT,
            };
        });

        return {
            id: category.id,
            title: category.title,
            skills: mappedSkills,
        };
    });
}

function SkillsLists() {
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.25,
        rootMargin: "-10% 0px -10% 0px",
    });
    const [playId, setPlayId] = useState(0);
    const {skills} = data;

    useEffect(() => {
        if (inView) {
            setPlayId((value) => value + 1);
        }
    }, [inView]);

    const categories = useMemo(() => {
        const skillsByTitle = buildSkillsByTitle(skills as SkillType[]);
        return mapCategorySkills(skillsByTitle);
    }, [skills]);

    return (
        <div
            className="grid w-full grid-cols-2 gap-x-20 gap-y-14 max-tablet:grid-cols-1"
            ref={ref}
        >
            {categories.map((category) => (
                <div key={category.id} className="flex flex-col gap-8">
                    <h3 className="text-[1.45rem] font-light max-tablet:text-[1.25rem] max-phone:text-[1.05rem]">
                        {category.title}
                    </h3>
                    <SkillsList
                        data={category.skills}
                        inView={inView}
                        playId={playId}
                        speed={FILL_SPEED}
                    />
                </div>
            ))}
        </div>
    );
}

export default SkillsLists;
