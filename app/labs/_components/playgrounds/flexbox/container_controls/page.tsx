import {
    ControlSection,
    ControlSelect,
    ControlSlider,
    ControlStack,
} from "@/app/labs/_components/playgrounds/controls/page";
import {
    ALIGN_CONTENT,
    ALIGN_ITEMS,
    CONTROL_HINTS,
    FLEX_DIRECTIONS,
    FLEX_WRAPS,
    JUSTIFY_CONTENT,
    type FlexContainer,
} from "../constants";

interface FlexboxContainerControlsProps {
    container: FlexContainer;
    onChange: <K extends keyof FlexContainer>(key: K, value: FlexContainer[K]) => void;
}

function FlexboxContainerControls({container, onChange}: FlexboxContainerControlsProps) {
    return (
        <ControlSection title="CONTAINER" divided>
            <ControlStack>
                <ControlSelect
                    label="Direction"
                    hint={CONTROL_HINTS.direction}
                    value={container.direction}
                    options={FLEX_DIRECTIONS}
                    onChange={(value) => onChange("direction", value)}
                />
                <ControlSelect
                    label="Wrap"
                    hint={CONTROL_HINTS.wrap}
                    value={container.wrap}
                    options={FLEX_WRAPS}
                    onChange={(value) => onChange("wrap", value)}
                />
                <ControlSelect
                    label="Justify Content"
                    hint={CONTROL_HINTS.justify}
                    value={container.justify}
                    options={JUSTIFY_CONTENT}
                    onChange={(value) => onChange("justify", value)}
                />
                <ControlSelect
                    label="Align Items"
                    hint={CONTROL_HINTS.alignItems}
                    value={container.alignItems}
                    options={ALIGN_ITEMS}
                    onChange={(value) => onChange("alignItems", value)}
                />
                <ControlSelect
                    label="Align Content"
                    hint={CONTROL_HINTS.alignContent}
                    value={container.alignContent}
                    options={ALIGN_CONTENT}
                    onChange={(value) => onChange("alignContent", value)}
                />
                <ControlSlider
                    label="Gap"
                    hint={CONTROL_HINTS.gap}
                    value={container.gap}
                    min={0}
                    max={64}
                    step={1}
                    display={`${container.gap}px`}
                    onChange={(value) => onChange("gap", value)}
                />
            </ControlStack>
        </ControlSection>
    );
}

export default FlexboxContainerControls;
