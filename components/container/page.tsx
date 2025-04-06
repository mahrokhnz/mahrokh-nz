import styles from "./page.module.sass";
import cls from "@/utils/class_names";

interface ContainerProps {
    children?: React.ReactNode;
    className?: string;
}

function Container({children, className = ''}: ContainerProps) {
  return (
      <div className={cls(styles.container, className)}>
          {children}
      </div>
  );
}

export default Container;
