import styles from './page.module.sass';
import Container from "@/app/_ui/container/page";
import {MdEmail} from "react-icons/md";
import Canvas from "@/app/_ui/constellation/page";
import MetadataComponent from "@/utils/client-metadata";
import * as React from "react";
import SectionTitle from "@/app/_ui/section_title/page";
import Form from "@/app/contact/components/form/page";

function ContactMe(){
    return (
        <>
            <MetadataComponent title='Contact' description={'Get in touch with MAHrokh, a skilled Front-End Developer. Contact me for inquiries about projects, collaborations, or any questions regarding web development.'} />
            <main className={styles.main}>
                <Canvas onlyStarts={true}/>
                <section className={styles.contactWrapper}>
                    <Container className={styles.contact}>
                        <div className={styles.rowWrapper}>
                            <div className={styles.content}>
                                <SectionTitle text='Contact Me' alignment='flex-start' className={styles.title} />
                                <p className={styles.description}>
                                    Feel free to reach out to me for any inquiries, collaborations, or just to say hi! Whether you have a question, a project idea, or simply want to connect, I&#39;m always eager to hear from you.
                                </p>
                                <div className={styles.email}>
                                    <MdEmail className={styles.emailIcon}/>
                                    <a href="mailto:mahrokh.nz@gmail.com">Mahrokh.nz@gmail.com</a>
                                </div>
                            </div>
                            <Form />
                        </div>
                    </Container>
                </section>
            </main>
        </>
    );
}

export default ContactMe;
