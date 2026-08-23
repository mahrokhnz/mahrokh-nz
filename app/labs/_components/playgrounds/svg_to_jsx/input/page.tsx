import {
    ControlButton,
    ControlButtonGroup,
    ControlSection,
    ControlsSidebar,
} from "@/app/labs/_components/playgrounds/controls/page";
import {SVG_INPUT_PLACEHOLDER} from "../constants";

interface SvgInputPanelProps {
    value: string;
    clean: boolean;
    onChange: (value: string) => void;
    onPaste: () => void;
    onClear: () => void;
    onLoadExample: () => void;
    onCleanChange: (clean: boolean) => void;
}

function SvgInputPanel({
    value,
    clean,
    onChange,
    onPaste,
    onClear,
    onLoadExample,
    onCleanChange,
}: SvgInputPanelProps) {
    return (
        <ControlsSidebar
            title="SVG INPUT"
            side="left"
            maxWidthClassName="max-w-[400px]"
            headerAction={
                <div className="flex flex-wrap gap-1.5">
                    <ControlButton onClick={onPaste}>Paste</ControlButton>
                    <ControlButton onClick={onClear}>Clear</ControlButton>
                </div>
            }
        >
            <ControlSection>
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={SVG_INPUT_PLACEHOLDER}
                    spellCheck={false}
                    aria-label="SVG markup input"
                    className="min-h-[320px] w-full flex-1 resize-y rounded-xl border border-[var(--labs-border)] bg-[#0a0a12] p-3 font-mono text-[0.72rem] leading-relaxed text-[rgba(190,190,255,0.88)] outline-none transition-colors placeholder:text-[var(--labs-muted)]/55 focus:border-[var(--labs-border-strong)] max-medium-desktop:min-h-[220px]"
                />
            </ControlSection>

            <ControlSection title="OPTIONS" divided>
                <div className="flex flex-col gap-3">
                    <ControlButtonGroup
                        value={clean ? "clean" : "raw"}
                        onChange={(next) => onCleanChange(next === "clean")}
                        options={[
                            {label: "Preserve", value: "raw"},
                            {label: "Clean SVG", value: "clean"},
                        ]}
                    />
                    <p className="text-[0.72rem] leading-relaxed text-[var(--labs-muted)]">
                        Clean removes XML declarations and editor-only metadata without changing
                        visual output.
                    </p>
                    <ControlButton onClick={onLoadExample}>
                        Load example
                    </ControlButton>
                </div>
            </ControlSection>
        </ControlsSidebar>
    );
}

export default SvgInputPanel;
