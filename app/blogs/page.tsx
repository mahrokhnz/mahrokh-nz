import BlogRow from "@/app/blogs/_components/blog_row/page";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import {prisma} from '@/lib/prisma';
import {unstable_noStore as noStore} from 'next/cache';
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import React from "react";
import MetadataComponent from "@/utils/client-metadata";
import styles from './page.module.sass'

export type BlogType = {
    id: string
    slug: string
    title: string
    description: string | null
    excerpt: string | null
    content: string
    coverImage: string | null
    tags: string[]
    published: boolean
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

async function Blogs() {
    noStore();

    const blogs: BlogType[] = await prisma.post.findMany();

    return (
        <>
            {/*TODO*/}
            <MetadataComponent title='Blog'
                               description={'Get in touch with MAHrokh, a skilled Front-End Developer. Contact me for inquiries about projects, collaborations, or any questions regarding web development.'}/>
            <main className={styles.blogsWrapper}>
                <Container>
                    <SectionTitle text='My Blogs'/>
                    <section className={styles.blogsList}>
                        {blogs.map((blog: BlogType) => (
                            <BlogRow blogData={blog} key={blog.id}/>
                        ))}
                    </section>
                </Container>
            </main>
        </>
    );
}

export default Blogs;
