import cls from "@/utils/class_names";
import {LuCopy} from "react-icons/lu";

interface ControlsSidebarProps {
    title: string;
    side?: "left" | "right";
    headerAction?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    maxWidthClassName?: string;
}

function ControlsSidebar({
    title,
    side = "left",
    headerAction,
    children,
    className,
    maxWidthClassName = "max-w-[300px]",
}: ControlsSidebarProps) {
    return (
        <aside
            className={cls(
                "flex w-full shrink-0 flex-col bg-[#08080e]",
                maxWidthClassName,
                side === "left"
                    ? "border-r border-[var(--labs-border)] max-medium-desktop:max-w-none max-medium-desktop:border-r-0 max-medium-desktop:border-b"
                    : "border-l border-[var(--labs-border)] max-medium-desktop:max-w-none max-medium-desktop:border-l-0 max-medium-desktop:border-t max-small-desktop:max-w-none max-small-desktop:border-l-0 max-small-desktop:border-t",
                className
            )}
        >
            <header
                className={cls(
                    "border-b border-[var(--labs-border)] px-5 py-4",
                    headerAction && "flex items-center justify-between gap-3"
                )}
            >
                <h2 className="text-[0.75rem] font-semibold tracking-[0.18em] text-[var(--labs-muted)]">
                    {title}
                </h2>
                {headerAction}
            </header>
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">{children}</div>
        </aside>
    );
}

interface ControlSectionProps {
    title?: string;
    divided?: boolean;
    headerAction?: React.ReactNode;
    children: React.ReactNode;
}

function ControlSection({title, divided = false, headerAction, children}: ControlSectionProps) {
    return (
        <section className={cls(divided && "border-t border-[var(--labs-border)] pt-5")}>
            {title ? (
                <header className={cls("mb-3", headerAction && "flex items-center justify-between gap-3")}>
                    <h3 className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--labs-muted)]">
                        {title}
                    </h3>
                    {headerAction}
                </header>
            ) : null}
            {children}
        </section>
    );
}

interface ControlSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    display: string;
    onChange: (value: number) => void;
}

function ControlSlider({label, value, min, max, step, display, onChange}: ControlSliderProps) {
    return (
        <label className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 text-[0.78rem]">
                <span className="text-[var(--labs-muted)]">{label}</span>
                <span className="font-mono text-[var(--labs-accent)]">{display}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className="labs-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[rgba(139,139,255,0.18)]"
            />
        </label>
    );
}

interface ControlSelectProps {
    label: string;
    value: string;
    options: readonly string[] | Array<{value: string; label: string}>;
    onChange: (value: string) => void;
}

function ControlSelect({label, value, options, onChange}: ControlSelectProps) {
    const normalized = options.map((option) =>
        typeof option === "string" ? {value: option, label: option} : option
    );

    return (
        <label className="flex flex-col gap-2">
            <span className="text-[0.78rem] text-[var(--labs-muted)]">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="rounded-md border border-[var(--labs-border)] bg-[#0c0c14] px-3 py-2 font-mono text-[0.8rem] text-[var(--labs-accent)] outline-none transition-colors focus:border-[var(--labs-border-strong)]"
            >
                {normalized.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

interface ControlButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    muted?: boolean;
    className?: string;
}

function ControlButton({children, onClick, active, muted, className}: ControlButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cls(
                "rounded-md border px-2.5 py-1 text-[0.75rem] transition-colors",
                active
                    ? "border-[var(--labs-accent)] text-[var(--labs-accent)]"
                    : muted
                      ? "border-[var(--labs-border)] text-[var(--labs-muted)]/45"
                      : "border-[var(--labs-border)] text-[var(--labs-muted)] hover:border-[var(--labs-border-strong)] hover:text-white",
                className
            )}
        >
            {children}
        </button>
    );
}

interface GeneratedCodePanelProps {
    code: string;
    copied?: boolean;
    onCopy: () => void;
    compact?: boolean;
    copyLabel?: string;
}

function GeneratedCodePanel({
    code,
    copied = false,
    onCopy,
    compact = false,
    copyLabel = "Copy CSS",
}: GeneratedCodePanelProps) {
    return (
        <figure className={cls("flex flex-col gap-4", compact && "gap-3")}>
            <pre
                className={cls(
                    "overflow-auto rounded-xl border border-[var(--labs-border)] bg-[#0a0a12] p-3 font-mono text-[0.7rem] leading-relaxed text-[rgba(190,190,255,0.88)]",
                    compact ? "max-h-56" : "min-h-[220px] flex-1"
                )}
            >
                <code>{code}</code>
            </pre>
            <figcaption className="sr-only">Generated code</figcaption>
            <button
                type="button"
                onClick={onCopy}
                className={cls(
                    "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[0.85rem] transition-colors",
                    compact && "rounded-md px-2.5 py-1 text-[0.75rem]",
                    copied
                        ? "border-[var(--labs-accent)] text-[var(--labs-accent)]"
                        : "border-[var(--labs-border)] text-[var(--labs-muted)] hover:border-[var(--labs-border-strong)] hover:text-white"
                )}
            >
                {!compact ? <LuCopy className="size-3.5" /> : null}
                {copied ? "Copied" : copyLabel}
            </button>
        </figure>
    );
}

export {
    ControlsSidebar,
    ControlSection,
    ControlSlider,
    ControlSelect,
    ControlButton,
    GeneratedCodePanel,
};
