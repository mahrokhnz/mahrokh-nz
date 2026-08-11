"use client";

import data from "@/data/db.json";
import {useEffect, useMemo, useState} from "react";
import {useInView} from "react-intersection-observer";
import SkillsList from "@/app/(home)/_sections/skills/components/skills_lists/components/skill_list/page";
import {SkillType} from "@/app/(home)/_sections/skills/type";
import type {CircleFillSpeed} from "@/components/circle/page";

const FILL_SPEED: CircleFillSpeed = "med";

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

    const {primary, secondary} = useMemo(() => {
        const first = skills.filter((skill) => skill.column === 1);
        const second = skills.filter((skill) => skill.column === 2);

        return {primary: first as SkillType[], secondary: second as SkillType[]};
    }, [skills]);

    return (
        <div className="flex flex-wrap justify-between gap-20" ref={ref}>
            <SkillsList
                data={primary}
                inView={inView}
                playId={playId}
                speed={FILL_SPEED}
            />
            <SkillsList
                data={secondary}
                inView={inView}
                playId={playId}
                speed={FILL_SPEED}
            />
        </div>
    );
}

export default SkillsLists;
