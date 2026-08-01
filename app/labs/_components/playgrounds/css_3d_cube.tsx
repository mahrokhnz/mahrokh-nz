"use client";

import {useMemo, useState} from "react";
import LabsGrid from "@/app/labs/_components/labs_grid";
import {
    ControlButton,
    ControlSection,
    ControlSelect,
    ControlSlider,
    ControlsSidebar,
    GeneratedCodePanel,
} from "@/app/labs/_components/playgrounds/controls_sidebar";
import {
    PlaygroundShell,
    TIMING_FUNCTIONS,
    useCopyCss,
    type TimingFunction,
} from "@/app/labs/_components/playgrounds/shared";

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

type TransformOrigin = (typeof TRANSFORM_ORIGINS)[number];

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

function Css3dCubePlayground() {
    const [state, setState] = useState<CubeState>(DEFAULT_STATE);

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

    const {copied, copyCss} = useCopyCss(generatedCss);

    return (
        <PlaygroundShell className="gap-0 max-small-desktop:flex-col">
            <section
                aria-label="Cube preview"
                className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden"
            >
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
            </section>

            <ControlsSidebar
                title="CONTROLS"
                side="right"
                maxWidthClassName="max-w-[340px]"
                headerAction={
                    <ControlButton onClick={() => setState(DEFAULT_STATE)}>Reset</ControlButton>
                }
            >
                <ControlSection title="ROTATE">
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

                <ControlSection title="SCALE" divided>
                    <ControlSlider
                        label="Scale"
                        value={state.scale}
                        min={0.2}
                        max={2}
                        step={0.01}
                        display={state.scale.toFixed(2)}
                        onChange={(value) => update("scale", value)}
                    />
                </ControlSection>

                <ControlSection title="PERSPECTIVE" divided>
                    <div className="flex flex-col gap-4">
                        <ControlSlider
                            label="Perspective"
                            value={state.perspective}
                            min={200}
                            max={1600}
                            step={10}
                            display={`${state.perspective}px`}
                            onChange={(value) => update("perspective", value)}
                        />
                        <ControlSelect
                            label="Transform Origin"
                            value={state.transformOrigin}
                            options={TRANSFORM_ORIGINS}
                            onChange={(value) => update("transformOrigin", value as TransformOrigin)}
                        />
                    </div>
                </ControlSection>

                <ControlSection title="TRANSLATE" divided>
                    <div className="flex flex-col gap-4">
                        <ControlSlider
                            label="Translate X"
                            value={state.translateX}
                            min={-200}
                            max={200}
                            step={1}
                            display={`${state.translateX}px`}
                            onChange={(value) => update("translateX", value)}
                        />
                        <ControlSlider
                            label="Translate Y"
                            value={state.translateY}
                            min={-200}
                            max={200}
                            step={1}
                            display={`${state.translateY}px`}
                            onChange={(value) => update("translateY", value)}
                        />
                        <ControlSlider
                            label="Translate Z"
                            value={state.translateZ}
                            min={-200}
                            max={200}
                            step={1}
                            display={`${state.translateZ}px`}
                            onChange={(value) => update("translateZ", value)}
                        />
                    </div>
                </ControlSection>

                <ControlSection title="ANIMATION" divided>
                    <div className="flex flex-col gap-4">
                        <ControlSlider
                            label="Animation Speed"
                            value={state.animationSpeed}
                            min={0}
                            max={5}
                            step={0.1}
                            display={state.animationSpeed.toFixed(1)}
                            onChange={(value) => update("animationSpeed", value)}
                        />
                        <ControlSelect
                            label="Timing Function"
                            value={state.timingFunction}
                            options={TIMING_FUNCTIONS}
                            onChange={(value) => update("timingFunction", value as TimingFunction)}
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

export default Css3dCubePlayground;
