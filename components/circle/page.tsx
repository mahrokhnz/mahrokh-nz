import cls from "@/utils/class_names";

interface CircleProps {
    filled: boolean;
    delay: number;
}

function Circle({filled, delay}: CircleProps) {
    return (
            <div
                className={cls(
                    "size-[1.2rem] rounded-full bg-(--neutralColor) opacity-20 max-tablet:size-4 max-phone:size-3",
                    filled && "animate-fill"
                )}
                style={{ animationDelay: `${delay}s` }}
            />
    );
}

export default Circle
