"use client";

import {useMemo, useState} from "react";
import {useCopyCss} from "@/app/labs/_components/playgrounds/shared/page";
import {generateCss, generateTailwind} from "./code";
import {
    cloneItems,
    createDefaultItems,
    DEFAULT_CONTAINER,
    DEFAULT_ITEM,
    getMatchingPreset,
    PRESETS,
    type CodeTab,
    type FlexContainer,
    type FlexItem,
    type PresetKey,
} from "./constants";

export function useFlexboxBuilder() {
    const [container, setContainer] = useState<FlexContainer>(DEFAULT_CONTAINER);
    const [items, setItems] = useState<FlexItem[]>(() => createDefaultItems());
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [codeTab, setCodeTab] = useState<CodeTab>("css");

    const css = useMemo(() => generateCss(container, items), [container, items]);
    const tailwind = useMemo(() => generateTailwind(container, items), [container, items]);
    const activeCode = codeTab === "css" ? css : tailwind;
    const {copied, copyCss} = useCopyCss(activeCode);

    const selectedItem = items[selectedIndex] ?? DEFAULT_ITEM;
    const activePreset = getMatchingPreset(container, items);

    const updateContainer = <K extends keyof FlexContainer>(key: K, value: FlexContainer[K]) => {
        setContainer((prev) => ({...prev, [key]: value}));
    };

    const updateSelectedItem = <K extends keyof FlexItem>(key: K, value: FlexItem[K]) => {
        setItems((prev) =>
            prev.map((item, index) => (index === selectedIndex ? {...item, [key]: value} : item))
        );
    };

    const applyPreset = (key: PresetKey) => {
        const preset = PRESETS.find((item) => item.key === key);
        if (!preset) return;
        setContainer({...preset.container});
        setItems(cloneItems(preset.items));
    };

    const resetAll = () => {
        setContainer(DEFAULT_CONTAINER);
        setItems(createDefaultItems());
        setSelectedIndex(0);
        setCodeTab("css");
    };

    return {
        container,
        items,
        selectedIndex,
        selectedItem,
        codeTab,
        css,
        tailwind,
        copied,
        activePreset,
        copyCss,
        setSelectedIndex,
        setCodeTab,
        updateContainer,
        updateSelectedItem,
        applyPreset,
        resetAll,
    };
}
