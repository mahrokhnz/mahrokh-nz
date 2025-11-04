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
            <MetadataComponent title='Blogs'
                               description={'Explore articles about front-end development, React, CSS, and modern web design techniques to level up your coding and design skills.'}/>
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
