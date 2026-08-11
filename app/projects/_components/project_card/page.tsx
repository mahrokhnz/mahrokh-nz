import cls from "@/utils/class_names";
import {FaRegEye} from "react-icons/fa";
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
                isCurrent && "box-border h-full cursor-auto flex-row justify-center p-[30px] max-small-desktop:flex-col-reverse max-small-desktop:items-stretch",
                className
            )}
            onClick={() => {
                if (clickHandler instanceof Function) {
                    clickHandler(data.id);
                }
            }}
        >
            <div className={cls(
                "flex w-full flex-col items-center gap-5",
                isCurrent && "w-1/2 items-stretch pl-[50px] text-(--textColor) max-desktop:pl-5 max-small-desktop:mt-[30px] max-small-desktop:w-full max-small-desktop:grow max-small-desktop:!pl-0"
            )}>
                <h2 className={cls(
                    "text-center text-lg text-nowrap",
                    isCurrent && "text-left text-[40px] text-wrap max-tablet:text-[30px] max-phone:text-[20px]"
                )}>{data.title}</h2>
                {isCurrent && (
                    <>
                        <div className="flex gap-2">
                            {data.skills.map((skill: string, index: number) => (
                                <span className="rounded-[15px] bg-(--accentSolid) px-2 py-1 text-base text-white" key={`Skill-${index + 1}`}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <p className="mt-[30px] leading-[1.3]">{data.description}</p>

                        <div className="mt-5 flex gap-2.5">
                            {data.code && (
                                <a href={data.code} target="_blank" rel="noreferrer">
                                    <Button startIcon={<FaRegEye />}>
                                        Code
                                    </Button>
                                </a>
                            )}
                            {data.demo && (
                                <a href={data.demo} target="_blank" rel="noreferrer">
                                    <Button startIcon={<FaRegEye />}>
                                        DEMO
                                    </Button>
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>

            {data.image && (
                <div className={cls(
                    "relative h-full w-full max-h-[127px] aspect-[4/3] overflow-hidden rounded-[5px] bg-(--secondaryColor)",
                    isCurrent && "h-auto w-1/2 max-h-none aspect-auto"
                )}>
                    <SkeletonImage
                        className="size-full rounded-[5px] object-cover"
                        src={data.image}
                        alt={data.title}
                        width={isCurrent ? 800 : 320}
                        height={isCurrent ? 500 : 240}
                        sizes={isCurrent ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 840px) 50vw, 20vw"}
                        priority={isCurrent}
                        wrapperClassName="relative size-full"
                    />
                </div>
            )}
        </div>
    );
}

export default ProjectCard;
