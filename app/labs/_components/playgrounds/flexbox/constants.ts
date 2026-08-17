export const FLEX_DIRECTIONS = ["row", "row-reverse", "column", "column-reverse"] as const;
export const FLEX_WRAPS = ["nowrap", "wrap", "wrap-reverse"] as const;
export const JUSTIFY_CONTENT = [
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
] as const;
export const ALIGN_ITEMS = ["stretch", "flex-start", "center", "flex-end", "baseline"] as const;
export const ALIGN_CONTENT = [
    "stretch",
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
] as const;
export const ALIGN_SELF = ["auto", "stretch", "flex-start", "center", "flex-end", "baseline"] as const;
export const FLEX_BASIS = ["auto", "0", "80px", "120px", "160px", "200px", "240px", "50%", "100%"] as const;

export type FlexDirection = (typeof FLEX_DIRECTIONS)[number];
export type FlexWrap = (typeof FLEX_WRAPS)[number];
export type JustifyContent = (typeof JUSTIFY_CONTENT)[number];
export type AlignItems = (typeof ALIGN_ITEMS)[number];
export type AlignContent = (typeof ALIGN_CONTENT)[number];
export type AlignSelf = (typeof ALIGN_SELF)[number];
export type FlexBasis = (typeof FLEX_BASIS)[number];
export type CodeTab = "css" | "tailwind";
export type PresetKey = "centered" | "navbar" | "card-row" | "vertical-stack" | "wrapping-cards";

export type FlexContainer = {
    direction: FlexDirection;
    wrap: FlexWrap;
    justify: JustifyContent;
    alignItems: AlignItems;
    alignContent: AlignContent;
    gap: number;
};

export type FlexItem = {
    order: number;
    grow: number;
    shrink: number;
    basis: FlexBasis;
    alignSelf: AlignSelf;
};

export const ITEM_COUNT = 5;

export const DEFAULT_CONTAINER: FlexContainer = {
    direction: "column",
    wrap: "nowrap",
    justify: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
    gap: 16,
};

export const DEFAULT_ITEM: FlexItem = {
    order: 0,
    grow: 0,
    shrink: 1,
    basis: "auto",
    alignSelf: "auto",
};

export function createDefaultItems(): FlexItem[] {
    return Array.from({length: ITEM_COUNT}, () => ({...DEFAULT_ITEM}));
}

export function cloneItems(items: FlexItem[]): FlexItem[] {
    return items.map((item) => ({...item}));
}

export const ITEM_LABELS = ["Product", "Product", "Product", "Product", "Product"] as const;

export const CONTROL_HINTS = {
    direction: "Sets the main axis direction of the flex container.",
    wrap: "Controls whether flex items wrap onto multiple lines.",
    justify: "Controls how flex items are distributed along the main axis.",
    alignItems: "Controls how flex items are aligned along the cross axis.",
    alignContent: "Controls how flex lines are packed along the cross axis.",
    gap: "Sets the spacing between flex items.",
    order: "Controls the visual order of this item without changing the DOM.",
    grow: "Defines how much a flex item can grow relative to the remaining space.",
    shrink: "Defines how much a flex item can shrink when space is limited.",
    basis: "Sets the initial main size of the item before grow and shrink.",
    alignSelf: "Overrides the container align-items value for this item.",
} as const;

export const CODE_TABS: Array<{label: string; value: CodeTab}> = [
    {label: "CSS", value: "css"},
    {label: "Tailwind", value: "tailwind"},
];

export const ITEM_OPTIONS = Array.from({length: ITEM_COUNT}, (_, index) => ({
    label: `#${index + 1}`,
    value: index,
}));

type NumericFlexItemKey = "order" | "grow" | "shrink";

