"use client";

import {useMemo, useState} from "react";
import cls from "@/utils/class_names";
import LabsGrid from "@/app/labs/_components/labs_grid";

const CUBE_SIZE = 240;

const TRANSFORM_ORIGINS = [
    "center",
    "top left",
    "top right",
    "bottom left",
    "bottom right",
    "left",
    "right",
    "top",
    "bottom",
] as const;

const TIMING_FUNCTIONS = [
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
] as const;

type TransformOrigin = (typeof TRANSFORM_ORIGINS)[number];
type TimingFunction = (typeof TIMING_FUNCTIONS)[number];

type CubeState = {
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
    perspective: number;
    transformOrigin: TransformOrigin;
    translateX: number;
    translateY: number;
    translateZ: number;
    animationSpeed: number;
    timingFunction: TimingFunction;
};

const DEFAULT_STATE: CubeState = {
    rotateX: 20,
    rotateY: 45,
    rotateZ: 0,
    scale: 1,
    perspective: 600,
    transformOrigin: "center",
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    animationSpeed: 0,
    timingFunction: "linear",
};

const FACES = [
    {id: "front", label: "FRONT", transform: `translateZ(${CUBE_SIZE / 2}px)`},
    {id: "back", label: "BACK", transform: `rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`},
    {id: "right", label: "RIGHT", transform: `rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`},
    {id: "left", label: "LEFT", transform: `rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`},
    {id: "top", label: "TOP", transform: `rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`},
    {id: "bottom", label: "BOTTOM", transform: `rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`},
] as const;

