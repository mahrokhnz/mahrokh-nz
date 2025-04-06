import styles from "./page.module.sass";
import cls from "@/utils/class_names";
import {MouseEventHandler} from "react";

interface BurgerButtonProps {
    isOpen: boolean;
    onClickHandler: MouseEventHandler<HTMLDivElement> | undefined
}

function BurgerButton({isOpen, onClickHandler}: BurgerButtonProps) {
  return (
      <div className={cls(styles.hamburgerMenu, isOpen && styles.open)} onClick={onClickHandler}>
          <span className={cls(styles.line, styles.line1)}></span>
          <span className={cls(styles.line, styles.line2)}></span>
          <span className={cls(styles.line, styles.line3)}></span>
      </div>
  );
}

export default BurgerButton