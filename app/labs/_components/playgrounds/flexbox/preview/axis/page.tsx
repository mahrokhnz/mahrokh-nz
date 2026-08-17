import cls from "@/utils/class_names";
import {getAxisIndicators, type FlexDirection} from "../../constants";

interface FlexboxAxisIndicatorsProps {
    direction: FlexDirection;
}

function FlexboxAxisIndicators({direction}: FlexboxAxisIndicatorsProps) {
    const axis = getAxisIndicators(direction);
    const labelClassName =
        "pointer-events-none absolute z-10 font-mono text-[0.62rem] tracking-[0.16em] text-[var(--labs-muted)]/65";

    return (
        <>
            <p
                aria-hidden
                className={cls(
                    labelClassName,
                    axis.isRow ? "left-1/2 top-3.5 -translate-x-1/2" : "left-3 top-1/2 -translate-y-1/2"
                )}
            >
                {axis.main}
            </p>
            <p
                aria-hidden
                className={cls(
                    labelClassName,
                    axis.isRow ? "left-3 top-1/2 -translate-y-1/2" : "left-1/2 top-3.5 -translate-x-1/2"
                )}
            >
                {axis.cross}
            </p>
            <p className="sr-only">
                {axis.main}. {axis.cross}.
            </p>
        </>
    );
}

export default FlexboxAxisIndicators;
