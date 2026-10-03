"use client";

import {useCallback, useEffect, useMemo, useRef, useState, type CSSProperties} from "react";
import cls from "@/utils/class_names";
import LabsGrid from "@/app/labs/_components/labs_grid/page";
import {
    ControlButton,
    ControlSection,
    ControlSlider,
    ControlsSidebar,
    GeneratedCodePanel,
    SegmentedButtons,
} from "@/app/labs/_components/playgrounds/controls/page";
import {PlaygroundShell, useCopyCss} from "@/app/labs/_components/playgrounds/shared/page";
import {LuPause, LuPlay, LuRotateCcw} from "react-icons/lu";

type EasingPreset = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier";
type Direction = "normal" | "reverse";
type Playback = "idle" | "playing" | "paused";

type CubicBezier = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

type EasingState = {
    preset: EasingPreset;
    cubic: CubicBezier;
    duration: number;
    direction: Direction;
};

const DEFAULT_CUBIC: CubicBezier = {x1: 0.25, y1: 0.1, x2: 0.25, y2: 1};

const DEFAULT_STATE: EasingState = {
    preset: "ease",
    cubic: DEFAULT_CUBIC,
    duration: 1000,
    direction: "normal",
};

const PRESET_BEZIERS: Record<Exclude<EasingPreset, "cubic-bezier">, CubicBezier> = {
    linear: {x1: 0, y1: 0, x2: 1, y2: 1},
    ease: {x1: 0.25, y1: 0.1, x2: 0.25, y2: 1},
    "ease-in": {x1: 0.42, y1: 0, x2: 1, y2: 1},
    "ease-out": {x1: 0, y1: 0, x2: 0.58, y2: 1},
    "ease-in-out": {x1: 0.42, y1: 0, x2: 0.58, y2: 1},
};

const PRESET_OPTIONS: Array<{key: EasingPreset; label: string}> = [
    {key: "linear", label: "linear"},
    {key: "ease", label: "ease"},
    {key: "ease-in", label: "ease-in"},
    {key: "ease-out", label: "ease-out"},
    {key: "ease-in-out", label: "ease-in-out"},
    {key: "cubic-bezier", label: "cubic-bezier"},
];

const COMPARE_PRESETS: Array<Exclude<EasingPreset, "cubic-bezier">> = [
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
];

const DOT_SIZE = 28;

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function formatCubic(cubic: CubicBezier) {
    return `cubic-bezier(${cubic.x1}, ${cubic.y1}, ${cubic.x2}, ${cubic.y2})`;
}

function getTimingFunction(state: EasingState) {
    return state.preset === "cubic-bezier" ? formatCubic(state.cubic) : state.preset;
}

function getBezierForPreset(state: EasingState): CubicBezier {
    return state.preset === "cubic-bezier" ? state.cubic : PRESET_BEZIERS[state.preset];
}

