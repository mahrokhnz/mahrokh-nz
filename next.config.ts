import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        localPatterns: [
            {
                pathname: '/images/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
