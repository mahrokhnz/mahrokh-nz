'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LazySvg = dynamic(() => import('@/components/svg_path/page'), { ssr: false });

export default function LazySvgWrapper() {
    return <LazySvg />;
}
