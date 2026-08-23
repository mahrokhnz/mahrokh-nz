"use client";

import {useCallback, useMemo, useState} from "react";
import {useCopyCss} from "@/app/labs/_components/playgrounds/shared/page";
import {convertSvgToJsx, sanitizeComponentName} from "./converter";
import {
    DEFAULT_COMPONENT_NAME,
    EXAMPLE_SVG,
    type OutputMode,
    type PreviewBackground,
    type PreviewSize,
} from "./constants";

export function useSvgToJsx() {
    const [svgInput, setSvgInput] = useState(EXAMPLE_SVG);
    const [mode, setMode] = useState<OutputMode>("jsx");
    const [componentName, setComponentName] = useState(DEFAULT_COMPONENT_NAME);
    const [clean, setClean] = useState(false);
    const [previewSize, setPreviewSize] = useState<PreviewSize>("medium");
    const [previewBackground, setPreviewBackground] = useState<PreviewBackground>("dark");

    const result = useMemo(
        () =>
            convertSvgToJsx(svgInput, {
                mode,
                componentName: sanitizeComponentName(componentName),
                clean,
            }),
        [svgInput, mode, componentName, clean]
    );

    const outputCode = result.ok ? result.jsx : "";
    const {copied, copyCss} = useCopyCss(outputCode);

    const pasteFromClipboard = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text.trim()) setSvgInput(text);
        } catch {
            // Clipboard permission may be denied; ignore silently.
        }
    }, []);

    const clearInput = useCallback(() => {
        setSvgInput("");
    }, []);

    const loadExample = useCallback(() => {
        setSvgInput(EXAMPLE_SVG);
    }, []);

    return {
        svgInput,
        setSvgInput,
        mode,
        setMode,
        componentName,
        setComponentName,
        clean,
        setClean,
        previewSize,
        setPreviewSize,
        previewBackground,
        setPreviewBackground,
        result,
        outputCode,
        copied,
        copyOutput: copyCss,
        pasteFromClipboard,
        clearInput,
        loadExample,
    };
}
