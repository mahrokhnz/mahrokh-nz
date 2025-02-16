import styles from "./page.module.sass";

export default function SectionTitle({text, alignment = 'center'}) {
  return (
      <h1 className={styles.sectionTitle} style={{alignSelf: alignment}}>{text}</h1>
  );
}
