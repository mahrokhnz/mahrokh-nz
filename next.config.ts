import type { NextConfig } from "next";
import path from "node:path";

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

export default nextConfig;
