import type { NextConfig } from "next";
import path from "node:path";

const isProd = process.env.NODE_ENV === 'production';
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
    basePath: isProd ? '/mahrokh-nz' : '',
    assetPrefix: isProd ? '/mahrokh-nz' : '',
    output: "export"
};

export default nextConfig;
