import type {ComponentType} from "react";
import Css3dCubePlayground from "@/app/labs/_components/playgrounds/css_3d_cube";
import MotionPlayground from "@/app/labs/_components/playgrounds/motion_playground";
import RenderingPlayground from "@/app/labs/_components/playgrounds/rendering_playground";

const EXPERIMENT_PLAYGROUNDS: Record<string, ComponentType> = {
    "css-3d-cube-playground": Css3dCubePlayground,
    "motion-playground": MotionPlayground,
    "react-rendering-playground": RenderingPlayground,
};

export function getExperimentPlayground(slug: string): ComponentType | undefined {
    return EXPERIMENT_PLAYGROUNDS[slug];
}
