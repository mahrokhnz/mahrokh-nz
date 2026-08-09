"use client";

import {memo, useLayoutEffect, type CSSProperties} from "react";
import cls from "@/utils/class_names";
import type {Complexity, Product, RowStatus} from "../constants";

export type ProductRowProps = {
    product: Product;
    status: RowStatus;
    complexity: Complexity;
    selected: boolean;
    onSelect: (id: number) => void;
    onRendered: (id: number) => void;
    style?: CSSProperties;
};

function ProductRowView({
    product,
    status,
    complexity,
    selected,
    onSelect,
    onRendered,
    style,
}: ProductRowProps) {
    useLayoutEffect(() => {
        onRendered(product.id);
    });

    if (complexity === "high") {
        let checksum = 0;
        for (let i = 0; i < 80; i += 1) checksum += (product.price * (i + 3)) % 97;
        void checksum;
    }

    return (
        <button
            type="button"
            onClick={() => onSelect(product.id)}
            style={style}
            className={cls(
                "flex w-full items-center gap-3 border-b border-[var(--labs-border)] px-4 text-left transition-colors",
                selected && "bg-[rgba(139,139,255,0.12)]",
                status === "rendered" && "labs-row-flash-a",
                status === "updated" && "labs-row-updated"
            )}
        >
            <span
                className={cls(
                    "size-2.5 shrink-0 rounded-[3px] border",
                    status === "rendered" && "border-transparent bg-[var(--labs-accent)]",
                    status === "updated" && "border-transparent bg-[#e8b84a]",
                    status === "skipped" && "border-[var(--labs-border-strong)] bg-transparent"
                )}
                aria-hidden
            />
            <span className="min-w-0 flex-1 truncate text-[0.88rem] text-white">{product.name}</span>
            <span className="hidden w-24 truncate text-[0.78rem] text-[var(--labs-muted)] sm:block">
                {product.category}
            </span>
            <span className="w-14 text-right font-mono text-[0.8rem] text-[var(--labs-accent)]">
                ${product.price}
            </span>
        </button>
    );
}

export const MemoProductRow = memo(ProductRowView);
export default ProductRowView;
