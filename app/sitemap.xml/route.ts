import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {SITE_URL} from "@/config/seo";

export const runtime = "nodejs";

function iso(d: Date | string | null | undefined) {
    if (!d) return undefined;
    return (d instanceof Date ? d : new Date(d)).toISOString();
}

export async function GET() {
    const staticUrls = [
        {loc: `${SITE_URL}/`, lastmod: new Date(), changefreq: "monthly", priority: "1.00"},
        {loc: `${SITE_URL}/about`, lastmod: new Date(), changefreq: "monthly", priority: "0.90"},
        {loc: `${SITE_URL}/contact`, lastmod: new Date(), changefreq: "monthly", priority: "0.80"},
        {loc: `${SITE_URL}/projects`, lastmod: new Date(), changefreq: "monthly", priority: "0.70"},
        {loc: `${SITE_URL}/blog`, lastmod: new Date(), changefreq: "weekly", priority: "1.00"},
    ];

    const posts = await prisma.post.findMany({
        where: {published: true},
        select: {slug: true, updatedAt: true, createdAt: true},
        orderBy: {updatedAt: "desc"},
    });

    const postUrls = posts.map(p => ({
        loc: `${SITE_URL}/blog/${p.slug}`,
        lastmod: iso(p.updatedAt || p.createdAt),
        changefreq: "weekly",
        priority: "0.90",
    }));

    const all = [...staticUrls, ...postUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${all
        .map(
            (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${iso(u.lastmod)}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
        )
        .join("\n")}
</urlset>`.replace(/\n\s+\n/g, "\n");

    return new NextResponse(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
        },
    });
}