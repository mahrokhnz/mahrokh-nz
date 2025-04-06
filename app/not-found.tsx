"use client"

import EyeCanvas from "@/components/eye/page";
import Container from "@/components/container/page";
import styles from './not-found.module.sass'
import SectionTitle from "@/components/section_title/page";
import React from "react";
import Button from "@/components/Button/page";
import {useRouter} from "next/navigation";

function NotFound() {
    const router = useRouter();

    return (
        <section className={styles.notFoundPage}>
            <Container className={styles.notFound}>
                <div className={styles.notFoundWrapper}>
                    <EyeCanvas />
                    <span className={styles.text}>Looks Like You&#39;re Lost</span>
                    <SectionTitle text='404 error' />
                    <Button className={styles.button} onClick={() => router.replace('/')}>
                        back to home
                    </Button>
                </div>
            </Container>
        </section>
    );
}

export default NotFound