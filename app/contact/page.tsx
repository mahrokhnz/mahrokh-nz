import type {Metadata} from "next";
import styles from "./page.module.sass";
import Container from "@/components/container/page";
import {MdEmail} from "react-icons/md";
import * as React from "react";
import SectionTitle from "@/components/section_title/page";
import Form from "@/app/contact/_components/form/page";
import metadataCreator from "@/utils/server-metadata";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getWebPageJsonLd} from "@/utils/seo/jsonld";
import LazyCanvasWrapper from "@/components/constellation/lazy_canvas_wrapper";

const CONTACT_DESCRIPTION =
    "Get in touch with MAHrokh, a skilled Front-End Developer. Contact me for inquiries about projects, collaborations, or any questions regarding web development.";

export const metadata: Metadata = metadataCreator({
    title: "Contact",
    description: CONTACT_DESCRIPTION,
    path: "/contact",
});

function ContactMe() {
    return (
        <main className={styles.main}>
            <JsonLdScript
                id="ld-contact"
                data={getWebPageJsonLd({
                    title: "Contact",
                    description: CONTACT_DESCRIPTION,
                    path: "/contact",
                })}
            />
            <LazyCanvasWrapper onlyStarts />
            <section className={styles.contactWrapper}>
                <Container className={styles.contact}>
                    <div className={styles.rowWrapper}>
                        <div className={styles.content}>
                            <SectionTitle text="Contact Me" alignment="flex-start" className={styles.title} />
                            <p className={styles.description}>
                                Feel free to reach out to me for any inquiries, collaborations, or just to say hi! Whether you have a question, a project idea, or simply want to connect, I&#39;m always eager to hear from you.
                            </p>
                            <div className={styles.email}>
                                <MdEmail className={styles.emailIcon} />
                                <a href="mailto:mahrokh.nz@gmail.com">Mahrokh.nz@gmail.com</a>
                            </div>
                        </div>
                        <Form />
                    </div>
                </Container>
            </section>
        </main>
    );
}

export default ContactMe;
