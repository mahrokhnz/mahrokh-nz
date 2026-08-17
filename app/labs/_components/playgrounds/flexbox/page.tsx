"use client";

import {PlaygroundShell} from "@/app/labs/_components/playgrounds/shared/page";
import FlexboxCodePanel from "./code_panel/page";
import FlexboxControls from "./controls/page";
import FlexboxPreview from "./preview/page";
import {useFlexboxBuilder} from "./use_flexbox_builder";

function FlexboxBuilderPlayground() {
    const {
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
    } = useFlexboxBuilder();

    return (
        <PlaygroundShell className="max-medium-desktop:flex-col">
            <FlexboxControls
                container={container}
                selectedIndex={selectedIndex}
                selectedItem={selectedItem}
                activePreset={activePreset}
                onReset={resetAll}
                onPreset={applyPreset}
                onSelectItem={setSelectedIndex}
                onContainerChange={updateContainer}
                onItemChange={updateSelectedItem}
            />
            <FlexboxPreview
                container={container}
                items={items}
                selectedIndex={selectedIndex}
                onSelectItem={setSelectedIndex}
            />
            <FlexboxCodePanel
                css={css}
                tailwind={tailwind}
                tab={codeTab}
                copied={copied}
                onTabChange={setCodeTab}
                onCopy={copyCss}
            />
        </PlaygroundShell>
    );
}

export default FlexboxBuilderPlayground;
