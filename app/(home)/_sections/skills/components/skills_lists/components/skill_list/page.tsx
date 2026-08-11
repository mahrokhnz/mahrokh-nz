import Circle, {type CircleFillSpeed} from "@/components/circle/page";
import {SkillType} from "@/app/(home)/_sections/skills/type";

const STAGGER_SECONDS: Record<CircleFillSpeed, number> = {
    fast: 0.04,
    med: 0.1,
    low: 0.16,
};

interface SkillsListProps {
    data: SkillType[];
    inView: boolean;
    playId: number;
    speed?: CircleFillSpeed;
}

function SkillsList({data, inView, playId, speed = "med"}: SkillsListProps) {
    const stagger = STAGGER_SECONDS[speed];

    return (
        <ul className="flex grow flex-col gap-8">
            {data.map((skill) => (
                <li key={skill.id} className="flex justify-between gap-8">
                    <h3 className="text-[1.5rem] max-tablet:text-[1.3rem] max-phone:text-base">
                        {skill.title}
                    </h3>
                    <div className="flex gap-[0.4rem]">
                        {[...Array(10)].map((_, index) => (
                            <Circle
                                key={`${playId}-${skill.id}-${index}`}
                                filled={inView && index < skill.count}
                                delay={index * stagger}
                                speed={speed}
                            />
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default SkillsList;
