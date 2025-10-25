import BlogRow from "@/app/blog/_components/blog_row/page";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import React from "react";

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

export default async function BlogIndex() {
    noStore();

    const blogs: BlogType[] = await prisma.post.findMany();

    return (
        <main>
            <Container>
                <SectionTitle text='My Blogs' />
                <section>
                    {blogs.map((blog: BlogType) => (
                        <BlogRow blogData={blog} key={blog.id} />
                    ))}
                </section>
            </Container>n
        </main>
    );
}
