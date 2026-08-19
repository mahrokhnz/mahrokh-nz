import type {Metadata} from "next";
import BlogRow from "@/app/blog/_components/blog_row/page";
import Pagination from "@/app/blog/_components/pagination/page";
import {prisma} from "@/lib/prisma";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import React, {Suspense} from "react";
import metadataCreator from "@/utils/server-metadata";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getWebPageJsonLd} from "@/utils/seo/jsonld";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BLOG_DESCRIPTION =
    "Explore articles about front-end development, React, CSS, and modern web design techniques to level up your coding and design skills.";

const POSTS_PER_PAGE = 5;

export const metadata: Metadata = metadataCreator({
    title: "Blog",
    description: BLOG_DESCRIPTION,
    path: "/blog",
});

export type BlogType = {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    tags: string[];
    published: boolean;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>;
}

async function Blog({ searchParams }: BlogPageProps) {
    const { page } = await searchParams;
    const currentPage = Math.max(1, parseInt(page ?? "1", 10));

    const [total, blog] = await Promise.all([
        prisma.post.count({ where: { published: true } }),
        prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
            skip: (currentPage - 1) * POSTS_PER_PAGE,
            take: POSTS_PER_PAGE,
        }),
    ]);

    const totalPages = Math.ceil(total / POSTS_PER_PAGE);

    return (
        <main className="flex flex-col gap-4 pt-[100px]">
            <JsonLdScript
                id="ld-blog"
                data={getWebPageJsonLd({
                    title: "Blog",
                    description: BLOG_DESCRIPTION,
                    path: "/blog",
                })}
            />
            <Container>
                <SectionTitle text="My Blog" />
                <section className="flex flex-col gap-12">
                    {blog.map((post: BlogType) => (
                        <BlogRow blogData={post} key={post.id} />
                    ))}
                </section>
                <Suspense>
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                </Suspense>
            </Container>
        </main>
    );
}

export default Blog;
