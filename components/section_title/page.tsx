import cls from "@/utils/class_names";

interface SectionTitleProps {
  text: string;
  alignment?: string;
  className?: string
}

function SectionTitle({text, alignment = 'center', className}: SectionTitleProps) {
  return (
      <h1
          className={cls(
              "self-center text-center text-[2.8rem] mb-16 break-words max-tablet:text-[2.5rem] max-tablet:mb-12 max-phone:text-[1.5rem]",
              className
          )}
          style={{alignSelf: alignment}}
      >
          {text}
      </h1>
  );
}

export default SectionTitle;
