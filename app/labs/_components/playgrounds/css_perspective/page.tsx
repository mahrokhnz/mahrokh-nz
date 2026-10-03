"use client";

import {useMemo, useState} from "react";
import LabsGrid from "@/app/labs/_components/labs_grid/page";
import {
    ControlButton,
    ControlSection,
    ControlSelect,
    ControlSlider,
    ControlsSidebar,
    GeneratedCodePanel,
} from "@/app/labs/_components/playgrounds/controls/page";
import {PlaygroundShell, useCopyCss} from "@/app/labs/_components/playgrounds/shared/page";

const TRANSFORM_ORIGINS = ["center", "top", "right", "bottom", "left"] as const;

type TransformOrigin = (typeof TRANSFORM_ORIGINS)[number];

type PerspectiveState = {
    perspective: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    translateZ: number;
    transformOrigin: TransformOrigin;
    perspectiveOriginX: number;
    perspectiveOriginY: number;
};

const DEFAULT_STATE: PerspectiveState = {
    perspective: 800,
    rotateX: -10,
    rotateY: 25,
    rotateZ: 0,
    translateZ: 0,
    transformOrigin: "center",
    perspectiveOriginX: 50,
    perspectiveOriginY: 50,
};

const PLANES = [
    {
        id: "front",
        label: "FRONT",
        z: 120,
        className: "border-[rgba(139,139,255,0.7)] bg-[rgba(139,139,255,0.18)]",
    },
    {
        id: "middle",
        label: "MIDDLE",
        z: 0,
        className: "border-[rgba(139,139,255,0.45)] bg-[rgba(110,110,240,0.1)]",
    },
    {
        id: "back",
        label: "BACK",
        z: -120,
        className: "border-[rgba(139,139,255,0.28)] bg-[rgba(80,80,160,0.08)]",
    },
] as const;

function CssPerspectiveVisualizerPlayground() {
    const [state, setState] = useState<PerspectiveState>(DEFAULT_STATE);

    const update = <K extends keyof PerspectiveState>(key: K, value: PerspectiveState[K]) => {
        setState((prev) => ({...prev, [key]: value}));
    };

    const objectTransform = useMemo(() => {
        return [
            `translateZ(${state.translateZ}px)`,
            `rotateX(${state.rotateX}deg)`,
            `rotateY(${state.rotateY}deg)`,
            `rotateZ(${state.rotateZ}deg)`,
        ].join("\n    ");
    }, [state.rotateX, state.rotateY, state.rotateZ, state.translateZ]);

    const generatedCss = useMemo(() => {
        return `.scene {
  perspective: ${state.perspective}px;
  perspective-origin: ${state.perspectiveOriginX}% ${state.perspectiveOriginY}%;
}

.object {
  transform-style: preserve-3d;
  transform-origin: ${state.transformOrigin};
  transform:
    ${objectTransform};
}

.plane.front  { transform: translateZ(120px); }
.plane.middle { transform: translateZ(0px); }
.plane.back   { transform: translateZ(-120px); }`;
    }, [state, objectTransform]);

    const {copied, copyCss} = useCopyCss(generatedCss);

    return (
        <PlaygroundShell className="gap-0 max-small-desktop:flex-col">
            <section
                aria-label="Perspective preview"
                className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden"
            >
                <LabsGrid variant="scene" />

                <div
                    className="relative flex items-center justify-center"
                    style={{
                        width: 420,
                        height: 360,
                        perspective: `${state.perspective}px`,
                        perspectiveOrigin: `${state.perspectiveOriginX}% ${state.perspectiveOriginY}%`,
                    }}
                >
                    <div
                        className="relative"
                        style={{
                            width: 200,
                            height: 200,
                            transformStyle: "preserve-3d",
                            transformOrigin: state.transformOrigin,
                            transform: [
                                `translateZ(${state.translateZ}px)`,
                                `rotateX(${state.rotateX}deg)`,
                                `rotateY(${state.rotateY}deg)`,
                                `rotateZ(${state.rotateZ}deg)`,
                            ].join(" "),
                        }}
                    >
                        <div
                            aria-hidden
                            className="absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(139,139,255,0.18)]"
                            style={{transform: "translateZ(-40px) rotateX(78deg)"}}
                        />
                        <div
                            aria-hidden
                            className="absolute left-1/2 top-1/2 h-px w-[240px] -translate-x-1/2 -translate-y-1/2 bg-[rgba(139,139,255,0.22)]"
                            style={{transform: "translateZ(-40px) rotateX(78deg)"}}
                        />
                        <div
                            aria-hidden
                            className="absolute left-1/2 top-1/2 h-[240px] w-px -translate-x-1/2 -translate-y-1/2 bg-[rgba(139,139,255,0.22)]"
                            style={{transform: "translateZ(-40px) rotateX(78deg)"}}
                        />

                        {PLANES.map((plane) => (
                            <div
                                key={plane.id}
                                className={`absolute inset-0 flex items-center justify-center rounded-lg border text-[0.72rem] font-semibold tracking-[0.18em] text-[rgba(180,180,255,0.88)] ${plane.className}`}
                                style={{
                                    transform: `translateZ(${plane.z}px)`,
                                    backfaceVisibility: "visible",
                                    boxShadow: "inset 0 0 28px rgba(139,139,255,0.1)",
                                }}
                            >
                                {plane.label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ControlsSidebar
                title="CONTROLS"
                side="right"
                maxWidthClassName="max-w-[340px]"
                headerAction={
                    <ControlButton onClick={() => setState(DEFAULT_STATE)}>Reset</ControlButton>
                }
            >
                <ControlSection title="PERSPECTIVE">
                    <div className="flex flex-col gap-4">
                        <ControlSlider
                            label="Perspective"
                            value={state.perspective}
                            min={200}
                            max={2000}
                            step={10}
                            display={`${state.perspective}px`}
                            onChange={(value) => update("perspective", value)}
                        />
                        <ControlSlider
                            label="Perspective Origin X"
                            value={state.perspectiveOriginX}
                            min={0}
                            max={100}
                            step={1}
                            display={`${state.perspectiveOriginX}%`}
                            onChange={(value) => update("perspectiveOriginX", value)}
                        />
                        <ControlSlider
                            label="Perspective Origin Y"
                            value={state.perspectiveOriginY}
                            min={0}
                            max={100}
                            step={1}
                            display={`${state.perspectiveOriginY}%`}
                            onChange={(value) => update("perspectiveOriginY", value)}
                        />
                    </div>
                </ControlSection>

                <ControlSection title="ROTATE" divided>
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
                            label="Rotate Z"
                            value={state.rotateZ}
                            min={-180}
                            max={180}
                            step={1}
                            display={`${state.rotateZ}°`}
                            onChange={(value) => update("rotateZ", value)}
                        />
                    </div>
                </ControlSection>

                <ControlSection title="TRANSFORM" divided>
                    <div className="flex flex-col gap-4">
                        <ControlSlider
                            label="Translate Z"
                            value={state.translateZ}
                            min={-300}
                            max={300}
                            step={1}
                            display={`${state.translateZ}px`}
                            onChange={(value) => update("translateZ", value)}
                        />
                        <ControlSelect
                            label="Transform Origin"
                            value={state.transformOrigin}
                            options={TRANSFORM_ORIGINS}
                            onChange={(value) => update("transformOrigin", value as TransformOrigin)}
                        />
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

export default CssPerspectiveVisualizerPlayground;
