import styles from "./page.module.sass";
import cls from "@/utils/class_names";

interface ISectionTitleProps {
  text: string;
  alignment?: string;
  className?: string
}

function SectionTitle({text, alignment = 'center', className}: ISectionTitleProps) {
  return (
      <h1 className={cls(styles.sectionTitle, className)} style={{alignSelf: alignment}}>{text}</h1>
  );
}

export default SectionTitle;
