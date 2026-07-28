import styles from "./page.module.sass";
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
            className={cls(styles.projectWrapper, isCurrent && styles.currentProjectWrapper, className)}
            onClick={() => {
                if (clickHandler instanceof Function) {
                    clickHandler(data.id);
                }
            }}
        >
            <div className={styles.content}>
                <h2 className={styles.title}>{data.title}</h2>
                {isCurrent && (
                    <>
                        <div className={styles.skills}>
                            {data.skills.map((skill: string, index: number) => (
                                <span className={styles.skill} key={`Skill-${index + 1}`}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <p className={styles.description}>{data.description}</p>

                        <div className={styles.links}>
                            {data.code && (
                                <a href={data.code} target="_blank" rel="noreferrer">
                                    <Button className={styles.button} startIcon={<FaRegEye />}>
                                        Code
                                    </Button>
                                </a>
                            )}
                            {data.demo && (
                                <a href={data.demo} target="_blank" rel="noreferrer">
                                    <Button className={styles.button} startIcon={<FaRegEye />}>
                                        DEMO
                                    </Button>
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>

            {data.image && (
                <div className={styles.imageWrapper}>
                    <SkeletonImage
                        className={styles.projectImage}
                        src={data.image}
                        alt={data.title}
                        width={isCurrent ? 800 : 320}
                        height={isCurrent ? 500 : 240}
                        sizes={isCurrent ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 840px) 50vw, 20vw"}
                        priority={isCurrent}
                    />
                </div>
            )}
        </div>
    );
}

export default ProjectCard;
