"use client";

import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import cls from "@/utils/class_names";
import LabsGrid from "@/app/labs/_components/labs_grid";
import {
    ControlSection,
    ControlSlider,
    ControlsSidebar,
    GeneratedCodePanel,
} from "@/app/labs/_components/playgrounds/controls_sidebar";
import {
    PlaygroundShell,
    TIMING_OPTIONS,
    useCopyCss,
    type TimingFunction,
} from "@/app/labs/_components/playgrounds/shared";
import {LuPlay, LuPause} from "react-icons/lu";

type ComponentKey = "button" | "card" | "modal" | "tooltip" | "toast";

type MotionState = {
    rotateX: number;
    rotateY: number;
    scale: number;
    translateX: number;
    translateY: number;
    opacity: number;
    duration: number;
    delay: number;
    timing: TimingFunction;
};

const DEFAULT_STATE: MotionState = {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    duration: 600,
    delay: 0,
    timing: "ease",
};

const FROM_TRANSFORM = "rotateX(0deg) rotateY(0deg) scale(0.92) translate(0px, 24px)";
const FROM_OPACITY = 0;

const COMPONENTS: Array<{key: ComponentKey; label: string}> = [
    {key: "button", label: "Button"},
    {key: "card", label: "Card"},
    {key: "modal", label: "Modal"},
    {key: "tooltip", label: "Tooltip"},
    {key: "toast", label: "Toast"},
];

function buildTransform(state: MotionState) {
    return [
        `rotateX(${state.rotateX}deg)`,
        `rotateY(${state.rotateY}deg)`,
        `scale(${state.scale})`,
        `translate(${state.translateX}px, ${state.translateY}px)`,
    ].join(" ");
}

function PreviewComponent({type}: {type: ComponentKey}) {
    switch (type) {
        case "button":
            return (
                <button
                    type="button"
                    className="rounded-xl bg-[linear-gradient(135deg,#6e6ef0,#8b8bff)] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-[0_0_28px_rgba(139,139,255,0.35)]"
                >
                    Get Started →
                </button>
            );
        case "card":
            return (
                <div className="w-[280px] rounded-2xl border border-[var(--labs-border)] bg-[rgba(18,18,28,0.95)] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                    <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-[rgba(139,139,255,0.2)] text-[var(--labs-accent)]">
                        ✓
                    </div>
                    <h4 className="mb-2 text-[1rem] font-semibold text-white">Deploy in seconds</h4>
                    <p className="mb-3 text-[0.85rem] leading-relaxed text-[var(--labs-muted)]">
                        Push your changes and ship instantly. Zero configuration required.
                    </p>
                    <span className="text-[0.85rem] text-[var(--labs-accent)]">Learn more →</span>
                </div>
            );
        case "modal":
            return (
                <div className="w-[320px] rounded-2xl border border-[var(--labs-border)] bg-[rgba(18,18,28,0.98)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-[rgba(239,68,68,0.15)] text-[1.1rem] text-[#f87171]">
                        !
                    </div>
                    <h4 className="mb-2 text-[1.05rem] font-semibold text-white">Publish to production?</h4>
                    <p className="mb-5 text-[0.85rem] leading-relaxed text-[var(--labs-muted)]">
                        This action will push your changes live. Make sure everything looks right.
                    </p>
                    <div className="flex justify-end gap-2">
                        <span className="rounded-lg border border-[var(--labs-border)] px-3 py-1.5 text-[0.8rem] text-[var(--labs-muted)]">
                            Cancel
                        </span>
                        <span className="rounded-lg bg-[var(--labs-accent)] px-3 py-1.5 text-[0.8rem] font-medium text-[#0a0a12]">
                            Publish
                        </span>
                    </div>
                </div>
            );
        case "tooltip":
            return (
                <div className="relative flex flex-col items-center gap-3">
                    <div className="rounded-lg border border-[var(--labs-border)] bg-[rgba(18,18,28,0.98)] px-3 py-2 text-[0.8rem] text-white shadow-lg">
                        + Deploy to production
                        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[rgba(18,18,28,0.98)]" />
                    </div>
                    <button
                        type="button"
                        className="rounded-lg bg-[var(--labs-accent)] px-4 py-2 text-[0.85rem] font-semibold text-[#0a0a12]"
                    >
                        Deploy button
                    </button>
                </div>
            );
        case "toast":
            return (
                <div className="flex w-[320px] items-start gap-3 rounded-xl border border-[var(--labs-border)] bg-[rgba(18,18,28,0.98)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(34,197,94,0.2)] text-[0.75rem] text-[#4ade80]">
                        ✓
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-[0.9rem] font-semibold text-white">Deploy successful</p>
                        <p className="text-[0.8rem] text-[var(--labs-muted)]">
                            Your changes are now live in production.
                        </p>
                    </div>
                    <span className="text-[var(--labs-muted)]">×</span>
                </div>
            );
    }
}

