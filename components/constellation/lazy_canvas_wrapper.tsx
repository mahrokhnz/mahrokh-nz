"use client";

import dynamic from "next/dynamic";
import React from "react";

const LazyCanvas = dynamic(() => import("@/components/constellation/page"), {
    ssr: false,
});

interface LazyCanvasWrapperProps {
    onlyStarts?: boolean;
}

export default function LazyCanvasWrapper({onlyStarts = false}: LazyCanvasWrapperProps) {
    return <LazyCanvas onlyStarts={onlyStarts} />;
}
