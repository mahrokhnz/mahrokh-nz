import {
    ControlButtonGroup,
    ControlSection,
    ControlSelect,
    ControlSlider,
    ControlStack,
} from "@/app/labs/_components/playgrounds/controls/page";
import {
    ALIGN_SELF,
    CONTROL_HINTS,
    FLEX_BASIS,
    ITEM_OPTIONS,
    ITEM_SLIDER_FIELDS,
    type FlexItem,
} from "../constants";

interface FlexboxItemControlsProps {
    selectedIndex: number;
    item: FlexItem;
    onSelectItem: (index: number) => void;
    onChange: <K extends keyof FlexItem>(key: K, value: FlexItem[K]) => void;
}

function FlexboxItemControls({selectedIndex, item, onSelectItem, onChange}: FlexboxItemControlsProps) {
    return (
        <ControlSection
            title="ITEM"
            divided
            headerAction={
                <span className="font-mono text-[0.75rem] text-[var(--labs-accent)]">
                    #{selectedIndex + 1}
                </span>
            }
        >
            <ControlStack>
                <div className="flex flex-col gap-2">
                    <span className="text-[0.78rem] text-[var(--labs-muted)]">Selected Item</span>
                    <ControlButtonGroup
                        value={selectedIndex}
                        onChange={onSelectItem}
                        buttonClassName="min-h-9 min-w-9"
                        options={ITEM_OPTIONS}
                    />
                </div>

                {ITEM_SLIDER_FIELDS.map((field) => (
                    <ControlSlider
                        key={field.key}
                        label={field.label}
                        hint={field.hint}
                        value={item[field.key]}
                        min={field.min}
                        max={field.max}
                        step={1}
                        display={String(item[field.key])}
                        onChange={(value) => onChange(field.key, value)}
                    />
                ))}

                <ControlSelect
                    label="Flex Basis"
                    hint={CONTROL_HINTS.basis}
                    value={item.basis}
                    options={FLEX_BASIS}
                    onChange={(value) => onChange("basis", value)}
                />
                <ControlSelect
                    label="Align Self"
                    hint={CONTROL_HINTS.alignSelf}
                    value={item.alignSelf}
                    options={ALIGN_SELF}
                    onChange={(value) => onChange("alignSelf", value)}
                />
            </ControlStack>
        </ControlSection>
    );
}

export default FlexboxItemControls;
