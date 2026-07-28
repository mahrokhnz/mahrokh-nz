export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import {notFound} from "next/navigation";
import {FaArrowLeftLong} from "react-icons/fa6";
import {prisma} from "@/lib/prisma";
import styles from "./page.module.sass";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import Link from "next/link";
import {getArticleJsonLd, getBreadcrumbJsonLd, type PostForSeo} from "./seo/jsonld";
import JsonLdScript from "@/components/seo/jsonld_script";
import SkeletonImage from "@/components/skeleton_image/page";

export {generateMetadata} from "./seo/metadata";
import type {Post} from "@prisma/client";

type PostWithContent = PostForSeo & Pick<Post, "content" | "published">;

async function getPost(slug: string): Promise<PostWithContent | null> {
    const p = await prisma.post.findUnique({where: {slug}});
    return p as unknown as PostWithContent | null;
}

async function Blog({params}: {params: Promise<{slug: string}> | {slug: string}}) {
    const resolvedParams = await Promise.resolve(params);
    const post = await getPost(resolvedParams.slug);
    if (!post || !post.published) return notFound();

    const articleLd = getArticleJsonLd(post);
    const breadcrumbLd = getBreadcrumbJsonLd({title: post.title, slug: post.slug});

    return (
        <>
            <JsonLdScript id="ld-article" data={articleLd} />
            <JsonLdScript id="ld-breadcrumbs" data={breadcrumbLd} />

            <main className={styles.blogWrapper}>
                <Container>
                    <article className={styles.article}>
                        <Link href="/blog" className={styles.button}>
                            <FaArrowLeftLong className={styles.arrowIcon} />
                        </Link>

                        <SectionTitle text={post.title} />

                        {post.coverImage && (
                            <SkeletonImage
                                src={`/images/blog/${post.coverImage}`}
                                alt={post.title}
                                width={1200}
                                height={630}
                                sizes="(max-width: 900px) 100vw, 900px"
                                priority
                                className={styles.blogImage}
                                wrapperClassName={styles.blogImageWrapper}
                            />
                        )}

                        <div className={styles.articleContent} dangerouslySetInnerHTML={{__html: post.content}} />
                    </article>

                    <ul className={styles.tags}>
                        {post.tags?.map((tag, index) => (
                            <li className={styles.tag} key={`Tag-${index + 1}`}>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </Container>
            </main>
        </>
    );
}

export default Blog;