function BezierCurve({cubic}: {cubic: CubicBezier}) {
    const width = 220;
    const height = 160;
    const pad = 16;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;

    const toX = (t: number) => pad + t * plotW;
    const toY = (p: number) => pad + (1 - p) * plotH;

    const p0 = {x: toX(0), y: toY(0)};
    const p1 = {x: toX(cubic.x1), y: toY(cubic.y1)};
    const p2 = {x: toX(cubic.x2), y: toY(cubic.y2)};
    const p3 = {x: toX(1), y: toY(1)};

    return (
        <figure className="flex flex-col gap-2">
            <figcaption className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--labs-muted)]">
                EASING CURVE
            </figcaption>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full max-w-[280px] rounded-xl border border-[var(--labs-border)] bg-[#0a0a12]"
                role="img"
                aria-label={`Cubic bezier curve ${formatCubic(cubic)}`}
            >
                <line
                    x1={pad}
                    y1={pad}
                    x2={pad}
                    y2={height - pad}
                    stroke="rgba(139,139,255,0.2)"
                    strokeWidth="1"
                />
                <line
                    x1={pad}
                    y1={height - pad}
                    x2={width - pad}
                    y2={height - pad}
                    stroke="rgba(139,139,255,0.2)"
                    strokeWidth="1"
                />
                <text x={pad + 4} y={pad + 10} fill="rgba(122,122,136,0.9)" fontSize="8">
                    Progress
                </text>
                <text x={width - pad - 28} y={height - pad - 6} fill="rgba(122,122,136,0.9)" fontSize="8">
                    Time
                </text>

                <line
                    x1={p0.x}
                    y1={p0.y}
                    x2={p1.x}
                    y2={p1.y}
                    stroke="rgba(139,139,255,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                />
                <line
                    x1={p3.x}
                    y1={p3.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="rgba(139,139,255,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                />

                <path
                    d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`}
                    fill="none"
                    stroke="var(--labs-accent)"
                    strokeWidth="2"
                />

                <circle cx={p0.x} cy={p0.y} r="3.5" fill="var(--labs-accent)" />
                <circle cx={p3.x} cy={p3.y} r="3.5" fill="var(--labs-accent)" />
                <circle cx={p1.x} cy={p1.y} r="4" fill="#0a0a12" stroke="var(--labs-accent)" strokeWidth="1.5" />
                <circle cx={p2.x} cy={p2.y} r="4" fill="#0a0a12" stroke="var(--labs-accent)" strokeWidth="1.5" />
            </svg>
        </figure>
    );
}

function AnimationTrack({
    timing,
    duration,
    direction,
    playId,
    playback,
    reducedMotion,
}: {
    timing: string;
    duration: number;
    direction: Direction;
    playId: number;
    playback: Playback;
    reducedMotion: boolean;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [travel, setTravel] = useState(0);

    useEffect(() => {
        const node = trackRef.current;
        if (!node) return;

        const measure = () => {
            setTravel(Math.max(0, node.clientWidth - DOT_SIZE));
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const animationStyle: CSSProperties =
        playback === "idle" || reducedMotion
            ? {
                  transform: direction === "reverse" ? `translateX(${travel}px)` : "translateX(0px)",
                  animation: "none",
              }
            : {
                  ["--labs-easing-travel" as string]: `${travel}px`,
                  animationName: "labs-easing-move",
                  animationDuration: `${duration}ms`,
                  animationTimingFunction: timing,
                  animationDirection: direction,
                  animationFillMode: "forwards",
                  animationPlayState: playback === "paused" ? "paused" : "running",
              };

    return (
        <div className="flex w-full max-w-[560px] flex-col gap-3">
            <div className="flex items-center justify-between text-[0.72rem] font-semibold tracking-[0.14em] text-[var(--labs-muted)]">
                <span>START</span>
                <span>END</span>
            </div>
            <div ref={trackRef} className="relative h-12 w-full">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[rgba(139,139,255,0.28)]" />
                <span className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[var(--labs-accent)]" />
                <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[var(--labs-accent)]" />
                <div
                    key={playId}
                    className="absolute top-1/2 size-7 -translate-y-1/2 rounded-lg border border-[rgba(139,139,255,0.7)] bg-[rgba(139,139,255,0.22)] shadow-[0_0_20px_rgba(139,139,255,0.25)]"
                    style={animationStyle}
                    aria-hidden
                />
            </div>
        </div>
    );
}

function CompareRow({
    label,
    timing,
    duration,
    direction,
    playId,
    playback,
    reducedMotion,
}: {
    label: string;
    timing: string;
    duration: number;
    direction: Direction;
    playId: number;
    playback: Playback;
    reducedMotion: boolean;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [travel, setTravel] = useState(0);

    useEffect(() => {
        const node = trackRef.current;
        if (!node) return;
        const measure = () => setTravel(Math.max(0, node.clientWidth - 18));
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const animationStyle: CSSProperties =
        playback === "idle" || reducedMotion
            ? {
                  transform: direction === "reverse" ? `translateX(${travel}px)` : "translateX(0px)",
                  animation: "none",
              }
            : {
                  ["--labs-easing-travel" as string]: `${travel}px`,
                  animationName: "labs-easing-move",
                  animationDuration: `${duration}ms`,
                  animationTimingFunction: timing,
                  animationDirection: direction,
                  animationFillMode: "forwards",
                  animationPlayState: playback === "paused" ? "paused" : "running",
              };

    return (
        <div className="grid grid-cols-[96px_1fr] items-center gap-3">
            <span className="font-mono text-[0.72rem] text-[var(--labs-muted)]">{label}</span>
            <div ref={trackRef} className="relative h-6 w-full">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[rgba(139,139,255,0.18)]" />
                <div
                    key={`${label}-${playId}`}
                    className="absolute top-1/2 size-[18px] -translate-y-1/2 rounded-md border border-[rgba(139,139,255,0.55)] bg-[rgba(139,139,255,0.2)]"
                    style={animationStyle}
                    aria-hidden
                />
            </div>
        </div>
    );
}

function CssEasingVisualizerPlayground() {
    const [state, setState] = useState<EasingState>(DEFAULT_STATE);
    const [playback, setPlayback] = useState<Playback>("idle");
    const [playId, setPlayId] = useState(0);
    const [compare, setCompare] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const endTimer = useRef<number | null>(null);

    const clearEndTimer = () => {
        if (endTimer.current) {
            window.clearTimeout(endTimer.current);
            endTimer.current = null;
        }
    };

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setReducedMotion(media.matches);
        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    useEffect(() => () => clearEndTimer(), []);

    const update = <K extends keyof EasingState>(key: K, value: EasingState[K]) => {
        setState((prev) => ({...prev, [key]: value}));
    };

    const updateCubic = <K extends keyof CubicBezier>(key: K, value: number) => {
        setState((prev) => ({
            ...prev,
            preset: "cubic-bezier",
            cubic: {...prev.cubic, [key]: value},
        }));
    };

    const timing = useMemo(() => getTimingFunction(state), [state]);
    const curve = useMemo(() => getBezierForPreset(state), [state]);

    const play = useCallback(() => {
        clearEndTimer();
        setPlayId((value) => value + 1);
        setPlayback("playing");
        endTimer.current = window.setTimeout(() => {
            setPlayback("idle");
        }, state.duration + 40);
    }, [state.duration]);

    const pause = () => {
        if (playback !== "playing") return;
        clearEndTimer();
        setPlayback("paused");
    };

    const resetAll = () => {
        clearEndTimer();
        setState(DEFAULT_STATE);
        setPlayback("idle");
        setCompare(false);
        setPlayId((value) => value + 1);
    };

    const generatedCss = useMemo(() => {
        return `.element {
  animation: move ${state.duration}ms ${timing} ${state.direction} forwards;
}

@keyframes move {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}`;
    }, [state.duration, state.direction, timing]);

    const {copied, copyCss} = useCopyCss(generatedCss);

    return (
        <PlaygroundShell className="gap-0 max-small-desktop:flex-col">
            <section
                aria-label="Easing preview"
                className="relative flex min-h-[480px] flex-1 flex-col"
            >
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--labs-border)] px-5 py-3">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--labs-muted)]">
                            PREVIEW
                        </h2>
                        <p className="font-mono text-[0.75rem] text-[var(--labs-accent)]">
                            {timing} · {state.duration}ms · {state.direction}
                        </p>
                    </div>
                    <ControlButton active={compare} onClick={() => setCompare((value) => !value)}>
                        Compare
                    </ControlButton>
                </header>

                <div className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden p-6 max-phone:p-4">
                    <LabsGrid variant="scene" />

                    <AnimationTrack
                        timing={timing}
                        duration={state.duration}
                        direction={state.direction}
                        playId={playId}
                        playback={playback}
                        reducedMotion={reducedMotion}
                    />

                    <div className="relative z-[1] w-full max-w-[280px]">
                        <BezierCurve cubic={curve} />
                    </div>

                    {compare ? (
                        <div className="relative z-[1] flex w-full max-w-[560px] flex-col gap-3 rounded-xl border border-[var(--labs-border)] bg-[rgba(8,8,14,0.85)] p-4">
                            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--labs-muted)]">
                                COMPARE
                            </p>
                            {COMPARE_PRESETS.map((preset) => (
                                <CompareRow
                                    key={preset}
                                    label={preset}
                                    timing={preset}
                                    duration={state.duration}
                                    direction={state.direction}
                                    playId={playId}
                                    playback={playback}
                                    reducedMotion={reducedMotion}
                                />
                            ))}
                        </div>
                    ) : null}

                    {reducedMotion ? (
                        <p className="relative z-[1] text-center text-[0.8rem] text-[var(--labs-muted)]">
                            Reduced motion is enabled. Configuration and CSS remain available.
                        </p>
                    ) : null}
                </div>
            </section>

            <ControlsSidebar
                title="CONTROLS"
                side="right"
                maxWidthClassName="max-w-[340px]"
                headerAction={<ControlButton onClick={resetAll}>Reset</ControlButton>}
            >
                <ControlSection title="EASING">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-1.5">
                            {PRESET_OPTIONS.map((option) => (
                                <ControlButton
                                    key={option.key}
                                    active={state.preset === option.key}
                                    onClick={() => update("preset", option.key)}
                                >
                                    {option.label}
                                </ControlButton>
                            ))}
                        </div>

                        {state.preset === "cubic-bezier" ? (
                            <div className="flex flex-col gap-4">
                                <ControlSlider
                                    label="X1"
                                    value={state.cubic.x1}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    display={state.cubic.x1.toFixed(2)}
                                    onChange={(value) => updateCubic("x1", clamp(value, 0, 1))}
                                />
                                <ControlSlider
                                    label="Y1"
                                    value={state.cubic.y1}
                                    min={-2}
                                    max={2}
                                    step={0.01}
                                    display={state.cubic.y1.toFixed(2)}
                                    onChange={(value) => updateCubic("y1", value)}
                                />
                                <ControlSlider
                                    label="X2"
                                    value={state.cubic.x2}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    display={state.cubic.x2.toFixed(2)}
                                    onChange={(value) => updateCubic("x2", clamp(value, 0, 1))}
                                />
                                <ControlSlider
                                    label="Y2"
                                    value={state.cubic.y2}
                                    min={-2}
                                    max={2}
                                    step={0.01}
                                    display={state.cubic.y2.toFixed(2)}
                                    onChange={(value) => updateCubic("y2", value)}
                                />
                            </div>
                        ) : null}
                    </div>
                </ControlSection>

                <ControlSection title="TIMING" divided>
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
                        <div className="flex flex-col gap-2">
                            <span className="text-[0.78rem] text-[var(--labs-muted)]">Direction</span>
                            <SegmentedButtons
                                value={state.direction}
                                onChange={(value) => update("direction", value)}
                                options={[
                                    {label: "Normal", value: "normal"},
                                    {label: "Reverse", value: "reverse"},
                                ]}
                            />
                        </div>
                    </div>
                </ControlSection>

                <ControlSection title="PLAYBACK" divided>
                    <div className="flex flex-col gap-2.5">
                        <div className="grid grid-cols-2 gap-2.5">
                            <button
                                type="button"
                                onClick={play}
                                aria-label={playback === "idle" ? "Play animation" : "Replay animation"}
                                className={cls(
                                    "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[0.85rem] transition-colors",
                                    playback === "playing"
                                        ? "border-[var(--labs-accent)] bg-[rgba(139,139,255,0.2)] text-[var(--labs-accent)]"
                                        : "border-[var(--labs-accent)]/50 bg-[rgba(139,139,255,0.12)] text-[var(--labs-accent)] hover:bg-[rgba(139,139,255,0.2)]"
                                )}
                            >
                                <LuPlay className="size-3" />
                                {playback === "idle" ? "Play" : "Replay"}
                            </button>
                            <button
                                type="button"
                                onClick={pause}
                                aria-label="Pause animation"
                                disabled={playback !== "playing"}
                                className={cls(
                                    "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[0.85rem] transition-colors",
                                    playback === "playing"
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
                            aria-label="Reset easing visualizer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--labs-border)] px-3 py-2.5 text-[0.85rem] text-[var(--labs-muted)] transition-colors hover:border-[var(--labs-border-strong)] hover:text-white"
                        >
                            <LuRotateCcw className="size-3" />
                            Reset
                        </button>
                    </div>
                </ControlSection>

                <ControlSection title="GENERATED CSS" divided>
                    <GeneratedCodePanel
                        code={generatedCss}
                        copied={copied}
                        onCopy={copyCss}
                        compact
                    />
                </ControlSection>
            </ControlsSidebar>
        </PlaygroundShell>
    );
}

export default CssEasingVisualizerPlayground;
