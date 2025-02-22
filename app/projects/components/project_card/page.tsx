import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@mui/material";
import { FaRegEye } from "react-icons/fa";

export default function ProjectCard({data, clickHandler, className = '', isCurrent = false}) {
    return (
        <div className={cls(styles.projectWrapper, isCurrent && styles.currentProjectWrapper, className)}
             onClick={() => {
                 if (!isCurrent) {
                     clickHandler(data.id)
                 }
             }}>
            <div className={styles.content}>
                <h2 className={styles.title}>{data.title}</h2>
                {isCurrent && (
                    <>
                        <div className={styles.skills}>
                            {data.skills.map((skill, index) => (
                                <span className={styles.skill} key={`Skill-${index + 1}`}>{skill}</span>
                            ))}
                        </div>

                        <p className={styles.description}>{data.description}</p>

                        <div className={styles.links}>
                            {data.code && (<Link  href={data.code}>
                                <Button className={styles.button} variant='contained' startIcon={<FaRegEye />}>
                                    Code
                                </Button>
                            </Link>)}
                            {data.demo && (<Link href={data.demo}>
                                <Button className={styles.button} variant='contained' startIcon={<FaRegEye />}>
                                    DEMO
                                </Button>
                            </Link>)}
                        </div>
                    </>
                )}

            </div>

            {data.image && (
                <div className={styles.imageWrapper}>
                    <Image className={styles.projectImage} src={data.image} alt='Mahrokh Nabizadeh' width={500}
                           height={600}
                           style={{objectFit: "cover"}}/>
                </div>
            )}
        </div>
    );
}
