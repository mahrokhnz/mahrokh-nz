import styles from "./page.module.sass";
import cls from "@/utils/class_names";

interface CircleProps {
    filled: boolean;
    delay: number;
}

function Circle({filled, delay}: CircleProps) {
    return (
            <div className={cls(styles.circle, filled ? styles.filled : '')} style={{ animationDelay: `${delay}s` }}></div>
    );
}

export default Circle
