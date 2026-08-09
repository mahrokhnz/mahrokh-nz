import type {ComponentType} from "react";
import Css3dCubePlayground from "@/app/labs/_components/playgrounds/css_3d_cube/page";
import MotionPlayground from "@/app/labs/_components/playgrounds/motion/page";
import RenderingPlayground from "@/app/labs/_components/playgrounds/rendering/page";

const EXPERIMENT_PLAYGROUNDS: Record<string, ComponentType> = {
    "css-3d-cube-playground": Css3dCubePlayground,
    "motion-playground": MotionPlayground,
    "react-rendering-playground": RenderingPlayground,
};

export function getExperimentPlayground(slug: string): ComponentType | undefined {
    return EXPERIMENT_PLAYGROUNDS[slug];
}