export const ITEM_SLIDER_FIELDS: Array<{
    key: NumericFlexItemKey;
    label: string;
    hint: string;
    min: number;
    max: number;
}> = [
    {key: "order", label: "Order", hint: CONTROL_HINTS.order, min: -5, max: 5},
    {key: "grow", label: "Flex Grow", hint: CONTROL_HINTS.grow, min: 0, max: 5},
    {key: "shrink", label: "Flex Shrink", hint: CONTROL_HINTS.shrink, min: 0, max: 5},
];

export type FlexPreset = {
    key: PresetKey;
    label: string;
    container: FlexContainer;
    items: FlexItem[];
};

function withItemDefaults(overrides: Partial<FlexItem> = {}): FlexItem[] {
    return createDefaultItems().map((item) => ({...item, ...overrides}));
}

export const PRESETS: FlexPreset[] = [
    {
        key: "centered",
        label: "Centered",
        container: {
            ...DEFAULT_CONTAINER,
            direction: "row",
            justify: "center",
            alignItems: "center",
        },
        items: withItemDefaults(),
    },
    {
        key: "navbar",
        label: "Navbar",
        container: {
            ...DEFAULT_CONTAINER,
            direction: "row",
            justify: "space-between",
            alignItems: "center",
        },
        items: withItemDefaults(),
    },
    {
        key: "card-row",
        label: "Card Row",
        container: {
            ...DEFAULT_CONTAINER,
            direction: "row",
            alignItems: "stretch",
        },
        items: withItemDefaults({grow: 1}),
    },
    {
        key: "vertical-stack",
        label: "Vertical Stack",
        container: {
            ...DEFAULT_CONTAINER,
            direction: "column",
        },
        items: withItemDefaults(),
    },
    {
        key: "wrapping-cards",
        label: "Wrapping Cards",
        container: {
            ...DEFAULT_CONTAINER,
            direction: "row",
            wrap: "wrap",
        },
        items: withItemDefaults({basis: "200px"}),
    },
];

export function containersEqual(a: FlexContainer, b: FlexContainer): boolean {
    return (
        a.direction === b.direction &&
        a.wrap === b.wrap &&
        a.justify === b.justify &&
        a.alignItems === b.alignItems &&
        a.alignContent === b.alignContent &&
        a.gap === b.gap
    );
}

export function itemsEqual(a: FlexItem[], b: FlexItem[]): boolean {
    return (
        a.length === b.length &&
        a.every(
            (item, index) =>
                item.order === b[index].order &&
                item.grow === b[index].grow &&
                item.shrink === b[index].shrink &&
                item.basis === b[index].basis &&
                item.alignSelf === b[index].alignSelf
        )
    );
}

export function getMatchingPreset(container: FlexContainer, items: FlexItem[]): PresetKey | null {
    const match = PRESETS.find(
        (preset) => containersEqual(preset.container, container) && itemsEqual(preset.items, items)
    );
    return match?.key ?? null;
}

export function getAxisIndicators(direction: FlexDirection): {main: string; cross: string; isRow: boolean} {
    switch (direction) {
        case "row":
            return {main: "MAIN AXIS →", cross: "CROSS AXIS ↓", isRow: true};
        case "row-reverse":
            return {main: "MAIN AXIS ←", cross: "CROSS AXIS ↓", isRow: true};
        case "column":
            return {main: "MAIN AXIS ↓", cross: "CROSS AXIS →", isRow: false};
        case "column-reverse":
            return {main: "MAIN AXIS ↑", cross: "CROSS AXIS →", isRow: false};
    }
}

export function formatItemIndex(index: number): string {
    return String(index + 1).padStart(2, "0");
}

export function isCustomItem(item: FlexItem): boolean {
    return (
        item.order !== DEFAULT_ITEM.order ||
        item.grow !== DEFAULT_ITEM.grow ||
        item.shrink !== DEFAULT_ITEM.shrink ||
        item.basis !== DEFAULT_ITEM.basis ||
        item.alignSelf !== DEFAULT_ITEM.alignSelf
    );
}
