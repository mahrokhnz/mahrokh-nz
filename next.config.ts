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
};

export default nextConfig;
