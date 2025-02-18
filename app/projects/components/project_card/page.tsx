import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import Image from "next/image";
import myImage from "@/public/images/Mahrokh-Nabizadeh.jpg";

export default function ProjectCard({data, clickHandler, className = '', isCurrent = false}) {
    return (
        <div className={cls(styles.projectWrapper, isCurrent && styles.currentProjectWrapper, className)}
             onClick={() => clickHandler(data.id)}>
            <div>
                {data.id}
            </div>

            <div className={styles.imageWrapper}>
                <Image className={styles.projectImage} src={myImage} alt='Mahrokh Nabizadeh' width={500} height={600}
                       style={{objectFit: "cover"}}/>
            </div>
        </div>
    );
}
