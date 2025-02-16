import styles from "./page.module.sass";
import cls from "@/utils/class_names";

export default function Circle({filled, delay}) {
    return (
            <div className={cls(styles.circle, filled ? styles.filled : '')} style={{ animationDelay: `${delay}s` }}></div>
    );
}
