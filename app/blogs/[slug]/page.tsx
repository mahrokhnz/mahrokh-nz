export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import {notFound} from "next/navigation";
import {FaArrowLeftLong} from "react-icons/fa6";
import {prisma} from "@/lib/prisma";
import styles from "./page.module.sass";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import {getArticleJsonLd, getBreadcrumbJsonLd, type PostForSeo} from "./seo/jsonld";

export {generateMetadata} from "./seo/metadata";
import type {Post} from "@prisma/client";

type PostWithContent = PostForSeo & Pick<Post, "content" | "published">;

async function getPost(slug: string): Promise<PostWithContent | null> {
    const p = await prisma.post.findUnique({where: {slug}});
    return p as unknown as PostWithContent | null;
}

async function Blog({params}: { params: { slug: string } }) {
    const post = await getPost(params.slug);
    if (!post || !post.published) return notFound();

    const articleLd = getArticleJsonLd(post);
    const breadcrumbLd = getBreadcrumbJsonLd({title: post.title, slug: post.slug});

    return (
        <>
            <Script id="ld-article" type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(articleLd)}}/>
            <Script id="ld-breadcrumbs" type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbLd)}}/>

            <main className={styles.blogsWrapper}>
                <Container>
                    <article className={styles.article}>
                        <Link href="/blogs" className={styles.button}>
                            <FaArrowLeftLong className={styles.arrowIcon}/>
                        </Link>

                        <SectionTitle text={post.title}/>

                        {post.coverImage && (
                            <Image
                                src={`/images/blogs/${post.coverImage}`}
                                alt={post.title}
                                width={1200}
                                height={630}
                                loading="lazy"
                                className={styles.blogImage}
                            />
                        )}

                        <div className={styles.articleContent} dangerouslySetInnerHTML={{__html: post.content}}/>
                    </article>

                    <ul className={styles.tags}>
                        {post.tags?.map((tag, index) => (
                            <li className={styles.tag} key={`Tag-${index + 1}`}>{tag}</li>
                        ))}
                    </ul>
                </Container>
            </main>
        </>
    );
}

export default Blog;