function MotionPlayground() {
    const [state, setState] = useState<MotionState>(DEFAULT_STATE);
    const [component, setComponent] = useState<ComponentKey>("button");
    const [mode, setMode] = useState<"live" | "from" | "playing">("live");
    const endTimer = useRef<number | null>(null);

    const clearEndTimer = () => {
        if (endTimer.current) {
            window.clearTimeout(endTimer.current);
            endTimer.current = null;
        }
    };

    const update = <K extends keyof MotionState>(key: K, value: MotionState[K]) => {
        setState((prev) => ({...prev, [key]: value}));
        setMode("live");
        clearEndTimer();
    };

    const play = useCallback(() => {
        clearEndTimer();
        setMode("from");
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                setMode("playing");
                endTimer.current = window.setTimeout(() => {
                    setMode("live");
                }, state.duration + state.delay + 40);
            });
        });
    }, [state.duration, state.delay]);

    const pause = () => {
        clearEndTimer();
        setMode("live");
    };

    const resetAll = () => {
        clearEndTimer();
        setState(DEFAULT_STATE);
        setMode("live");
    };

    useEffect(() => () => clearEndTimer(), []);

    const targetTransform = useMemo(() => buildTransform(state), [state]);

    const previewStyle = useMemo((): React.CSSProperties => {
        const transition =
            mode === "playing"
                ? `transform ${state.duration}ms ${state.timing} ${state.delay}ms, opacity ${state.duration}ms ${state.timing} ${state.delay}ms`
                : "none";

        if (mode === "from") {
            return {
                transform: FROM_TRANSFORM,
                opacity: FROM_OPACITY,
                transition: "none",
            };
        }

        return {
            transform: targetTransform,
            opacity: state.opacity,
            transition,
        };
    }, [mode, state, targetTransform]);

    const generatedCss = useMemo(() => {
        return `.element {
  transform: ${FROM_TRANSFORM};
  opacity: ${FROM_OPACITY};
  transition:
    transform ${state.duration}ms ${state.timing},
    opacity ${state.duration}ms ${state.timing};
  transition-delay: ${state.delay}ms;
}

.element.animate {
  transform: ${targetTransform};
  opacity: ${state.opacity};
}`;
    }, [state, targetTransform]);

    const {copied, copyCss} = useCopyCss(generatedCss);

    const timingLabel = TIMING_OPTIONS.find((option) => option.key === state.timing)?.label ?? "Ease";
    const isPlaying = mode === "playing" || mode === "from";

    return (
        <PlaygroundShell className="max-medium-desktop:flex-col">
            <ControlsSidebar title="ANIMATION CONTROLS" side="left">
                <ControlSection title="TRANSFORM">
                    <div className="flex flex-col gap-4">
                        <ControlSlider
                            label="Rotate X"
                            value={state.rotateX}
                            min={-180}
                            max={180}
                            step={1}
                            display={`${state.rotateX}°`}
                            onChange={(value) => update("rotateX", value)}
                        />
                        <ControlSlider
                            label="Rotate Y"
                            value={state.rotateY}
                            min={-180}
                            max={180}
                            step={1}
                            display={`${state.rotateY}°`}
                            onChange={(value) => update("rotateY", value)}
                        />
                        <ControlSlider
                            label="Scale"
                            value={state.scale}
                            min={0.2}
                            max={3}
                            step={0.01}
                            display={state.scale.toFixed(2)}
                            onChange={(value) => update("scale", value)}
                        />
                        <ControlSlider
                            label="Translate X"
                            value={state.translateX}
                            min={-250}
                            max={250}
                            step={1}
                            display={`${state.translateX}px`}
                            onChange={(value) => update("translateX", value)}
                        />
                        <ControlSlider
                            label="Translate Y"
                            value={state.translateY}
                            min={-250}
                            max={250}
                            step={1}
                            display={`${state.translateY}px`}
                            onChange={(value) => update("translateY", value)}
                        />
                        <ControlSlider
                            label="Opacity"
                            value={state.opacity}
                            min={0}
                            max={1}
                            step={0.01}
                            display={state.opacity.toFixed(2)}
                            onChange={(value) => update("opacity", value)}
                        />
                    </div>
                </ControlSection>

                <ControlSection title="TRANSITION" divided>
                    <div className="flex flex-col gap-4">
                        <ControlSlider
                            label="Duration"
                            value={state.duration}
                            min={100}
                            max={3000}
                            step={50}
                            display={`${state.duration}ms`}
                            onChange={(value) => update("duration", value)}
                        />
                        <ControlSlider
                            label="Delay"
                            value={state.delay}
                            min={0}
                            max={2000}
                            step={50}
                            display={`${state.delay}ms`}
                            onChange={(value) => update("delay", value)}
                        />

                        <div className="flex flex-col gap-2">
                            <span className="text-[0.78rem] text-[var(--labs-muted)]">
                                Timing Function
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {TIMING_OPTIONS.map((option) => (
                                    <button
                                        key={option.key}
                                        type="button"
                                        onClick={() => update("timing", option.key)}
                                        className={cls(
                                            "rounded-md border px-2.5 py-1.5 text-[0.72rem] transition-colors",
                                            state.timing === option.key
                                                ? "border-[var(--labs-accent)] bg-[rgba(139,139,255,0.18)] text-[var(--labs-accent)]"
                                                : "border-[var(--labs-border)] text-[var(--labs-muted)] hover:text-white"
                                        )}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ControlSection>

                <ControlSection title="ANIMATION" divided>
                    <div className="flex flex-col gap-2.5">
                        <div className="grid grid-cols-2 gap-2.5">
                            <button
                                type="button"
                                onClick={play}
                                className={cls(
                                    "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[0.85rem] transition-colors",
                                    isPlaying
                                        ? "border-[var(--labs-accent)] bg-[rgba(139,139,255,0.2)] text-[var(--labs-accent)]"
                                        : "border-[var(--labs-accent)]/50 bg-[rgba(139,139,255,0.12)] text-[var(--labs-accent)] hover:bg-[rgba(139,139,255,0.2)]"
                                )}
                            >
                                <LuPlay className="size-3" />
                                Play
                            </button>
                            <button
                                type="button"
                                onClick={pause}
                                className={cls(
                                    "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[0.85rem] transition-colors",
                                    isPlaying
                                        ? "border-[var(--labs-border)] text-[var(--labs-muted)] hover:text-white"
                                        : "border-[var(--labs-border)] text-[var(--labs-muted)]/45"
                                )}
                            >
                                <LuPause className="size-3" />
                                Pause
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={resetAll}
                            className="rounded-lg border border-[var(--labs-border)] px-3 py-2.5 text-[0.85rem] text-[var(--labs-muted)] transition-colors hover:border-[var(--labs-border-strong)] hover:text-white"
                        >
                            Reset all
                        </button>
                    </div>
                </ControlSection>
            </ControlsSidebar>

            <section
                aria-label="Animation preview"
                className="relative flex min-h-[480px] flex-1 flex-col"
            >
                <header className="flex flex-wrap items-center gap-2 border-b border-[var(--labs-border)] px-5 py-3">
                    <span className="mr-1 text-[0.7rem] font-semibold tracking-[0.14em] text-[var(--labs-muted)]">
                        COMPONENT
                    </span>
                    <nav aria-label="Preview component" className="contents">
                        {COMPONENTS.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => {
                                    setComponent(item.key);
                                    setMode("live");
                                    clearEndTimer();
                                }}
                                className={cls(
                                    "rounded-md border px-3 py-1.5 text-[0.8rem] transition-colors",
                                    component === item.key
                                        ? "border-[var(--labs-accent)] bg-[rgba(139,139,255,0.16)] text-[var(--labs-accent)]"
                                        : "border-[var(--labs-border)] text-[var(--labs-muted)] hover:text-white"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </header>

                <div className="relative flex flex-1 items-center justify-center overflow-hidden p-8">
                    <LabsGrid variant="scene" />
                    <div className="relative" style={previewStyle}>
                        <PreviewComponent type={component} />
                    </div>
                </div>

                <footer className="flex items-center justify-center border-t border-[var(--labs-border)] px-5 py-3">
                    <p className="font-mono text-[0.75rem] text-[var(--labs-muted)]">
                        {state.duration}ms {timingLabel.toLowerCase()}
                    </p>
                </footer>
            </section>

            <ControlsSidebar title="GENERATED CSS" side="right" maxWidthClassName="max-w-[320px]">
                <GeneratedCodePanel code={generatedCss} copied={copied} onCopy={copyCss} />
            </ControlsSidebar>
        </PlaygroundShell>
    );
}

export default MotionPlayground;
