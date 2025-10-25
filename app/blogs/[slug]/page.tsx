import MetadataComponent from "@/utils/client-metadata";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import {notFound} from 'next/navigation';
import {FaArrowLeftLong} from "react-icons/fa6";
import {prisma} from '@/lib/prisma';
import styles from "./page.module.sass";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import React from "react";
import Link from "next/link";

async function Blog({params}: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({
        where: {slug: params.slug},
    });

    if (!post || !post.published) return notFound();

    return (
        <>
            <MetadataComponent
                title={post.title}
                description={post.description ?? ''}
            />
            <main className={styles.blogsWrapper}>
                <Container>
                    <article className={styles.article}>
                        <Link href="/blogs" className={styles.button}>
                            <FaArrowLeftLong/>
                        </Link>

                        <SectionTitle text={post.title}/>

                        {post.coverImage && (
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                loading="lazy"
                                width={1200}
                                height={630}
                                className={styles.blogImage}
                            />
                        )}

                        <div
                            className={styles.articleContent}
                            dangerouslySetInnerHTML={{__html: post.content}}
                        />
                    </article>
                </Container>
            </main>
        </>
    );
}

export default Blog;