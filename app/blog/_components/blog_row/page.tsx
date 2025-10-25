"use client"

import React from "react";
import styles from "./page.module.sass";
import TimeConvertor from "@/utils/time_convertor";
import Button from "@/components/Button/page";
import {useRouter} from "next/navigation";
import {BlogType} from "@/app/blog/page";

interface BlogRowProps {
    blogData: BlogType
}

function BlogRow({blogData}: BlogRowProps) {
    const router = useRouter();

    return (
        <div className={styles.blogCard}>
            {blogData.coverImage ? (
                <img
                    src={blogData.coverImage}
                    alt={blogData.title}
                    loading="lazy"
                    width={1200}
                    height={630}
                    className={styles.blogImage}
                />
            ) : null}

            <div className={styles.summaryContent}>
                <div className={styles.info}>
                    {blogData.publishedAt ? <span>{TimeConvertor(blogData.publishedAt)}</span> : null}
                    {' '}
                    .
                    {' '}
                    <span>Mahrokh Nabizadeh</span>
                </div>

                <h1 className={styles.title}>{blogData.title}</h1>
                <p className={styles.description}>{blogData.description}</p>

                <Button className={styles.button} onClick={() => router.push(`/blog/${blogData.slug}`)}>
                    Read More
                </Button>
            </div>
        </div>
    );
}

export default BlogRow;
