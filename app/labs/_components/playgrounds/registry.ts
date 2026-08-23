import type {ComponentType} from "react";
import Css3dCubePlayground from "@/app/labs/_components/playgrounds/css_3d_cube/page";
import FlexboxBuilderPlayground from "@/app/labs/_components/playgrounds/flexbox/page";
import MotionPlayground from "@/app/labs/_components/playgrounds/motion/page";
import RenderingPlayground from "@/app/labs/_components/playgrounds/rendering/page";
import SvgToJsxPlayground from "@/app/labs/_components/playgrounds/svg_to_jsx/page";

const EXPERIMENT_PLAYGROUNDS: Record<string, ComponentType> = {
    "css-3d-cube-playground": Css3dCubePlayground,
    "flexbox-builder": FlexboxBuilderPlayground,
    "motion-playground": MotionPlayground,
    "react-rendering-playground": RenderingPlayground,
    "svg-to-jsx": SvgToJsxPlayground,
};

export function getExperimentPlayground(slug: string): ComponentType | undefined {
    return EXPERIMENT_PLAYGROUNDS[slug];
}
