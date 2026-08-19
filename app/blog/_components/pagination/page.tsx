"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button/page";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const goTo = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center gap-3 mt-8">
            <Button
                variant="outlined"
                disabled={currentPage <= 1}
                onClick={() => goTo(currentPage - 1)}
            >
                Previous
            </Button>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => goTo(page)}
                        className={`w-9 h-9 rounded-full text-sm font-medium transition-colors cursor-pointer
                            ${page === currentPage
                                ? "bg-(--firstWaveColor) text-white"
                                : "text-(--neutralColor) hover:text-(--firstWaveColor)"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <Button
                variant="outlined"
                disabled={currentPage >= totalPages}
                onClick={() => goTo(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;
