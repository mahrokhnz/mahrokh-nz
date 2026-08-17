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

function ControlHint({hint}: {hint: string}) {
    return (
        <span
            title={hint}
            className="inline-flex size-3.5 shrink-0 cursor-help items-center justify-center rounded-full border border-[var(--labs-border)] text-[0.55rem] leading-none text-[var(--labs-muted)]"
        >
            ?
            <span className="sr-only">. {hint}</span>
        </span>
    );
}

interface ControlSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    display: string;
    hint?: string;
    onChange: (value: number) => void;
}

function ControlSlider({label, value, min, max, step, display, hint, onChange}: ControlSliderProps) {
    return (
        <label className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 text-[0.78rem]">
                <span className={cls("text-[var(--labs-muted)]", hint && "inline-flex items-center gap-1.5")}>
                    {label}
                    {hint ? <ControlHint hint={hint} /> : null}
                </span>
                <span className="font-mono text-[var(--labs-accent)]">{display}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                aria-valuetext={display}
                onChange={(event) => onChange(Number(event.target.value))}
                className="labs-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[rgba(139,139,255,0.18)]"
            />
        </label>
    );
}

interface ControlSelectProps<T extends string> {
    label: string;
    value: T;
    options: readonly T[] | ReadonlyArray<{value: T; label: string}>;
    hint?: string;
    onChange: (value: T) => void;
}

function ControlSelect<T extends string>({label, value, options, hint, onChange}: ControlSelectProps<T>) {
    const normalized = options.map((option) =>
        typeof option === "string" ? {value: option, label: option} : option
    );

    return (
        <label className="flex flex-col gap-2">
            <span
                className={cls(
                    "text-[0.78rem] text-[var(--labs-muted)]",
                    hint && "inline-flex items-center gap-1.5"
                )}
            >
                {label}
                {hint ? <ControlHint hint={hint} /> : null}
            </span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value as T)}
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

function ControlStack({children}: {children: React.ReactNode}) {
    return <div className="flex flex-col gap-4">{children}</div>;
}

interface ControlButtonGroupProps<T extends string | number> {
    options: Array<{label: React.ReactNode; value: T}>;
    value?: T | null;
    onChange: (value: T) => void;
    className?: string;
    buttonClassName?: string;
}

function ControlButtonGroup<T extends string | number>({
    options,
    value,
    onChange,
    className,
    buttonClassName,
}: ControlButtonGroupProps<T>) {
    return (
        <div className={cls("flex flex-wrap gap-1.5", className)}>
            {options.map((option) => (
                <ControlButton
                    key={String(option.value)}
                    active={value === option.value}
                    className={buttonClassName}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </ControlButton>
            ))}
        </div>
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
            aria-pressed={typeof active === "boolean" ? active : undefined}
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

interface SegmentedButtonsProps<T extends string | number> {
    options: Array<{label: string; value: T}>;
    value: T;
    onChange: (value: T) => void;
}

function SegmentedButtons<T extends string | number>({
    options,
    value,
    onChange,
}: SegmentedButtonsProps<T>) {
    return (
        <div className="flex rounded-lg border border-[var(--labs-border)] p-1">
            {options.map((option) => (
                <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={cls(
                        "flex-1 rounded-md px-2 py-1.5 text-[0.78rem] transition-colors",
                        value === option.value
                            ? "bg-[rgba(139,139,255,0.2)] text-[var(--labs-accent)]"
                            : "text-[var(--labs-muted)] hover:text-white"
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export {
    ControlsSidebar,
    ControlSection,
    ControlStack,
    ControlSlider,
    ControlSelect,
    ControlButton,
    ControlButtonGroup,
    GeneratedCodePanel,
    SegmentedButtons,
};
