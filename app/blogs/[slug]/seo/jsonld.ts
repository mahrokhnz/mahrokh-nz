import {SITE_NAME, SITE_URL, DEFAULT_OG} from "@/config/seo";
import type {Post} from "@prisma/client";

export type PostSeoExtras = {
    authorName?: string | null;
    section?: string | null;
    tags?: string[] | null;
};

export type PostForSeo = Pick<
    Post,
    "title" | "description" | "slug" | "coverImage" | "createdAt" | "updatedAt"
> &
    PostSeoExtras;

type JsonLd = Record<string, unknown>;

export function getArticleJsonLd(post: PostForSeo): JsonLd {
    const ogImage = post.coverImage ? `${SITE_URL}/images/blog/${post.coverImage}` : DEFAULT_OG;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description ?? "",
        image: [ogImage],
        datePublished: post.createdAt?.toISOString(),
        dateModified: (post.updatedAt ?? post.createdAt)?.toISOString(),
        author: 'Mahrokh Nabizadeh',
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {"@type": "ImageObject", url: `${SITE_URL}/images/logo.png`},
        },
        mainEntityOfPage: {"@type": "WebPage", "@id": `${SITE_URL}/blogs/${post.slug}`},
    };
}

export function getBreadcrumbJsonLd(post: Pick<Post, "title" | "slug">): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {"@type": "ListItem", position: 1, name: "Blogs", item: `${SITE_URL}/blogs`},
            {"@type": "ListItem", position: 2, name: post.title, item: `${SITE_URL}/blogs/${post.slug}`},
        ],
    };
}