import cls from "@/utils/class_names";

interface LabsTagsProps {
    tags: string[];
    dimmed?: boolean;
    className?: string;
}

function LabsTags({tags, dimmed = false, className}: LabsTagsProps) {
    if (!tags.length) return null;

    return (
        <div className={cls("flex flex-wrap gap-2", className)}>
            {tags.map((tag) => (
                <span
                    key={tag}
                    className={cls(
                        "rounded-md border border-[var(--labs-border)] px-2.5 py-1 text-[0.72rem] text-[var(--labs-muted)]",
                        dimmed && "opacity-60"
                    )}
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}

export default LabsTags;