function SliderControl({
    label,
    value,
    min,
    max,
    step,
    display,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    display: string;
    onChange: (value: number) => void;
}) {
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

function SectionTitle({children}: {children: React.ReactNode}) {
    return (
        <h3 className="mb-3 text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--labs-muted)]">
            {children}
        </h3>
    );
}

function Css3dCubePlayground() {
    const [state, setState] = useState<CubeState>(DEFAULT_STATE);
    const [copied, setCopied] = useState(false);

    const update = <K extends keyof CubeState>(key: K, value: CubeState[K]) => {
        setState((prev) => ({...prev, [key]: value}));
    };

    const baseTransform = useMemo(() => {
        return [
            `translate3d(${state.translateX}px, ${state.translateY}px, ${state.translateZ}px)`,
            `rotateX(${state.rotateX}deg)`,
            `rotateY(${state.rotateY}deg)`,
            `rotateZ(${state.rotateZ}deg)`,
            `scale(${state.scale})`,
        ].join(" ");
    }, [state]);

    const isAnimating = state.animationSpeed > 0;
    const animationDuration = Math.max(0.5, 10 / Math.max(state.animationSpeed, 0.1));

    const generatedCss = useMemo(() => {
        return `.scene {
  perspective: ${state.perspective}px;
}

.cube {
  width: ${CUBE_SIZE}px;
  height: ${CUBE_SIZE}px;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: ${state.transformOrigin};
  transform: ${baseTransform};
}

.face {
  position: absolute;
  width: ${CUBE_SIZE}px;
  height: ${CUBE_SIZE}px;
}

/* Cube faces */
.face.front  { transform: translateZ(${CUBE_SIZE / 2}px); }
.face.back   { transform: rotateY(180deg) translateZ(${CUBE_SIZE / 2}px); }
.face.right  { transform: rotateY(90deg) translateZ(${CUBE_SIZE / 2}px); }
.face.left   { transform: rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px); }
.face.top    { transform: rotateX(90deg) translateZ(${CUBE_SIZE / 2}px); }
.face.bottom { transform: rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px); }`;
    }, [state.perspective, state.transformOrigin, baseTransform]);

    const copyCss = async () => {
        try {
            await navigator.clipboard.writeText(generatedCss);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-7.5rem)] gap-0 max-small-desktop:flex-col">
            <div className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden">
                <LabsGrid variant="scene" />
                <div
                    className="relative flex items-center justify-center"
                    style={{
                        width: CUBE_SIZE * 2.2,
                        height: CUBE_SIZE * 2.2,
                        perspective: `${state.perspective}px`,
                    }}
                >
                    <div
                        className="relative"
                        style={{
                            width: CUBE_SIZE,
                            height: CUBE_SIZE,
                            transformStyle: "preserve-3d",
                            transformOrigin: state.transformOrigin,
                            transform: [
                                `translate3d(${state.translateX}px, ${state.translateY}px, ${state.translateZ}px)`,
                                `rotateX(${state.rotateX}deg)`,
                                `rotateZ(${state.rotateZ}deg)`,
                                `scale(${state.scale})`,
                            ].join(" "),
                        }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                transformStyle: "preserve-3d",
                                ...(isAnimating
                                    ? {
                                          animation: `labs-cube-y-spin ${animationDuration}s ${state.timingFunction} infinite`,
                                      }
                                    : {}),
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: `rotateY(${state.rotateY}deg)`,
                                }}
                            >
                                {FACES.map((face) => (
                                    <div
                                        key={face.id}
                                        className="absolute inset-0 flex items-center justify-center border border-[rgba(139,139,255,0.55)] bg-[rgba(110,110,240,0.12)] text-[0.7rem] font-semibold tracking-[0.18em] text-[rgba(180,180,255,0.85)]"
                                        style={{
                                            width: CUBE_SIZE,
                                            height: CUBE_SIZE,
                                            transform: face.transform,
                                            backfaceVisibility: "visible",
                                            boxShadow: "inset 0 0 30px rgba(139,139,255,0.12)",
                                        }}
                                    >
                                        {face.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <aside className="flex w-full max-w-[340px] shrink-0 flex-col border-l border-[var(--labs-border)] bg-[#08080e] max-small-desktop:max-w-none max-small-desktop:border-l-0 max-small-desktop:border-t">
                <div className="flex items-center justify-between border-b border-[var(--labs-border)] px-5 py-4">
                    <h2 className="text-[0.75rem] font-semibold tracking-[0.18em] text-[var(--labs-muted)]">
                        CONTROLS
                    </h2>
                    <button
                        type="button"
                        onClick={() => setState(DEFAULT_STATE)}
                        className="rounded-md border border-[var(--labs-border)] px-2.5 py-1 text-[0.75rem] text-[var(--labs-muted)] transition-colors hover:border-[var(--labs-border-strong)] hover:text-white"
                    >
                        Reset
                    </button>
                </div>

                <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
                    <section>
                        <SectionTitle>ROTATE</SectionTitle>
                        <div className="flex flex-col gap-4">
                            <SliderControl
                                label="Rotate X"
                                value={state.rotateX}
                                min={-180}
                                max={180}
                                step={1}
                                display={`${state.rotateX}°`}
                                onChange={(value) => update("rotateX", value)}
                            />
                            <SliderControl
                                label="Rotate Y"
                                value={state.rotateY}
                                min={-180}
                                max={180}
                                step={1}
                                display={`${state.rotateY}°`}
                                onChange={(value) => update("rotateY", value)}
                            />
                            <SliderControl
                                label="Rotate Z"
                                value={state.rotateZ}
                                min={-180}
                                max={180}
                                step={1}
                                display={`${state.rotateZ}°`}
                                onChange={(value) => update("rotateZ", value)}
                            />
                        </div>
                    </section>

                    <section className="border-t border-[var(--labs-border)] pt-5">
                        <SectionTitle>SCALE</SectionTitle>
                        <SliderControl
                            label="Scale"
                            value={state.scale}
                            min={0.2}
                            max={2}
                            step={0.01}
                            display={state.scale.toFixed(2)}
                            onChange={(value) => update("scale", value)}
                        />
                    </section>

                    <section className="border-t border-[var(--labs-border)] pt-5">
                        <SectionTitle>PERSPECTIVE</SectionTitle>
                        <div className="flex flex-col gap-4">
                            <SliderControl
                                label="Perspective"
                                value={state.perspective}
                                min={200}
                                max={1600}
                                step={10}
                                display={`${state.perspective}px`}
                                onChange={(value) => update("perspective", value)}
                            />
                            <label className="flex flex-col gap-2">
                                <span className="text-[0.78rem] text-[var(--labs-muted)]">
                                    Transform Origin
                                </span>
                                <select
                                    value={state.transformOrigin}
                                    onChange={(event) =>
                                        update("transformOrigin", event.target.value as TransformOrigin)
                                    }
                                    className="rounded-md border border-[var(--labs-border)] bg-[#0c0c14] px-3 py-2 font-mono text-[0.8rem] text-[var(--labs-accent)] outline-none transition-colors focus:border-[var(--labs-border-strong)]"
                                >
                                    {TRANSFORM_ORIGINS.map((origin) => (
                                        <option key={origin} value={origin}>
                                            {origin}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </section>

                    <section className="border-t border-[var(--labs-border)] pt-5">
                        <SectionTitle>TRANSLATE</SectionTitle>
                        <div className="flex flex-col gap-4">
                            <SliderControl
                                label="Translate X"
                                value={state.translateX}
                                min={-200}
                                max={200}
                                step={1}
                                display={`${state.translateX}px`}
                                onChange={(value) => update("translateX", value)}
                            />
                            <SliderControl
                                label="Translate Y"
                                value={state.translateY}
                                min={-200}
                                max={200}
                                step={1}
                                display={`${state.translateY}px`}
                                onChange={(value) => update("translateY", value)}
                            />
                            <SliderControl
                                label="Translate Z"
                                value={state.translateZ}
                                min={-200}
                                max={200}
                                step={1}
                                display={`${state.translateZ}px`}
                                onChange={(value) => update("translateZ", value)}
                            />
                        </div>
                    </section>

                    <section className="border-t border-[var(--labs-border)] pt-5">
                        <SectionTitle>ANIMATION</SectionTitle>
                        <div className="flex flex-col gap-4">
                            <SliderControl
                                label="Animation Speed"
                                value={state.animationSpeed}
                                min={0}
                                max={5}
                                step={0.1}
                                display={state.animationSpeed.toFixed(1)}
                                onChange={(value) => update("animationSpeed", value)}
                            />
                            <label className="flex flex-col gap-2">
                                <span className="text-[0.78rem] text-[var(--labs-muted)]">
                                    Timing Function
                                </span>
                                <select
                                    value={state.timingFunction}
                                    onChange={(event) =>
                                        update("timingFunction", event.target.value as TimingFunction)
                                    }
                                    className="rounded-md border border-[var(--labs-border)] bg-[#0c0c14] px-3 py-2 font-mono text-[0.8rem] text-[var(--labs-accent)] outline-none transition-colors focus:border-[var(--labs-border-strong)]"
                                >
                                    {TIMING_FUNCTIONS.map((timing) => (
                                        <option key={timing} value={timing}>
                                            {timing}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </section>

                    <section className="border-t border-[var(--labs-border)] pt-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <h3 className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--labs-muted)]">
                                GENERATED CSS
                            </h3>
                            <button
                                type="button"
                                onClick={copyCss}
                                className={cls(
                                    "rounded-md border border-[var(--labs-border)] px-2.5 py-1 text-[0.75rem] transition-colors",
                                    copied
                                        ? "border-[var(--labs-accent)] text-[var(--labs-accent)]"
                                        : "text-[var(--labs-muted)] hover:border-[var(--labs-border-strong)] hover:text-white"
                                )}
                            >
                                {copied ? "Copied" : "Copy CSS"}
                            </button>
                        </div>
                        <pre className="max-h-56 overflow-auto rounded-xl border border-[var(--labs-border)] bg-[#0a0a12] p-3 font-mono text-[0.7rem] leading-relaxed text-[rgba(190,190,255,0.88)]">
                            {generatedCss}
                        </pre>
                    </section>
                </div>
            </aside>
        </div>
    );
}

export default Css3dCubePlayground;
