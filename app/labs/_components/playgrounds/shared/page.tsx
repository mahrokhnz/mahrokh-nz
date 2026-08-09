"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import cls from "@/utils/class_names";

export const TIMING_FUNCTIONS = [
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
] as const;

export type TimingFunction = (typeof TIMING_FUNCTIONS)[number];

export const TIMING_OPTIONS: Array<{key: TimingFunction; label: string}> = [
    {key: "linear", label: "Linear"},
    {key: "ease", label: "Ease"},
    {key: "ease-in", label: "Ease In"},
    {key: "ease-out", label: "Ease Out"},
    {key: "ease-in-out", label: "In Out"},
];

export function useCopyCss(code: string) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    const copyCss = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    }, [code]);

    return {copied, copyCss};
}

interface PlaygroundShellProps {
    children: React.ReactNode;
    className?: string;
}

export function PlaygroundShell({children, className}: PlaygroundShellProps) {
    return (
        <section
            aria-label="Playground"
            className={cls("flex min-h-[calc(100vh-7.5rem)]", className)}
        >
            {children}
        </section>
    );
}
