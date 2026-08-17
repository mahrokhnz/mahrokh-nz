import cls from "@/utils/class_names";
import {formatItemIndex, ITEM_LABELS, type FlexItem} from "../../constants";
import {getItemStyle} from "../../styles";

interface FlexboxPreviewItemProps {
    item: FlexItem;
    index: number;
    selected: boolean;
    onSelect: (index: number) => void;
}

function FlexboxPreviewItem({item, index, selected, onSelect}: FlexboxPreviewItemProps) {
    const number = formatItemIndex(index);
    const label = ITEM_LABELS[index];

    return (
        <button
            type="button"
            aria-pressed={selected}
            aria-label={`Item ${index + 1}, ${label}${selected ? ", selected" : ""}`}
            onClick={() => onSelect(index)}
            style={getItemStyle(item)}
            className={cls(
                "min-h-11 min-w-[92px] rounded-xl border bg-[rgba(18,18,28,0.95)] px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--labs-accent)]",
                selected
                    ? "border-[var(--labs-accent)] shadow-[inset_0_0_0_1px_var(--labs-accent)]"
                    : "border-[var(--labs-border)] hover:border-[var(--labs-border-strong)]"
            )}
        >
            <span className="block font-mono text-[0.72rem] text-[var(--labs-accent)]">{number}</span>
            <span className="mt-1 block text-[0.85rem] text-white">{label}</span>
            {selected ? (
                <span className="mt-1.5 block text-[0.62rem] tracking-[0.14em] text-[var(--labs-accent)]">
                    SELECTED
                </span>
            ) : null}
        </button>
    );
}

export default FlexboxPreviewItem;
