import styles from "./page.module.sass";
import type {Metadata} from "next";
import {metadataCreator} from "@/utils/metadata";
import View from "@/app/(home)/_sections/(view)/page";
import Skills from "@/app/(home)/_sections/(skills)/page";

export const metadata: Metadata = metadataCreator('Home', 'Passionate frontend developer creating visually stunning, user-friendly websites with expertise in HTML, CSS, JavaScript, React and Next. Let\'s bring your digital vision to life!' )

export default function Home() {
  return (
      <main className={styles.homeContainer}>
          <View></View>
          <Skills></Skills>
      </main>
  );
}
