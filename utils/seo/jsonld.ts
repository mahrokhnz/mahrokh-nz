import { AUTHOR_NAME, SITE_NAME, SITE_URL, DEFAULT_OG } from "@/config/seo";

type JsonLd = Record<string, unknown>;

function absolutePath(path = "/") {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${SITE_URL}${normalized === "/" ? "" : normalized}` || SITE_URL;
}

export function getWebsiteJsonLd(): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: "Personal portfolio and blog for Mahrokh Nabizadeh.",
        publisher: {
            "@type": "Person",
            name: AUTHOR_NAME,
        },
    };
}

export function getPersonJsonLd(): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR_NAME,
        url: SITE_URL,
        jobTitle: "Frontend Developer",
        image: `${SITE_URL}/images/Mahrokh-Nabizadeh.jpg`,
        sameAs: [
            "https://github.com/mahrokhnz",
            "https://www.linkedin.com/in/mahrokh-nabizadeh-335326144/",
        ],
    };
}

export function getWebPageJsonLd({
    title,
    description,
    path,
}: {
    title: string;
    description: string;
    path: string;
}): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${SITE_NAME} | ${title}`,
        description,
        url: absolutePath(path),
        isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
        },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: DEFAULT_OG,
        },
    };
}

export function getBreadcrumbListJsonLd(
    items: Array<{name: string; path: string}>
): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absolutePath(item.path),
        })),
    };
}

export {absolutePath};
