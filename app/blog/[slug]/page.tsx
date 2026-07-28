export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import {notFound} from "next/navigation";
import {FaArrowLeftLong} from "react-icons/fa6";
import {prisma} from "@/lib/prisma";
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

            <main className="pt-[100px]">
                <Container>
                    <article className="flex flex-col items-center">
                        <Link href="/blog" className="mb-5 self-start">
                            <FaArrowLeftLong className="size-[30px]" />
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
                                className="size-full rounded-2xl object-cover"
                                wrapperClassName="mb-[25px] h-[500px] w-full overflow-hidden rounded-2xl max-medium-desktop:h-[400px]"
                            />
                        )}

                        <div className="prose-blog" dangerouslySetInnerHTML={{__html: post.content}} />
                    </article>

                    <ul className="mt-[30px] flex flex-wrap gap-[5px]">
                        {post.tags?.map((tag, index) => (
                            <li className="whitespace-nowrap rounded-[5px] bg-[#544df0] px-2 py-1 text-sm text-white" key={`Tag-${index + 1}`}>
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
