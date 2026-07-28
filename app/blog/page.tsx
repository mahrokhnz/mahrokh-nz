import type {Metadata} from "next";
import BlogRow from "@/app/blog/_components/blog_row/page";
import {prisma} from "@/lib/prisma";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import React from "react";
import styles from "./page.module.sass";
import metadataCreator from "@/utils/server-metadata";
import JsonLdScript from "@/components/seo/jsonld_script";
import {getWebPageJsonLd} from "@/utils/seo/jsonld";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BLOG_DESCRIPTION =
    "Explore articles about front-end development, React, CSS, and modern web design techniques to level up your coding and design skills.";

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

async function Blog() {
    // #region agent log
    fetch('http://127.0.0.1:7590/ingest/77355d26-d6fa-477f-bdbc-57eddb6bcfd6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'5cd3c0'},body:JSON.stringify({sessionId:'5cd3c0',runId:'post-fix',hypothesisId:'G',location:'app/blog/page.tsx:Blog',message:'Blog page rendered at runtime (not build prerender)',data:{dynamic:'force-dynamic'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const blog: BlogType[] = await prisma.post.findMany({
        where: {published: true},
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className={styles.blogWrapper}>
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
                <section className={styles.blogList}>
                    {blog.map((post: BlogType) => (
                        <BlogRow blogData={post} key={post.id} />
                    ))}
                </section>
            </Container>
        </main>
    );
}

export default Blog;
