"use client";

import React, { useState, useEffect } from 'react';
import styles from "./page.module.sass";
import Image from "next/image";
import {skillType} from "@/app/about/_sections/(about)/type";

interface SkillIconProps {
    icons: unknown | skillType[];
}

function SkillIcons({ icons }: SkillIconProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculateOffsetPercentage = (pos: number, maxOffset: number) => {
        if (typeof window !== "undefined") {
            return ((pos / window.innerWidth) * 2 - 1) * maxOffset;
        } else {
            return 0;
        }
    };

    return (
        <>
            {Array.isArray(icons) && icons.map((skill) => (
                <Image
                    key={skill.id}
                    className={styles.skillIcon}
                    src={skill.icon}
                    alt={skill.title}
                    width={60}
                    height={60}
                    style={{
                        top: `${parseFloat(skill.top) - calculateOffsetPercentage(mousePosition.y, 2)}%`,
                        left: `${parseFloat(skill.left) - calculateOffsetPercentage(mousePosition.x, 2)}%`,
                    }}
                />
            ))}
        </>
    );
}

export default SkillIcons;