import cls from "@/utils/class_names";

export type CircleFillSpeed = "fast" | "med" | "low";

interface CircleProps {
    filled: boolean;
    delay: number;
    speed?: CircleFillSpeed;
}

const FILL_ANIMATION: Record<CircleFillSpeed, string> = {
    fast: "animate-fill-fast",
    med: "animate-fill-med",
    low: "animate-fill-low",
};

function Circle({filled, delay, speed = "med"}: CircleProps) {
    return (
        <div
            className={cls(
                "size-[1.2rem] rounded-full bg-(--neutralColor) opacity-20 max-tablet:size-4 max-phone:size-3",
                filled && FILL_ANIMATION[speed]
            )}
            style={{animationDelay: `${delay}s`}}
        />
    );
}

export default Circle;
