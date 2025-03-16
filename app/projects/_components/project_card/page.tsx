import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { ProjectType } from "@/app/projects/type";
import Button from "@/app/_ui/Button/page";

interface ProjectCardProps {
    data: ProjectType;
    clickHandler?: (id: number) => void;
    className: string;
    isCurrent?: boolean;
}

function ProjectCard({ data, clickHandler, className = '', isCurrent = false }: ProjectCardProps) {
    return (
        <div className={cls(styles.projectWrapper, isCurrent && styles.currentProjectWrapper, className)}
             onClick={() => {
                 if (clickHandler instanceof Function) {
                     clickHandler(data.id)
                 }
             }}>
            <div className={styles.content}>
                <h2 className={styles.title}>{data.title}</h2>
                {isCurrent && (
                    <>
                        <div className={styles.skills}>
                            {data.skills.map((skill: string, index: number) => (
                                <span className={styles.skill} key={`Skill-${index + 1}`}>{skill}</span>
                            ))}
                        </div>

                        <p className={styles.description}>{data.description}</p>

                        <div className={styles.links}>
                            {data.code && (<Link href={data.code}>
                                <Button className={styles.button} startIcon={<FaRegEye />}>
                                    Code
                                </Button>
                            </Link>)}
                            {data.demo && (<Link href={data.demo}>
                                <Button className={styles.button} startIcon={<FaRegEye />}>
                                    DEMO
                                </Button>
                            </Link>)}
                        </div>
                    </>
                )}

            </div>

            {data.image && (
                <div className={styles.imageWrapper}>
                    <LazyLoadImage
                        className={styles.projectImage}
                        src={data.image}
                        alt={data.title}
                        effect="blur"
                    />
                </div>
            )}
        </div>
    );
}

export default ProjectCard;
