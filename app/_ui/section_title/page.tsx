import styles from "./page.module.sass";

interface ISectionTitleProps {
  text: string;
  alignment?: string;
}

function SectionTitle({text, alignment = 'center'}: ISectionTitleProps) {
  return (
      <h1 className={styles.sectionTitle} style={{alignSelf: alignment}}>{text}</h1>
  );
}

export default SectionTitle;
