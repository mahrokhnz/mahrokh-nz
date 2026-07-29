import type { Metadata } from "next";
import { DEFAULT_OG, SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/config/seo";

export type PageMetadataInput = {
    title: string;
    description: string;
    path?: string;
    image?: string;
    type?: "website" | "article";
    noIndex?: boolean;
    keywords?: string[];
};

function toAbsoluteUrl(path = "/") {
    if (path.startsWith("http")) return path;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}

function metadataCreator({
    title,
    description,
    path = "/",
    image = DEFAULT_OG,
    type = "website",
    noIndex = false,
    keywords,
}: PageMetadataInput): Metadata {
    const url = toAbsoluteUrl(path);
    const socialTitle = `${SITE_NAME} | ${title}`;

    return {
        title,
        description,
        ...(keywords?.length ? {keywords} : {}),
        alternates: {
            canonical: url,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
        openGraph: {
            type,
            siteName: SITE_NAME,
            url,
            title: socialTitle,
            description,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: socialTitle,
                },
            ],
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description,
            images: [image],
            site: TWITTER_HANDLE,
            creator: TWITTER_HANDLE,
        },
    };
}

export default metadataCreator;
