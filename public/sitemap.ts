import type {MetadataRoute} from "next";
import {prisma} from "@/lib/prisma";
import {SITE_URL} from "@/config/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1, lastModified: new Date()},
        {url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.9, lastModified: new Date()},
        {url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8, lastModified: new Date()},
        {url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.7, lastModified: new Date()},
        {url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 1, lastModified: new Date()},
    ];

    const posts = await prisma.post.findMany({
        where: {published: true},
        select: {slug: true, updatedAt: true, createdAt: true},
        orderBy: {updatedAt: "desc"},
    });

    const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: p.updatedAt ?? p.createdAt,
        changeFrequency: "weekly",
        priority: 0.9,
    }));

    return [...staticRoutes, ...postRoutes];
}