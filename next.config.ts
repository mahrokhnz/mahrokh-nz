import type { NextConfig } from "next";
import path from "node:path";
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

    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@use '@/app/mixins.sass' as mixins`,
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
