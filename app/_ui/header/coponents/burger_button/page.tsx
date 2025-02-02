import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import Menu from "@/app/_ui/header/coponents/menu/page";
import Theme from "@/app/_ui/header/coponents/theme/page";

export default function BurgerButton() {
  return (
      <div className={styles.hamburgerMenu}>
          <span className={cls(styles.line, styles.line1)}></span>
          <span className={cls(styles.line, styles.line2)}></span>
          <span className={cls(styles.line, styles.line3)}></span>
      </div>
  );
}
