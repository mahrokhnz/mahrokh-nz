import styles from "./page.module.sass";
import Canvas from "@/app/_ui/constellation/page";
import SvgPath from "@/app/_ui/svg_path/page";
import type {Metadata} from "next";
import {metadataCreator} from "@/utils/metadata";
import Contact from "@/app/_ui/contact/page";

export const metadata: Metadata = metadataCreator('Home', 'Passionate frontend developer creating visually stunning, user-friendly websites with expertise in HTML, CSS, JavaScript, React and Next. Let\'s bring your digital vision to life!' )

export default function Home() {
  return (
      <section className={styles.home}>
          <Contact />
          <div className={styles.nameWrapper}>
              <h1>I&#39;m Mahrokh Nabizadeh.</h1>
              <h2>Frontend Developer</h2>
          </div>

          <SvgPath />
          <Canvas />
      </section>
  );
}
