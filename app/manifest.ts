import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/config/seo";
import { AppColors } from "@/theme/colors";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME,
        short_name: SITE_NAME,
        description: "Personal portfolio and blog for Mahrokh Nabizadeh, featuring projects, skills, and writing.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: AppColors.primary,
        categories: ["portfolio", "developer", "personal"],
        lang: "en",
        id: SITE_URL,
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icon-512-maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
