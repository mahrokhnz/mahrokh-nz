import cls from "@/utils/class_names";

interface ContainerProps {
    children?: React.ReactNode;
    className?: string;
}

function Container({children, className = ''}: ContainerProps) {
  return (
      <div className={cls(
          "flex flex-col box-border snap-end bg-(--primaryColor) px-32 py-16 min-h-[calc(100vh-112px)] max-tablet:px-16 max-tablet:py-8 max-phone:p-8 max-phone:min-h-[calc(100vh-74px)]",
          className
      )}>
          {children}
      </div>
  );
}

export default Container;
