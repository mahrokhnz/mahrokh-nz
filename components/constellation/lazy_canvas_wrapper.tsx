'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LazyCanvas = dynamic(() => import('@/components/constellation/page'), { ssr: false });

export default function LazyCanvasWrapper() {
    return <LazyCanvas />;
}
