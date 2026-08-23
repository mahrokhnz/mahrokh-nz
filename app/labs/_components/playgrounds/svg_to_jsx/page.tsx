"use client";

import {PlaygroundShell} from "@/app/labs/_components/playgrounds/shared/page";
import SvgInputPanel from "./input/page";
import SvgOutputPanel from "./output/page";
import SvgPreviewPanel from "./preview/page";
import {useSvgToJsx} from "./use_svg_to_jsx";

function SvgToJsxPlayground() {
    const {
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
        copied,
        copyOutput,
        pasteFromClipboard,
        clearInput,
        loadExample,
    } = useSvgToJsx();

    return (
        <PlaygroundShell className="max-medium-desktop:flex-col">
            <SvgInputPanel
                value={svgInput}
                clean={clean}
                onChange={setSvgInput}
                onPaste={pasteFromClipboard}
                onClear={clearInput}
                onLoadExample={loadExample}
                onCleanChange={setClean}
            />
            <SvgPreviewPanel
                result={result}
                size={previewSize}
                background={previewBackground}
                onSizeChange={setPreviewSize}
                onBackgroundChange={setPreviewBackground}
            />
            <SvgOutputPanel
                result={result}
                mode={mode}
                componentName={componentName}
                copied={copied}
                onModeChange={setMode}
                onComponentNameChange={setComponentName}
                onCopy={copyOutput}
            />
        </PlaygroundShell>
    );
}

export default SvgToJsxPlayground;
