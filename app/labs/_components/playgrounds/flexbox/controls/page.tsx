import {
    ControlButton,
    ControlsSidebar,
} from "@/app/labs/_components/playgrounds/controls/page";
import FlexboxContainerControls from "../container_controls/page";
import FlexboxItemControls from "../item_controls/page";
import FlexboxPresets from "../presets/page";
import type {FlexContainer, FlexItem, PresetKey} from "../constants";

interface FlexboxControlsProps {
    container: FlexContainer;
    selectedIndex: number;
    selectedItem: FlexItem;
    activePreset: PresetKey | null;
    onReset: () => void;
    onPreset: (key: PresetKey) => void;
    onSelectItem: (index: number) => void;
    onContainerChange: <K extends keyof FlexContainer>(key: K, value: FlexContainer[K]) => void;
    onItemChange: <K extends keyof FlexItem>(key: K, value: FlexItem[K]) => void;
}

function FlexboxControls({
    container,
    selectedIndex,
    selectedItem,
    activePreset,
    onReset,
    onPreset,
    onSelectItem,
    onContainerChange,
    onItemChange,
}: FlexboxControlsProps) {
    return (
        <ControlsSidebar
            title="CONTROLS"
            side="left"
            headerAction={<ControlButton onClick={onReset}>Reset</ControlButton>}
        >
            <FlexboxPresets activePreset={activePreset} onSelect={onPreset} />
            <FlexboxContainerControls container={container} onChange={onContainerChange} />
            <FlexboxItemControls
                selectedIndex={selectedIndex}
                item={selectedItem}
                onSelectItem={onSelectItem}
                onChange={onItemChange}
            />
        </ControlsSidebar>
    );
}

export default FlexboxControls;
