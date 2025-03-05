"use client";

import React, { useState, useEffect } from 'react';
import styles from "./page.module.sass";
import Container from "@/app/_ui/container/page";
import myImage from '@/public/images/Mahrokh-Nabizadeh.jpg';
import Image from "next/image";
import data from "@/data/db.json";
import {Button} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaDownload } from "react-icons/fa6";
import SectionTitle from "@/app/_ui/section_title/page";

function AboutMe () {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const { skillsIcons } = data;
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
            return 0
        }
    }

    return (
        <section className={styles.aboutWrapper}>
            <Container className={styles.about}>
                <div className={styles.contentWrapper}>
                    <div
                        className={styles.imageWrapper}
                        style={{position: 'relative', width: '500px', height: '600px'}}
                    >
                        <Image
                            className={styles.myImage}
                            src={myImage}
                            alt='Mahrokh Nabizadeh'
                            layout="fill"
                        />

                        {skillsIcons.map(skill => (
                            <Image
                                key={skill.id}
                                className={styles.skillIcon}
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
                    <div className={styles.infoWrapper}>
                        <SectionTitle text='About Me' className={styles.title} />
                        <p>
                            Hello! I&#39;m a passionate front-end developer with a unique journey and a diverse skill set.
                            My foray into the world of front-end development began in 2021, and since then, I&#39;ve been
                            dedicated to creating engaging, user-friendly web experiences.

                            I hold a Bachelor&#39;s degree in Mechanical Engineering from the University of Tehran. This
                            technical background has equipped me with a solid foundation in problem-solving and
                            analytical thinking, which I seamlessly integrate into my development work. In pursuit of
                            further knowledge and expertise, I also earned my MBA from the University of Science and
                            Culture, which has enhanced my understanding of business dynamics and project management.

                            What sets me apart is my commitment to self-learning. I have honed my skills through
                            hands-on projects, online courses, and continuous exploration of the latest web
                            technologies. My self-taught journey has made me adaptable, resourceful, and constantly
                            eager to learn and grow.

                            Feel free to explore my portfolio and get in touch with me to discuss potential
                            collaborations or exciting projects. Let&#39;s create something amazing together!
                        </p>
                        <Button disabled={true} size={isMobile ? 'small' : 'medium'} className={styles.button} variant='contained'
                                startIcon={<FaDownload/>}>
                            Download Resume
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutMe;
