import styles from "./page.module.sass";
import cls from "@/utils/class_names";

export default function BurgerButton({isOpen}) {
  return (
      <div className={cls(styles.hamburgerMenu, isOpen && styles.open)}>
          <span className={cls(styles.line, styles.line1)}></span>
          <span className={cls(styles.line, styles.line2)}></span>
          <span className={cls(styles.line, styles.line3)}></span>
      </div>
  );
}
