import {ControlButtonGroup, ControlSection} from "@/app/labs/_components/playgrounds/controls/page";
import {PRESETS, type PresetKey} from "../constants";

interface FlexboxPresetsProps {
    activePreset: PresetKey | null;
    onSelect: (key: PresetKey) => void;
}

function FlexboxPresets({activePreset, onSelect}: FlexboxPresetsProps) {
    return (
        <ControlSection title="QUICK START">
            <ControlButtonGroup
                value={activePreset}
                onChange={onSelect}
                buttonClassName="min-h-9 px-3 py-1.5"
                options={PRESETS.map((preset) => ({
                    label: preset.label,
                    value: preset.key,
                }))}
            />
        </ControlSection>
    );
}

export default FlexboxPresets;
