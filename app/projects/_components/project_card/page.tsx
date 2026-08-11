import cls from "@/utils/class_names";
import {FaRegEye} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import {ProjectType} from "@/app/projects/type";
import Button from "@/components/Button/page";
import SkeletonImage from "@/components/skeleton_image/page";

interface ProjectCardProps {
    data: ProjectType;
    clickHandler?: (id: number) => void;
    className: string;
    isCurrent?: boolean;
}

function ProjectCard({data, clickHandler, className = "", isCurrent = false}: ProjectCardProps) {
    return (
        <div
            className={cls(
                "flex cursor-pointer flex-col-reverse items-center gap-3 rounded-[5px] bg-(--secondaryColor) p-2.5 shadow-[0_7px_29px_0_var(--secondaryColor)]",
                isCurrent && "cursor-auto flex-row items-stretch justify-between gap-10 p-8 max-small-desktop:flex-col max-small-desktop:gap-5",
                className
            )}
            onClick={() => {
                if (!isCurrent && clickHandler instanceof Function) {
                    clickHandler(data.id);
                }
            }}
        >
            <div
                className={cls(
                    "flex w-full flex-col items-center gap-3",
                    isCurrent && "w-1/2 items-stretch text-(--textColor) max-small-desktop:w-full"
                )}
            >
                <div className={cls("flex items-start justify-between gap-2", isCurrent ? "w-full" : "w-full justify-center")}>
                    <h2
                        className={cls(
                            "text-center text-base text-nowrap overflow-hidden text-ellipsis w-full",
                            isCurrent && "text-left text-[32px] text-wrap text-ellipsis-none overflow-visible max-tablet:text-[24px] max-phone:text-[20px]"
                        )}
                    >
                        {data.title}
                    </h2>
                    {isCurrent && (
                        <button
                            onClick={() => clickHandler instanceof Function && clickHandler(data.id)}
                            className="shrink-0 mt-1 text-(--neutralColor) hover:text-(--firstWaveColor) transition-colors duration-200"
                            aria-label="Close"
                        >
                            <FaXmark className="text-[20px]" />
                        </button>
                    )}
                </div>

                {isCurrent && (
                    <>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {data.skills.map((skill: string, index: number) => (
                                <span
                                    className="rounded-[15px] bg-(--accentSolid) px-2.5 py-1 text-sm text-white"
                                    key={`Skill-${index + 1}`}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <p className="mt-4 leading-[1.5] text-(--textColor) opacity-80">{data.description}</p>

                        <div className="mt-6 flex gap-2.5">
                            {data.code && (
                                <a href={data.code} target="_blank" rel="noreferrer">
                                    <Button startIcon={<FaRegEye />}>Code</Button>
                                </a>
                            )}
                            {data.demo && (
                                <a href={data.demo} target="_blank" rel="noreferrer">
                                    <Button startIcon={<FaRegEye />}>Demo</Button>
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>

            {data.image && (
                <div
                    className={cls(
                        "relative w-full aspect-[4/3] overflow-hidden rounded-[5px] bg-(--secondaryColor)",
                        isCurrent && "w-1/2 aspect-[4/3] max-small-desktop:w-full"
                    )}
                >
                    <SkeletonImage
                        className="size-full rounded-[5px] object-cover"
                        src={data.image}
                        alt={data.title}
                        width={isCurrent ? 800 : 320}
                        height={isCurrent ? 500 : 240}
                        sizes={isCurrent ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 840px) 50vw, 33vw"}
                        priority={isCurrent}
                        wrapperClassName="relative size-full"
                    />
                </div>
            )}
        </div>
    );
}

export default ProjectCard;
