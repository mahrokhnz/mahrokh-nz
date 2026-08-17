import {PlaygroundPreview} from "@/app/labs/_components/playgrounds/shared/page";
import type {FlexContainer, FlexItem} from "../constants";
import {getContainerStyle} from "../styles";
import FlexboxAxisIndicators from "./axis/page";
import FlexboxPreviewItem from "./item/page";

interface FlexboxPreviewProps {
    container: FlexContainer;
    items: FlexItem[];
    selectedIndex: number;
    onSelectItem: (index: number) => void;
}

function FlexboxPreview({container, items, selectedIndex, onSelectItem}: FlexboxPreviewProps) {
    return (
        <PlaygroundPreview
            ariaLabel="Flexbox preview"
            contentClassName="pl-12 pt-10"
            meta={
                <p className="font-mono text-[0.72rem] text-[var(--labs-muted)]">
                    {container.direction} · {container.justify}
                </p>
            }
        >
            <FlexboxAxisIndicators direction={container.direction} />
            <div
                className="relative min-h-[320px] w-full flex-1 overflow-auto rounded-2xl border border-[var(--labs-border)] bg-[rgba(10,10,16,0.72)] p-4"
                role="group"
                aria-label="Flex container"
                style={getContainerStyle(container)}
            >
                {items.map((item, index) => (
                    <FlexboxPreviewItem
                        key={index}
                        item={item}
                        index={index}
                        selected={selectedIndex === index}
                        onSelect={onSelectItem}
                    />
                ))}
            </div>
        </PlaygroundPreview>
    );
}

export default FlexboxPreview;
