import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    fallbacks: {
        document: "/_offline",
    },
});

const nextConfig: NextConfig = {
    images: {
        localPatterns: [
            {
                pathname: '/images/**',
                search: '',
            },
        ],
    },

    experimental: {
        scrollRestoration: true,
    },

    compiler: {
        removeConsole: {
            exclude: ['error'],
        },
    },

    typescript: {
        ignoreBuildErrors: true,
    },
};

export default withPWA(nextConfig);
