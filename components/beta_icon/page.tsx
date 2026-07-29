import cls from "@/utils/class_names";

interface BetaIconProps {
    className?: string;
}

function BetaIcon({className}: BetaIconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
        >
            <text
                x="8"
                y="12.5"
                textAnchor="middle"
                fontSize="13"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontWeight="700"
            >
                β
            </text>
        </svg>
    );
}

interface BetaBadgeProps {
    className?: string;
    variant?: "default" | "labs";
}

function BetaBadge({className, variant = "default"}: BetaBadgeProps) {
    return (
        <span
            title="Beta"
            aria-label="Beta"
            className={cls(
                "inline-flex size-[1.1rem] items-center justify-center rounded-[0.25rem] border text-[0.7rem] leading-none max-tablet:size-5",
                variant === "labs"
                    ? "border-[rgba(139,139,255,0.45)] bg-[rgba(110,110,240,0.35)] text-[var(--labs-accent)]"
                    : "border-(--firstWaveColor) bg-(--firstWaveColor)/20 text-(--firstWaveColor)",
                className
            )}
        >
            <BetaIcon className="size-[0.85rem]" />
        </span>
    );
}

export {BetaIcon, BetaBadge};
export default BetaBadge;
