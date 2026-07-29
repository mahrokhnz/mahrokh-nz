import type {ComponentType} from "react";
import Css3dCubePlayground from "@/app/labs/_components/playgrounds/css_3d_cube";

export const EXPERIMENT_PLAYGROUNDS: Record<string, ComponentType> = {
    "css-3d-cube-playground": Css3dCubePlayground,
};

export function getExperimentPlayground(slug: string): ComponentType | undefined {
    return EXPERIMENT_PLAYGROUNDS[slug];
}
