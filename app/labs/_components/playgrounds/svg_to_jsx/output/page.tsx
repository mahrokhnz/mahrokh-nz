import {
    ControlSection,
    ControlsSidebar,
    GeneratedCodePanel,
    SegmentedButtons,
} from "@/app/labs/_components/playgrounds/controls/page";
import type {ConvertResult} from "../converter";
import {OUTPUT_TABS, type OutputMode} from "../constants";

interface SvgOutputPanelProps {
    result: ConvertResult;
    mode: OutputMode;
    componentName: string;
    copied: boolean;
    onModeChange: (mode: OutputMode) => void;
    onComponentNameChange: (name: string) => void;
    onCopy: () => void;
}

function SvgOutputPanel({
    result,
    mode,
    componentName,
    copied,
    onModeChange,
    onComponentNameChange,
    onCopy,
}: SvgOutputPanelProps) {
    const code = result.ok
        ? result.jsx
        : result.error === "empty"
          ? "// Paste an SVG to get started."
          : `// Invalid SVG\n// ${result.message}`;

    return (
        <ControlsSidebar title="REACT JSX" side="right" maxWidthClassName="max-w-[360px]">
            <SegmentedButtons value={mode} onChange={onModeChange} options={OUTPUT_TABS} />

            {mode === "component" ? (
                <ControlSection title="COMPONENT NAME">
                    <label className="flex flex-col gap-2">
                        <span className="sr-only">Component name</span>
                        <input
                            type="text"
                            value={componentName}
                            onChange={(event) => onComponentNameChange(event.target.value)}
                            spellCheck={false}
                            className="rounded-md border border-[var(--labs-border)] bg-[#0c0c14] px-3 py-2 font-mono text-[0.8rem] text-[var(--labs-accent)] outline-none transition-colors focus:border-[var(--labs-border-strong)]"
                        />
                    </label>
                </ControlSection>
            ) : null}

            <GeneratedCodePanel
                code={code}
                copied={result.ok && copied}
                onCopy={result.ok ? onCopy : () => undefined}
                copyLabel={mode === "component" ? "Copy Component" : "Copy JSX"}
            />
        </ControlsSidebar>
    );
}

export default SvgOutputPanel;
