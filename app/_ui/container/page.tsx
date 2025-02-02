import styles from "./page.module.sass";

export default function Container({children}) {
  return (
      <div className={styles.container}>
          {children}
      </div>
  );
}
