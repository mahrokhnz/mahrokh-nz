"use client";

import {useEffect, useRef} from "react";
import cls from "@/utils/class_names";
import {PlaygroundPreview} from "@/app/labs/_components/playgrounds/shared/page";
import {
    ControlButtonGroup,
    ControlSection,
} from "@/app/labs/_components/playgrounds/controls/page";
import type {ConvertResult} from "../converter";
import {
    PREVIEW_BACKGROUNDS,
    PREVIEW_SIZE_PX,
    PREVIEW_SIZES,
    type PreviewBackground,
    type PreviewSize,
} from "../constants";

interface SvgPreviewPanelProps {
    result: ConvertResult;
    size: PreviewSize;
    background: PreviewBackground;
    onSizeChange: (size: PreviewSize) => void;
    onBackgroundChange: (background: PreviewBackground) => void;
}

function backgroundClass(background: PreviewBackground): string {
    switch (background) {
        case "light":
            return "bg-[#f4f4f8]";
        case "dark":
            return "bg-[rgba(10,10,16,0.85)]";
        case "checkerboard":
            return "bg-[length:16px_16px] bg-[linear-gradient(45deg,#1a1a24_25%,transparent_25%),linear-gradient(-45deg,#1a1a24_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1a1a24_75%),linear-gradient(-45deg,transparent_75%,#1a1a24_75%)] bg-[position:0_0,0_8px,8px_-8px,-8px_0] bg-[#0e0e16]";
    }
}

function SvgPreviewPanel({
    result,
    size,
    background,
    onSizeChange,
    onBackgroundChange,
}: SvgPreviewPanelProps) {
    const stageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        stage.replaceChildren();

        if (!result.ok) return;

        const clone = result.svg.cloneNode(true) as SVGSVGElement;
        clone.setAttribute("role", "img");
        clone.setAttribute("aria-label", "SVG preview");
        clone.style.maxWidth = "100%";
        clone.style.maxHeight = "100%";
        clone.style.width = `${PREVIEW_SIZE_PX[size]}px`;
        clone.style.height = "auto";
        clone.style.display = "block";
        clone.style.color = background === "light" ? "#111118" : "#c8c8ff";

        if (!clone.getAttribute("viewBox")) {
            const width = clone.getAttribute("width");
            const height = clone.getAttribute("height");
            if (width && height) {
                clone.setAttribute("viewBox", `0 0 ${parseFloat(width)} ${parseFloat(height)}`);
            }
        }

        stage.appendChild(clone);
    }, [result, size, background]);

    const meta = (
        <div className="flex flex-wrap items-center gap-2">
            <ControlButtonGroup
                value={size}
                onChange={onSizeChange}
                options={PREVIEW_SIZES}
                buttonClassName="min-w-8"
            />
        </div>
    );

    return (
        <PlaygroundPreview ariaLabel="SVG preview" title="PREVIEW" meta={meta}>
            <div className="relative z-[1] flex flex-1 flex-col gap-4">
                <ControlSection title="BACKGROUND">
                    <ControlButtonGroup
                        value={background}
                        onChange={onBackgroundChange}
                        options={PREVIEW_BACKGROUNDS}
                    />
                </ControlSection>

                <div
                    className={cls(
                        "relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[var(--labs-border)] p-6",
                        backgroundClass(background)
                    )}
                >
                    {result.ok ? (
                        <div ref={stageRef} className="flex items-center justify-center" />
                    ) : result.error === "empty" ? (
                        <p className="max-w-xs text-center font-mono text-[0.78rem] leading-relaxed text-[var(--labs-muted)]">
                            Paste an SVG to get started.
                        </p>
                    ) : (
                        <div className="max-w-xs text-center">
                            <p className="mb-1 text-[0.85rem] font-semibold tracking-[0.08em] text-[#f87171]">
                                Invalid SVG
                            </p>
                            <p className="font-mono text-[0.75rem] leading-relaxed text-[var(--labs-muted)]">
                                {result.message}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PlaygroundPreview>
    );
}

export default SvgPreviewPanel;
