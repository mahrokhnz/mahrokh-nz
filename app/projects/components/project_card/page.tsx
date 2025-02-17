import styles from "./page.module.sass";
import cls from "@/utils/class_names";

export default function ProjectCard({data, clickHandler, className = ''}) {
    return (
        <div className={cls(styles.projectWrapper, className)} style={{border: '1px blue solid', height: '200px', width: '100px', textAlign: 'center'}} onClick={() => clickHandler(data.id)}>
            <div>

            </div>
            <div>
                {data.id}
            </div>
        </div>
    );
}
