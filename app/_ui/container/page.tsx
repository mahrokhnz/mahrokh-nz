import styles from "./page.module.sass";
import cls from "@/utils/class_names";

export default function Container({children, className = ''}) {
  return (
      <div className={cls(styles.container, className)}>
          {children}
      </div>
  );
}
