import type {Metadata} from "next";
import {prisma} from "@/lib/prisma";
import {AUTHOR_NAME, DEFAULT_OG, SITE_NAME, SITE_URL, TWITTER_HANDLE} from "@/config/seo";
import type {Post} from "@prisma/client";
import type {PostForSeo, PostSeoExtras} from "./jsonld";

async function getPost(slug: string): Promise<PostForSeo | null> {
    const p = await prisma.post.findUnique({where: {slug}});
    return p as unknown as PostForSeo | null;
}

export async function generateMetadata({params}: {params: Promise<{slug: string}> | {slug: string}}): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    const post = await getPost(resolvedParams.slug);
    if (!post || !(post as Post).published) {
        return {robots: {index: false, follow: false}, title: "Not found"};
    }

    const title = post.title;
    const socialTitle = `${SITE_NAME} | ${post.title}`;
    const description = post.description ?? "";
    const url = `${SITE_URL}/blog/${post.slug}`;
    const ogImage = post.coverImage ? `${SITE_URL}/images/blog/${post.coverImage}` : DEFAULT_OG;

    const extras: PostSeoExtras = {
        authorName: AUTHOR_NAME,
        section: "Frontend Development",
        tags: (post as PostSeoExtras).tags ?? null,
    };

    return {
        title,
        description,
        alternates: {canonical: url},
        robots: {index: true, follow: true},
        openGraph: {
            type: "article",
            siteName: SITE_NAME,
            url,
            title: socialTitle,
            description,
            images: [{url: ogImage, width: 1200, height: 630, alt: post.title}],
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description,
            images: [ogImage],
            site: TWITTER_HANDLE,
            creator: TWITTER_HANDLE,
        },
        other: {
            ...(post.createdAt ? {"article:published_time": post.createdAt.toISOString()} : {}),
            ...(post.updatedAt ? {"article:modified_time": post.updatedAt.toISOString()} : {}),
            ...(extras.authorName ? {"article:author": extras.authorName} : {}),
            ...(extras.section ? {"article:section": extras.section} : {}),
            ...(Array.isArray(extras.tags) && extras.tags.length ? {"article:tag": extras.tags} : {}),
        },
    };
}
