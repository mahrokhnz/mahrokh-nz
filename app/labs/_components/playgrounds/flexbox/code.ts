import {
    DEFAULT_ITEM,
    formatItemIndex,
    isCustomItem,
    type FlexContainer,
    type FlexItem,
} from "./constants";

const GAP_TO_TAILWIND: Record<number, string> = {
    0: "gap-0",
    1: "gap-px",
    2: "gap-0.5",
    4: "gap-1",
    6: "gap-1.5",
    8: "gap-2",
    10: "gap-2.5",
    12: "gap-3",
    14: "gap-3.5",
    16: "gap-4",
    20: "gap-5",
    24: "gap-6",
    28: "gap-7",
    32: "gap-8",
    36: "gap-9",
    40: "gap-10",
    44: "gap-11",
    48: "gap-12",
    56: "gap-14",
    64: "gap-16",
};

const DIRECTION_TO_TAILWIND: Record<FlexContainer["direction"], string> = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    column: "flex-col",
    "column-reverse": "flex-col-reverse",
};

const WRAP_TO_TAILWIND: Record<FlexContainer["wrap"], string> = {
    nowrap: "flex-nowrap",
    wrap: "flex-wrap",
    "wrap-reverse": "flex-wrap-reverse",
};

const JUSTIFY_TO_TAILWIND: Record<FlexContainer["justify"], string> = {
    "flex-start": "justify-start",
    center: "justify-center",
    "flex-end": "justify-end",
    "space-between": "justify-between",
    "space-around": "justify-around",
    "space-evenly": "justify-evenly",
};

const ALIGN_ITEMS_TO_TAILWIND: Record<FlexContainer["alignItems"], string> = {
    stretch: "items-stretch",
    "flex-start": "items-start",
    center: "items-center",
    "flex-end": "items-end",
    baseline: "items-baseline",
};

const ALIGN_CONTENT_TO_TAILWIND: Record<FlexContainer["alignContent"], string> = {
    stretch: "content-stretch",
    "flex-start": "content-start",
    center: "content-center",
    "flex-end": "content-end",
    "space-between": "content-between",
    "space-around": "content-around",
    "space-evenly": "content-evenly",
};

const ALIGN_SELF_TO_TAILWIND: Record<FlexItem["alignSelf"], string> = {
    auto: "self-auto",
    stretch: "self-stretch",
    "flex-start": "self-start",
    center: "self-center",
    "flex-end": "self-end",
    baseline: "self-baseline",
};

const BASIS_TO_TAILWIND: Record<FlexItem["basis"], string> = {
    auto: "basis-auto",
    "0": "basis-0",
    "80px": "basis-[80px]",
    "120px": "basis-[120px]",
    "160px": "basis-[160px]",
    "200px": "basis-[200px]",
    "240px": "basis-[240px]",
    "50%": "basis-1/2",
    "100%": "basis-full",
};

function gapToTailwind(gap: number): string {
    return GAP_TO_TAILWIND[gap] ?? `gap-[${gap}px]`;
}

function orderToTailwind(order: number): string | null {
    if (order === DEFAULT_ITEM.order) return null;
    if (order >= 1 && order <= 12) return `order-${order}`;
    if (order <= -1 && order >= -12) return `-order-${Math.abs(order)}`;
    return `order-[${order}]`;
}

function growToTailwind(grow: number): string | null {
    if (grow === DEFAULT_ITEM.grow) return null;
    if (grow === 1) return "grow";
    return `grow-[${grow}]`;
}

function shrinkToTailwind(shrink: number): string | null {
    if (shrink === DEFAULT_ITEM.shrink) return null;
    if (shrink === 0) return "shrink-0";
    return `shrink-[${shrink}]`;
}

function itemTailwindClasses(item: FlexItem): string[] {
    const classes: string[] = [];
    const order = orderToTailwind(item.order);
    const grow = growToTailwind(item.grow);
    const shrink = shrinkToTailwind(item.shrink);

    if (order) classes.push(order);
    if (grow) classes.push(grow);
    if (shrink) classes.push(shrink);
    if (item.basis !== DEFAULT_ITEM.basis) classes.push(BASIS_TO_TAILWIND[item.basis]);
    if (item.alignSelf !== DEFAULT_ITEM.alignSelf) classes.push(ALIGN_SELF_TO_TAILWIND[item.alignSelf]);

    return classes;
}

function formatItemCss(index: number, item: FlexItem): string | null {
    if (!isCustomItem(item)) return null;

    const lines: string[] = [];
    if (item.order !== DEFAULT_ITEM.order) lines.push(`  order: ${item.order};`);
    if (item.grow !== DEFAULT_ITEM.grow) lines.push(`  flex-grow: ${item.grow};`);
    if (item.shrink !== DEFAULT_ITEM.shrink) lines.push(`  flex-shrink: ${item.shrink};`);
    if (item.basis !== DEFAULT_ITEM.basis) lines.push(`  flex-basis: ${item.basis};`);
    if (item.alignSelf !== DEFAULT_ITEM.alignSelf) lines.push(`  align-self: ${item.alignSelf};`);

    return `.item-${index + 1} {\n${lines.join("\n")}\n}`;
}

export function generateCss(container: FlexContainer, items: FlexItem[]): string {
    const containerBlock = `.container {
  display: flex;
  flex-direction: ${container.direction};
  flex-wrap: ${container.wrap};
  justify-content: ${container.justify};
  align-items: ${container.alignItems};
  align-content: ${container.alignContent};
  gap: ${container.gap}px;
}`;

    const itemBlocks = items
        .map((item, index) => formatItemCss(index, item))
        .filter((block): block is string => Boolean(block));

    return [containerBlock, ...itemBlocks].join("\n\n");
}

export function generateTailwind(container: FlexContainer, items: FlexItem[]): string {
    const containerClasses = [
        "flex",
        DIRECTION_TO_TAILWIND[container.direction],
        WRAP_TO_TAILWIND[container.wrap],
        JUSTIFY_TO_TAILWIND[container.justify],
        ALIGN_ITEMS_TO_TAILWIND[container.alignItems],
        ALIGN_CONTENT_TO_TAILWIND[container.alignContent],
        gapToTailwind(container.gap),
    ].join(" ");

    const children = items
        .map((item, index) => {
            const label = formatItemIndex(index);
            const classes = itemTailwindClasses(item);
            if (classes.length === 0) {
                return `  <div>${label}</div>`;
            }
            return `  <div className="${classes.join(" ")}">${label}</div>`;
        })
        .join("\n");

    return `<div className="${containerClasses}">\n${children}\n</div>`;
}
