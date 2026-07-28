import cls from "@/utils/class_names";
import {MouseEventHandler} from "react";

interface BurgerButtonProps {
    isOpen: boolean;
    onClickHandler: MouseEventHandler<HTMLDivElement> | undefined
}

function BurgerButton({isOpen, onClickHandler}: BurgerButtonProps) {
  return (
      <div
          className={cls(
              "hidden max-tablet:flex max-tablet:h-[22px] max-tablet:w-[30px] max-tablet:flex-col max-tablet:justify-between max-tablet:cursor-pointer max-tablet:relative max-tablet:z-[6]",
              isOpen && "open"
          )}
          onClick={onClickHandler}
      >
          <span className={cls(
              "block h-[0.15rem] w-full rounded-[10px] bg-(--textColor) origin-top-left transition-transform duration-[0.4s] ease-in-out",
              isOpen && "rotate-45"
          )} />
          <span className={cls(
              "block h-[0.15rem] w-full rounded-[10px] bg-(--textColor) transition-transform duration-[0.2s] ease-in-out",
              isOpen && "scale-y-0"
          )} />
          <span className={cls(
              "block h-[0.15rem] w-full rounded-[10px] bg-(--textColor) origin-bottom-left transition-transform duration-[0.4s] ease-in-out",
              isOpen && "-rotate-45"
          )} />
      </div>
  );
}

export default BurgerButton
