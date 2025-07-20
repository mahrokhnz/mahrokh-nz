import React from 'react';
import styles from "./page.module.sass";
import Container from "@/components/container/page";
import myImage from '@/public/images/Mahrokh-Nabizadeh.jpg';
import Image from "next/image";
import data from "@/data/db.json";
import SectionTitle from "@/components/section_title/page";
import SkillIcons from "./components/skill_icons/page";
import {SkillType} from "@/app/about/_sections/about/type";
import DownloadButton from "@/components/download_button/page";

function AboutMe () {
    const { skillsIcons } = data as { skillsIcons: SkillType[] };

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

                        {Array.isArray(skillsIcons) && (
                            <SkillIcons icons={skillsIcons} />
                        )}
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

                        <DownloadButton />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutMe;
