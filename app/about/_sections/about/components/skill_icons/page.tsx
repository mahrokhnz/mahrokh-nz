"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import {SkillType} from "@/app/about/_sections/about/type";

interface SkillIconProps {
    icons: SkillType[];
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
        }
        return 0;
    };

    return (
        <div className="max-tablet:absolute max-tablet:top-full max-tablet:left-0 max-tablet:z-[100] max-tablet:mt-2 max-tablet:flex max-tablet:flex-row max-tablet:flex-wrap max-tablet:items-center">
            {Array.isArray(icons) && icons.map((skill) => (
                <Image
                    key={skill.id}
                    className="absolute z-[100] max-w-none rounded-[0.2rem] max-tablet:relative max-tablet:!top-auto max-tablet:!left-auto max-tablet:me-[5px] max-tablet:max-h-10 max-tablet:max-w-10"
                    src={skill.icon}
                    alt={skill.title}
                    width={60}
                    height={60}
                    style={{
                        top: `${skill.top - calculateOffsetPercentage(mousePosition.y, 2)}%`,
                        left: `${skill.left - calculateOffsetPercentage(mousePosition.x, 2)}%`,
                    }}
                />
            ))}
        </div>
    );
}

export default SkillIcons;
