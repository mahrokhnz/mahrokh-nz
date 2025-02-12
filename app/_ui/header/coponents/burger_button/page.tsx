import styles from "./page.module.sass";
import cls from "@/utils/class_names";

export default function BurgerButton({isOpen, onClickHandler}) {
  return (
      <div className={cls(styles.hamburgerMenu, isOpen && styles.open)} onClick={onClickHandler}>
          <span className={cls(styles.line, styles.line1)}></span>
          <span className={cls(styles.line, styles.line2)}></span>
          <span className={cls(styles.line, styles.line3)}></span>
      </div>
  );
}
