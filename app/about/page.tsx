import styles from "./page.module.sass";
import Container from "@/app/_ui/container/page";
import myImage from '@/public/images/Mahrokh-Nabizadeh.jpg'
import Image from "next/image";

export default function About() {
    return (
        <main className={styles.aboutWrapper}>
            <Container >
                <section className={styles.about}>
                    <div className={styles.imageWrapper}>
                        <Image src={myImage} alt='Mahrokh Nabizadeh' width={500} height={600}
                               style={{objectFit: "cover"}}/>
                    </div>
                    <div className={styles.infoWrapper}>
                        <p>
                            Hi, I'm Mahrokh Nabizadeh, a Frontend Developer with expertise in React, Next, JavaScript, TypeScript, CSS, HTML. I’m passionate about building engaging, high-performance, and user-friendly interfaces while continuously learning new technologies to enhance my skills.
                            On this website, I share my projects, experiences, and insights. If you&#39;re interested in collaboration or just want to chat about frontend development, feel free to reach out!
                        </p>
                    </div>
                </section>
            </Container>
        </main>
    );
}
