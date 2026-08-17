import type {CSSProperties} from "react";
import type {FlexContainer, FlexItem} from "./constants";

export function getContainerStyle(container: FlexContainer): CSSProperties {
    return {
        display: "flex",
        flexDirection: container.direction,
        flexWrap: container.wrap,
        justifyContent: container.justify,
        alignItems: container.alignItems,
        alignContent: container.alignContent,
        gap: `${container.gap}px`,
    };
}

export function getItemStyle(item: FlexItem): CSSProperties {
    return {
        order: item.order,
        flexGrow: item.grow,
        flexShrink: item.shrink,
        flexBasis: item.basis,
        alignSelf: item.alignSelf,
    };
}
